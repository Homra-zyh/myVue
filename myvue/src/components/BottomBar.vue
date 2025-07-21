<template>
    <div class="bottom-bar">
        <div class="bar-container">
            <el-tooltip content="设置" placement="top" :visible="visible">
                <div class="bar-item" @click="handleClick(item)" @contextmenu.prevent="">
                    <img class="item-img" src="../assets/vue.svg" alt="settings" @error="handleImageError" />
                    <!-- 可以删除 -->
                    <span class="item-text">更多</span>
                </div>
            </el-tooltip>
            <el-tooltip v-for="(item, index) in barItems" :key="index" :content="item.tooltip" placement="top"
                :visible="visible">
                <div class="bar-item" @click="handleClick(item)" @contextmenu.prevent="handleRightClick(index, $event)">
                    <img class="item-img" :src="getFaviconUrl(item.url)" :alt="item.text" @error="handleImageError" />
                    <!-- 可以删除 -->
                    <span class="item-text">{{ item.text }}</span>
                </div>
            </el-tooltip>
        </div>
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
import { ElDropdown } from 'element-plus'

const barStore = useBarStore()
const { items: barItems } = storeToRefs(barStore)

const contextMenu = ref({
    visible: false,
    x: 0,
    y: 0,
    index: null
})

const dropdownRef = ref(null)

// 图片加载失败时的处理
const handleImageError = (event) => {
    // 可以设置一个默认图标
    event.target.src = 'https://www.google.com/favicon.ico'
}



// 处理点击事件
const handleClick = (item) => {
    if (item.url) {
        window.open(item.url, '_blank')
    }
}

// 处理右键点击
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
.bottom-bar {
    position: fixed;
    bottom: 20px;
    left: 0;
    right: 0;
    display: flex;
    justify-content: center;
    z-index: 10000;
}

.bar-container {
    display: flex;
    background: rgba(255, 255, 255, 0.85);
    backdrop-filter: blur(10px);
    border-radius: 30px;
    padding: 8px 15px;
    box-shadow: 0 4px 20px rgba(0, 0, 0, 0.15);
    border: 1px solid rgba(255, 255, 255, 0.2);
}

.bar-item {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    padding: 8px 16px;
    margin: 0 5px;
    border-radius: 20px;
    cursor: pointer;
    transition: all 0.3s ease;
    min-width: 70px;
}

.bar-item:hover {
    background: rgba(0, 0, 0, 0.05);
    transform: translateY(-5px);
}

.item-icon {
    font-size: 24px;
    margin-bottom: 5px;
    color: #444;
}

.item-img {
    width: 24px;
    height: 24px;
    margin-bottom: 5px;
    object-fit: contain;
}

.item-text {
    font-size: 12px;
    color: #333;
}

/* 响应式设计 */
@media (max-width: 768px) {
    .bar-container {
        padding: 6px 10px;
    }

    .bar-item {
        padding: 6px 10px;
        min-width: 60px;
    }

    .item-icon {
        font-size: 20px;
    }

    .item-text {
        font-size: 11px;
    }
}

.custom-context-menu {
    min-width: 100px;
}
</style>