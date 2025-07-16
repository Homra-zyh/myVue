import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
import router from './router/index.js'
import { createPinia } from 'pinia'
import piniaPluginPersistedstate from 'pinia-plugin-persistedstate';

import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'

import MouseClickEffects from './directives/MouseClickEffects.js'
//import MouseClickEffectsPlugin from './plugins/MouseClickEffectsPlugin.js'
import MouseClickEffectsPluginWrapper from './plugins/PluginsWrapper.js'

const app = createApp(App)
const pinia = createPinia();
pinia.use(piniaPluginPersistedstate);

app.use(router)
app.use(pinia)
app.use(ElementPlus)
app.use(MouseClickEffectsPluginWrapper)
app.directive("click-effect", MouseClickEffects);//注册鼠标响应指令

app.mount('#app')
