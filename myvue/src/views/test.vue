<template>
  <!-- <Sidebar v-model:modelValue="showSidebar">
    <el-menu>
      <el-menu-item>菜单1</el-menu-item>
      <el-menu-item>菜单2</el-menu-item>
    </el-menu>
  </Sidebar>
  <div v-if="!showSidebar" class="expand-btn" @click="showSidebar = true">
    <el-icon>
      <ArrowLeftBold style="transform: rotate(180deg)" />
    </el-icon>
  </div> -->
  <NavManage></NavManage>
</template>

<script setup>
import { ref } from 'vue'
import Sidebar from '../components/SideBar.vue'
import { ArrowLeftBold } from '@element-plus/icons-vue'
import NavManage from '../components/NavManage.vue'

const showSidebar = ref(true)
</script>

<style scoped>
.expand-btn {
  position: fixed;
  top: 50%;
  left: 0;
  z-index: 2002;
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
  transform: translateY(-50%);
}
</style>