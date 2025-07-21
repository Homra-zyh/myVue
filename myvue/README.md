# Vue 3 + Vite

This template should help get you started developing with Vue 3 in Vite. The template uses Vue 3 `<script setup>` SFCs, check out the [script setup docs](https://v3.vuejs.org/api/sfc-script-setup.html#sfc-script-setup) to learn more.

Learn more about IDE Support for Vue in the [Vue Docs Scaling up Guide](https://vuejs.org/guide/scaling-up/tooling.html#ide-support).


浏览器起始页面


当前已实现功能；
7.15
鼠标移动跟随特效：可复用，可自定义；canvas上绘制
鼠标点击特效：有自定义指令和全局组件两种实现方式

7.16
增加pinia状态管理
创建鼠标点击特效状态存储，用户可以通过更改设置实现是否开启特效
    增加插件包装器，包裹鼠标点击特效，结合状态管理，实现可控插件

7.17
导航栏
需求：
1.首位为more，进入双重导航状态+设置导航栏，布局：显示右上用户头像（1），设置图标（2），时间，中部导航栏（多），底部导航栏（少）当前有底部少数导航，及中间多个导航跳转；
2.用户还有增加（+框）/删除（右击）导航图标（中部，底部同步删除），导航栏可拖拽排序
状态存储在pinia中

实现：

