<template>
    <canvas ref="canvasRef" class="mouse-canvas">canvas</canvas>
</template>

<script setup lang="js">
import { ref, onMounted, onUnmounted } from 'vue'
// import useCanvasBalls from "../utils/ball.js";
// const canvasRef = ref(null);
// useCanvasBalls(canvasRef);


const colorArray = ["#FF5252", "#FF4081", "#E040FB", "#7C4DFF", "#536DFE", "#448AFF", "#40C4FF", "#18FFFF", "#64FFDA", "#69F0AE", "#B2FF59", "#EEFF41", "#FFFF00", "#FFD740", "#FFAB40", "#FF6E40"]

const random = (start, end) => Math.random() * (end - start) + start

class Ball {
    constructor(ctx, x, y, color) {  //初始化小球的位置、颜色和半径
        this.ctx = ctx //初始化画布上下文
        this.x = x//初始化小球中心的x坐标
        this.y = y
        this.color = color//小球颜色
        this.r = 5  //小球半径
        this.alpha = 1//小球透明度
    }

    draw() {//Canvas API绘制小球
        this.ctx.save()//保存当前Canvas的所有绘图状态
        this.ctx.beginPath()//新的绘制路径，清空之前的路径记录
        this.ctx.arc(this.x, this.y, this.r, 0, 2 * Math.PI)//绘制球，位置xy，起始角度0，结束角度2π
        this.ctx.fillStyle = this.color    //设置填充颜色
        this.ctx.globalAlpha = this.alpha  //设置全局透明度
        this.ctx.fill()     //填充路径
        this.ctx.restore()  //恢复之前保存的Canvas的绘图状态
    }
}


class MoveBall extends Ball {//继承Ball类，实现运动逻辑
    constructor(ctx, x, y, color) {
        super(ctx, x, y, color)
        this.dx = random(-5, 5)//x轴方向的速度
        this.dy = random(-5, 5)//y轴方向的速度
        this.dr = random(0.1, 0.15)//半径衰减速度
        this.da = random(0.1, 0.15)//透明度衰减速度
    }

    update() {//更新小球位置、大小和透明度的衰减
        this.x += this.dx
        this.y += this.dy
        this.r -= this.dr
        this.alpha -= this.da

        if (this.r < 0) this.r = 0
        if (this.alpha < 0) this.alpha = 0
    }
}


// 定义响应式引用
const canvasRef = ref(null)          // 画布DOM引用
const ctx = ref(null)                // Canvas上下文
const canvasWidth = ref(window.innerWidth)  // 画布宽度(初始为窗口宽度)
const canvasHeight = ref(window.innerHeight) // 画布高度(初始为窗口高度)
const ballArray = ref([])            // 存储所有小球的数组
let animationInterval = null         // 动画定时器


const initCanvas = () => {
    const canvas = canvasRef.value
    canvas.width = canvasWidth.value
    canvas.height = canvasHeight.value
    ctx.value = canvas.getContext('2d')
}

const updateCanvasSize = () => {
    canvasWidth.value = window.innerWidth // 更新画布宽度
    canvasHeight.value = window.innerHeight // 更新画布高度
    initCanvas()
}

const clearCanvas = () => {// 清空画布
    ctx.value.clearRect(0, 0, canvasWidth.value, canvasHeight.value)
}

const drawBalls = () => {//根据小球数组绘制所有小球
    //console.log('Drawing balls');
    for (let i = ballArray.value.length - 1; i >= 0; i--) {
        const ball = ballArray.value[i]
        ball.draw()
        ball.update()

        if (ball.r <= 0 || ball.alpha <= 0) {//如果小球半径衰减至0则移除小球
            ballArray.value.splice(i, 1)
        }
    }
}

const startAnimation = () => {//动画实现，每50ms清除画布并绘制所有小球

    animationInterval = setInterval(() => {//设置定时器
        //console.log('Starting animation');
        clearCanvas()
        drawBalls()
    }, 50)
}

const stopAnimation = () => {
    clearInterval(animationInterval)//清除定时器
}

const handleMouseMove = (e) => {//鼠标移动事件
    //console.log('Mouse moved');
    for (let i = 0; i < 1; i++) {//每次移动响应生成球的数量，当前为1
        ballArray.value.push(new MoveBall(
            ctx.value,
            //offsetX鼠标相对于目标元素左侧边缘的位置
            //clientX相对于浏览器视口左侧的位置
            //pageX相对于整个文档左侧的位置
            //screenX相对于屏幕左侧的位置
            e.clientX,
            e.clientY,
            colorArray[Math.floor(Math.random() * colorArray.length)])
        )
    }
}

onMounted(() => {
    initCanvas()
    startAnimation()
    //canvasRef.value.addEventListener('mousemove', handleMouseMove)
    window.addEventListener('mousemove', handleMouseMove)
    window.addEventListener('resize', updateCanvasSize); // 添加对窗口 resize 事件的监听
})

onUnmounted(() => {
    stopAnimation()
    //canvasRef.value.removeEventListener('mousemove', handleMouseMove)
    window.removeEventListener('mousemove', handleMouseMove)
    window.removeEventListener('resize', updateCanvasSize); // 移除对窗口 resize 事件的监听
})

</script>


<style scoped>
.mouse-canvas {
    position: fixed;
    background-color: transparent;
    /* 固定定位 */
    top: 0;
    /* 顶部对齐 */
    left: 0;
    /* 左侧对齐 */
    z-index: 100;
    /* 确保画布在最上层 */
    pointer-events: none;
    /* 允许鼠标事件穿透 */
}
</style>