<!-- ExpandSide.vue -->
<template>
    <Teleport to="body">
        <!-- 遮罩层 -->
        <Transition name="fade">
            <div v-if="modelValue" class="overlay" @click="close"></div>
        </Transition>

        <!-- 侧边栏 -->
        <Transition name="slide">
            <aside v-if="modelValue" class="side" :style="{ width }">
                <div class="head">
                    <span>{{ title }}</span>
                    <el-icon class="close" @click="close">
                        <Close />
                    </el-icon>
                </div>

                <div class="body">
                    <!-- 这里放任意内容，也可以留 slot -->
                    <slot>
                        <p style="padding: 0 16px">默认内容</p>
                    </slot>
                </div>
                <div class="pin-btn" @click="close">
                    <el-icon size="20">
                        <ArrowLeftBold :style="{ transform: 'rotate(180deg)' }" />
                    </el-icon>
                </div>
            </aside>
        </Transition>
    </Teleport>
</template>

<script setup lang="ts">
import { Close } from '@element-plus/icons-vue'

interface Props {
    modelValue: boolean
    width?: string
    title?: string
}
withDefaults(defineProps<Props>(), {
    width: '260px',
    title: '侧边栏'
})

const emit = defineEmits<{
    'update:modelValue': [value: boolean]
}>()

const close = () => emit('update:modelValue', false)
</script>

<style scoped>
.overlay {
    position: fixed;
    inset: 0;
    background: rgba(0, 0, 0, 0.4);
    z-index: 2000;
}

.side {
    position: fixed;
    top: 0;
    left: 0;
    height: 100vh;
    background: #fff;
    box-shadow: 2px 0 8px rgba(0, 0, 0, 0.15);
    display: flex;
    flex-direction: column;
    z-index: 2001;
}

.head {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 16px;
    border-bottom: 1px solid #e4e7ed;
    font-weight: 600;
}

.close {
    cursor: pointer;
    font-size: 16px;
}

.body {
    flex: 1;
    overflow: auto;
}

/* 动画 */
.fade-enter-active,
.fade-leave-active {
    transition: opacity 0.3s;
}

.fade-enter-from,
.fade-leave-to {
    opacity: 0;
}

.slide-enter-active,
.slide-leave-active {
    transition: transform 0.3s ease;
}

.slide-enter-from,
.slide-leave-to {
    transform: translateX(-100%);
}
/* 追加到 <style scoped> 里 */
.pin-btn {
  position: absolute;
  top: 50%;
  right: -20px;
  transform: translateY(-50%);
  width: 20px;
  height: 40px;
  background: var(--el-color-primary);
  color: #fff;
  display: flex;
  align-items: center;
  justify-content: center;
  border-top-right-radius: 4px;
  border-bottom-right-radius: 4px;
  cursor: pointer;
  transition: transform 0.3s;
}
.side:not(.slide-leave-to) .pin-btn:hover {
  transform: translateY(-50%) scale(1.1);
}
/* 折叠时箭头反向 */
.side.slide-leave-to .pin-btn {
  transform: translateY(-50%) rotate(180deg);
}
</style>