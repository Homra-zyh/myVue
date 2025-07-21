import { defineStore } from "pinia";


export const useBarStore = defineStore('barState', {
    state: () => ({
        items: [
            //{ text: '设置', tooltip: '设置', url: 'https://example.com/settings' },
            { text: 'Github', tooltip: 'Github', url: 'https://github.com/' },
            { text: '翻译', tooltip: '翻译', url: 'https://fanyi.baidu.com/' },
            { text: 'QQ邮箱', tooltip: 'QQ邮箱', url: 'https://mail.qq.com/' },
            { text: 'Bilibili', tooltip: 'Bilibili', url: 'https://www.bilibili.com/' },
        ]
    }),
    actions: {
        saveToLocal() {//存储到本地
            localStorage.setItem('bottomBar', JSON.stringify(this.items))
        },
        removeItem(index) {//删除
            this.items.splice(index, 1)
            this.saveToLocal()
        },
        loadFromLocal() {
            const str = localStorage.getItem('bottomBar')
            if (str) this.items = JSON.parse(str)
        },
        addItem(item) {//增加
            
        },
        updateItem(index, item) {//调整位置
        }

    },
})