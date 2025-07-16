//插件包装器，包裹原始插件，添加控制插件功能

import MouseClickEffectsPlugin from './MouseClickEffectsPlugin.js'
import { useUserStore } from '../store/user.js'

const MouseClickEffectsPluginWrapper = {
    install(app) {
        const userStore = useUserStore()
        let cleanupFn=null

        const initPlugin = () => {
            if (cleanupFn) {//如果已经存在清理函数，先执行清理
                cleanupFn()
                cleanupFn = null
            }
            
            if (userStore.mouseClickEffectsPlugin) {//如果状态为开启，则安装插件
                app.use(MouseClickEffectsPlugin)
                cleanupFn = app.config.globalProperties.$clickEffectCleanup || null
            }
        }
        initPlugin()// 初始状态设置
        userStore.$subscribe((mutation, state) => {// 监听状态变化
            if (mutation.events.key === 'mouseClickEffectsPlugin') {//mouseClickEffectsPlugin状态变化时才响应
                initPlugin()
            }
        })
    
        // app.config.globalProperties.$toggleMouseEffects = () => {
        //     userStore.mouseClickEffectsPluginToggle()
        // }
        // app.config.globalProperties.$setMouseEffects = (enabled) => {
        //     userStore.setMouseClickEffectsPlugin(enabled)
        // }
    }
}
export default MouseClickEffectsPluginWrapper