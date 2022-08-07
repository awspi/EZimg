import { createStore } from 'vuex'
import getters from './getters'
import category from './modules/category'
import theme from './modules/theme'
import createPersistedState from 'vuex-persistedstate'
const store = createStore({
  state: {},
  getters,
  modules: { category, theme },
  plugins: [
    createPersistedState({
      //指定保存到localstorage的key
      key: 'pithy-front',
      //需要保存的模块
      paths: ['category', 'theme']
    })
  ]
})

export default store
