<template>
    <form class="search-form" @submit.prevent="handleSearch">
        <el-input v-model="searchKeyword" class="search-input" placeholder="搜索" autocomplete="off" clearable
            @keyup.enter="handleSearch">
            <template #suffix>
                <!-- 搜索引擎选择按钮 -->
                <el-dropdown trigger="click" class="engine-dropdown">
                    <button type="button" class="engine-btn">
                        <span class="engine-icon"><img src="../assets/img/baidu.png" class="engine-icon-img"
                                alt="搜索引擎图标"></span>
                    </button>
                    <template #dropdown>
                        <el-dropdown-menu>
                            <el-dropdown-item @click="selectEngine('baidu')">
                                <span class="engine-item">百度</span>
                            </el-dropdown-item>
                            <el-dropdown-item @click="selectEngine('google')">
                                <span class="engine-item">谷歌</span>
                            </el-dropdown-item>
                            <el-dropdown-item @click="selectEngine('bing')">
                                <span class="engine-item">必应</span>
                            </el-dropdown-item>
                        </el-dropdown-menu>
                    </template>
                </el-dropdown>

                <!-- 搜索提交按钮 -->
                <button type="submit" class="search-btn">
                    <el-icon class="search-icon">
                        <Search />
                    </el-icon>
                </button>
            </template>
        </el-input>
    </form>
</template>

<script setup>
import { ref } from 'vue';
import { Search } from '@element-plus/icons-vue';

const searchKeyword = ref('');
const currentEngine = ref('baidu');

// import baiduImg from '../assets/img/baidu.png';
// const images = {baidu: baiduImg,}
// const currentIndex = ref(0);
// const currentImage = ref(images.value[currentIndex.value]);

const handleSearch = () => {
    console.log('执行搜索:', searchKeyword.value);
    // 实际搜索逻辑
};

const handleEngineChange = (engine) => {
    currentEngine.value = engine;
    console.log('切换搜索引擎:', engine);
};
</script>

<style scoped>
.search-form {
    display: flex;
    justify-content: center;
    margin-top: -100px;
}
.search-container {
    display: flex;
    justify-content: center;
    padding: 20px;
}

.search-input {
    width: 600px;
    box-shadow: 0 2px 12px rgba(0, 0, 0, 0.1);
    border-radius: 24px;
    overflow: hidden;
}


:deep(.el-input-group__prepend) {
    padding: 0;
    border: none;
    background: transparent;
}

:deep(.el-input-group__append) {
    padding: 0;
    border: none;
    background: transparent;
}

/* 引擎下拉按钮样式 */
/* .engine-btn {
  width: 60px;
  height: 40px;
  padding: 0;
  border: none;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
} */

/* 引擎下拉按钮样式 */
.engine-btn {
    width: 32px;
    height: 32px;
    padding: 0;
    margin: 0 4px;
    border: none;
    background: transparent;
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
    outline: none;
    border-radius: 50%;
    /* 圆形按钮 */
}

/* .engine-icon {
  display: inline-block;
  width: 24px;
  height: 24px;
  line-height: 24px;
  text-align: center;
  font-weight: bold;
  font-size: 16px;
  color: #2932e1;
  background: #f1f1f1;
  border-radius: 4px;
} */

.engine-icon {
    display: flex;
    width: 24px;
    height: 24px;
    border-radius: 50%;
    /* 圆形图标 */
    overflow: hidden;
    background: transparent;
}



.engine-icon-img {
    width: 24px;
}

.engine-item {
    padding: 0 20px;
}

/* 搜索按钮样式 */
.search-btn {
    width: 60px;
    height: 40px;
    padding: 0;
    background: #409eff;
    border-radius: 0 24px 24px 0;
    display: flex;
    align-items: center;
    justify-content: center;
    transition: all 0.3s;
    outline: none;
}

.search-btn:hover {
    background: #337ecc;
}

.search-icon {
    color: white;
    font-size: 18px;
    font-weight: bold;
}

/* 输入框内部样式调整 */
:deep(.el-input__wrapper) {
    display: flex;
    border: none;
    box-shadow: none !important;
    padding: 0 0 0 20px; 
    height: 40px;
    align-items: center;
}

:deep(.el-input__suffix) {
    display: flex;
    align-items: center;
    padding-right: 0px;
}
</style>