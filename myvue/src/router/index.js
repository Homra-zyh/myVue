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
            path:'/bottom',
            name: 'bottom',
            meta: {
                title: '底部',
            },
            component: () => import('../components/BottomBar.vue'),
        },
        {//测试使用
            path:'/test',
            name: 'test',
            meta: {
                title: '测试',
            },
            component: () => import('../views/test.vue'),
        }
    ]
})

export default router;