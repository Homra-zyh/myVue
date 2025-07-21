<template>
    <div class="page-container">
        <MouseMoveCanvas></MouseMoveCanvas>
        <p class="time">{{ nowTime }}</p>
        <form class="search-form" @submit.prevent="handleSearch">
            <el-input v-model="searchKeyword" class="search-input" placeholder="搜索" autocomplete="off"
                :clearable="false" @keyup.enter="handleSearch">
                <template #suffix>
                    <!-- 搜索引擎选择按钮 -->
                    <el-dropdown trigger="click" class="engine-dropdown">
                        <el-button type="button" class="engine-btn">
                            <span class="engine-icon"><img src="../assets/img/baidu.png" class="engine-icon-img"
                                    alt="搜索引擎图标"></span>
                        </el-button>
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
                    <el-button type="submit" class="search-btn">
                        <el-icon class="search-icon">
                            <Search />
                        </el-icon>
                    </el-button>

                </template>
            </el-input>
        </form>
        <BottomBar></BottomBar>
    </div>
</template>

<script setup>
import { ref, onMounted, onBeforeUnmount } from 'vue';
import { Search } from '@element-plus/icons-vue';
import MouseMoveCanvas from '../components/MouseMoveCanvas.vue';
import BottomBar from '../components/BottomBar.vue';

const nowTime = ref('');
const getTime = () => {
    const updateTime = () => {
        const now = new Date()
        const hours = String(now.getHours()).padStart(2, '0')
        const minutes = String(now.getMinutes()).padStart(2, '0')
        nowTime.value = `${hours}:${minutes}`
    }
    updateTime()
    const timer = setInterval(updateTime, 1000)
    return () => clearInterval(timer)
}

onMounted(() => {
    const cleanup = getTime()

    // 组件卸载时清理定时器
    onBeforeUnmount(cleanup)
})

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
.page-container {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-image: url('../assets/img/indexBackground.jpg');
    background-size: cover;
    /* z-index: 10000; */
}

.time {
    position: absolute;
    top: 50px;
    left: 50%;
    transform: translateX(-50%);
    color: white;
    font-size: 42px;
    text-shadow: 0 0 10px rgba(0, 0, 0, 0.5);
}

.search-form {
    position: absolute;
    top: 30%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 80%;
    max-width: 600px;
}


.search-input {
    width: 100%;
    box-shadow: 0 2px 12px rgba(0, 0, 0, 0.1);
    border-radius: 24px;
    overflow: hidden;
}

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

.engine-icon {
    display: flex;
    width: 24px;
    height: 24px;
    border-radius: 50%;
    /* 圆形图标 */
    overflow: hidden;
}



.engine-icon-img {
    object-fit: contain;
    width: 100%;
    height: 100%;
}

.engine-item {
    padding: 0 20px;
}

/* 搜索按钮样式 */
.search-btn {
    display: flex;
    width: 60px;
    height: 40px;
    padding: 0;
    background: #409eff;
    border-radius: 0 24px 24px 0;
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
}
</style>