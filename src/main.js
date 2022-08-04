import { createApp } from 'vue'
import './style.css'
import './styles/index.scss'
import App from './App.vue'
import router from './router' //router
import './mock/index.js' //mockjs
createApp(App).use(router).mount('#app')
