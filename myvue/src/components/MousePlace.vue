<template>

    <div>鼠标位置：x: {{ mouseX }}, y: {{ mouseY }}</div>
</template>

<script setup lang="js">
import { ref, onMounted, onUnmounted } from 'vue';

const mouseX = ref(0);
const mouseY = ref(0);

function handleMouseMove(event) {
    mouseX.value = event.clientX; // 相对于浏览器视口的坐标
    mouseY.value = event.clientY;
}

// 组件挂载时添加监听
onMounted(() => {
    window.addEventListener('mousemove', handleMouseMove);
});

// 组件卸载时移除监听（防止内存泄漏）
onUnmounted(() => {
    window.removeEventListener('mousemove', handleMouseMove);
});
</script>