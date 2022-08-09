import { createStore } from 'vuex'
import getters from './getters'
import category from './modules/category'
import theme from './modules/theme'
import app from './modules/app'
import search from './modules/search'
import createPersistedState from 'vuex-persistedstate'
const store = createStore({
  state: {},
  getters,
  modules: { category, theme, app, search },
  plugins: [
    createPersistedState({
      //指定保存到localstorage的key
      key: 'pithy-front',
      //需要保存的模块
      paths: ['category', 'theme', 'search']
    })
  ]
})

export default store
