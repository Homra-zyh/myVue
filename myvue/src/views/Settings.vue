<template>
  <div>
    <el-button type="primary" round
        @click="userStore.mouseClickEffectsPluginToggle()">
        {{ userStore.mouseClickEffectsPlugin ? '关闭' : '开启' }}效果
    </el-button>

  </div>
</template>


<script setup>
import { useUserStore } from '../store/user.js'

const userStore = useUserStore()

// 或者使用全局方法
// const { proxy } = getCurrentInstance()
// proxy.$toggleMouseEffects()
</script>

<style scoped>
</style>