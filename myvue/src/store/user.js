import { defineStore } from 'pinia'


export const useUserStore = defineStore('userState',{
    state: () => ({
        mouseClickEffectsPlugin:true,
    }),
    gettters: {
        isMouseClickEffectsPluginEnabled: (state) => state.mouseClickEffectsPlugin,
    },
    actions: {
        mouseClickEffectsPluginToggle() {
            this.mouseClickEffectsPlugin = !this.mouseClickEffectsPlugin
        },
        setMouseClickEffectsPlugin(enable) {
            this.mouseClickEffectsPlugin = enable
        }
    },
    persist:{
        enabled: true,
        strategies: [
        {
            key: 'user-state', // 存储的键名
            storage: localStorage, // 存储位置
            paths: ['mouseClickEffectsPlugin'] // 只持久化这个状态
        }
        ]
    }
})