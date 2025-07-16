import { createRouter, createWebHashHistory } from 'vue-router';

const router = createRouter({//创建路由实例
    history: createWebHashHistory(),//hash模式
    routes:[//路由配置
        {
            path: '/',  //路由路径
            name: 'index',//路由名称
            meta: {  //路由元信息
                title: '首页'
            },
            component: () => import('../views/index.vue'),//懒加载
            children:[],//子路由
        },
        {
            path: '/settings',
            name: 'settings',
            meta: {
                title: '设置',
            },
            component: () => import('../views/Settings.vue'),
        },
        {//测试使用
            path: '/mouse',
            name: 'mouse',
            meta: {
                title: '鼠标'
            },
            component: () => import('../components/MousePlace.vue'),
        },
        {//测试使用
            path: '/mouse2',
            name: 'mouse2',
            meta: {
                title: '鼠标2'
            },
            component: () => import('../components/MouseMoveCanvas.vue'),
        },
    ]
})

export default router;