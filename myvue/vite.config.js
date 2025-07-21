import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import AutoImport from 'unplugin-auto-import/vite'
import Components from 'unplugin-vue-components/vite'
// import { ElementPlusResolver } from 'unplugin-vue-components/resolvers'
import ElementPlus from 'unplugin-element-plus/vite';
import { ElementPlusResolver } from 'unplugin-vue-components/resolvers';


// https://vite.dev/config/
export default defineConfig({
    base: './', //设置项目根路径为'./'or'/'
    server: {
        open: true,//自动打开浏览器
        port: 8080,//设置端口号
        host: '0.0.0.0',//监听所有地址
        cors: true,// 允许跨域
        proxy: {},// 自定义代理规则
    },
    plugins: [
        vue(),
        ElementPlus({}),
        AutoImport({
            resolvers: [
                ElementPlusResolver(),

            ],
        }),
        Components({
            resolvers: [ElementPlusResolver({
                importStyle: "css",
            })],
            dts: true,
        }),
    ],
})
