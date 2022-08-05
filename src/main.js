import { createApp } from 'vue'
import './style.css'
import './styles/index.scss'
import App from './App.vue'
import router from './router' //router
// import './mock/index.js' //mockjs
import { useRem } from '@/utils/flexible' //动态指定rem基准值
import mLibs from './libs' //注册通用组件
import 'virtual:svg-icons-register' //注册svg-icons
useRem()
createApp(App).use(router).use(mLibs).mount('#app')
