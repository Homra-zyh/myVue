<template>
    <div class="nav-manage-page">
        <h2>导航栏管理</h2>
        <div class="nav-grid">
            <div v-for="(item, index) in barItems" :key="index" class="nav-item" @click="handleClick(item)"
                @contextmenu.prevent="handleRightClick(index, $event)">
                <el-tooltip :content="item.tooltip" placement="top">
                    <img class="item-img" :src="getFaviconUrl(item.url)" :alt="item.text" @error="handleImageError" />
                </el-tooltip>
                <span class="item-text">{{ item.text }}</span>
            </div>
            <!-- 新增按钮 -->
            <div class="nav-item add-btn" @click="addNewBarItem">
                <el-icon>
                    <Plus />
                </el-icon>
                <span class="item-text">新增</span>
            </div>
        </div>
        <!-- 右键菜单 -->
        <el-dropdown ref="dropdownRef" v-if="contextMenu.visible" trigger="manual" :visible="contextMenu.visible"
            @command="handleMenuCommand" :teleported="false"
            :style="{ position: 'fixed', left: contextMenu.x + 'px', top: contextMenu.y + 'px', zIndex: 99999 }"
            class="custom-context-menu">
            <span></span>
            <template #dropdown>
                <el-dropdown-menu>
                    <el-dropdown-item command="left">左移</el-dropdown-item>
                    <el-dropdown-item command="right">右移</el-dropdown-item>
                    <el-dropdown-item command="delete" divided>删除</el-dropdown-item>
                </el-dropdown-menu>
            </template>
        </el-dropdown>
    </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted, nextTick } from 'vue'
import { storeToRefs } from 'pinia'
import { getFaviconUrl } from '../utils/favicon.js'
import { useBarStore } from '../store/bar-store.js'
import { Plus } from '@element-plus/icons-vue'

const barStore = useBarStore()
const { items: barItems } = storeToRefs(barStore)

const contextMenu = ref({
    visible: false,
    x: 0,
    y: 0,
    index: null
})

const dropdownRef = ref(null)
const handleClick = (item) => {
    if (item.url) window.open(item.url, '_blank')
}

const handleImageError = (event) => {
    event.target.src = './'
}

//新增
const addNewBarItem = () => {

}
const handleRightClick = (index, event) => {
    event.preventDefault()
    contextMenu.value = {
        visible: true,
        x: event.clientX,
        y: event.clientY,
        index
    }
    nextTick(() => {
        dropdownRef.value?.handleOpen()
    })
}

const handleClickOutside = (event) => {
    if (!event.target.closest('.el-dropdown__popper')) {
        contextMenu.value.visible = false
    }
}

const handleMenuCommand = (command) => {
    const idx = contextMenu.value.index
    if (command === 'left' && idx > 0) {
        // 交换位置
        const temp = barItems.value[idx]
        barItems.value[idx] = barItems.value[idx - 1]
        barItems.value[idx - 1] = temp
        barStore.saveToLocal()
    } else if (command === 'right' && idx < barItems.value.length - 1) {
        const temp = barItems.value[idx]
        barItems.value[idx] = barItems.value[idx + 1]
        barItems.value[idx + 1] = temp
        barStore.saveToLocal()
    } else if (command === 'delete') {
        barStore.removeItem(idx)
    }
    contextMenu.value.visible = false
}

onMounted(() => {
    barStore.loadFromLocal()
    window.addEventListener('click', handleClickOutside)
})
onUnmounted(() => {
    window.removeEventListener('click', handleClickOutside)
})
</script>

<style scoped>
.nav-manage-page {
    max-width: 900px;
    margin: 40px auto;
    padding: 32px;
    background: #fff;
    border-radius: 12px;
    box-shadow: 0 4px 24px rgba(0, 0, 0, 0.08);
}

.nav-grid {
    display: flex;
    flex-wrap: wrap;
    gap: 24px 12px;
}

.nav-item {
    width: 120px;
    height: 120px;
    background: #f7f8fa;
    border-radius: 10px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    position: relative;
    transition: box-shadow 0.2s;
}

.nav-item:hover {
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.08);
    background: #f0f2f5;
}

.item-img {
    width: 40px;
    height: 40px;
    margin-bottom: 10px;
    object-fit: contain;
}

.item-text {
    font-size: 14px;
    color: #333;
    margin-top: 4px;
}

.add-btn {
    border: 2px dashed #bbb;
    color: #bbb;
    background: #fff;
}

.add-btn:hover {
    border-color: var(--el-color-primary);
    color: var(--el-color-primary);
}

.custom-context-menu {
    min-width: 100px;
}
</style>