import { loginUser } from '@/api/sys.js'
import 'md5'
import md5 from 'md5'
/**
 * 处理navigationBar中的数据category
 */
export default {
  //独立作用域
  namespaced: true,
  state: () => {
    return {
      //登录的token
      token: ''
    }
  },
  mutations: {
    //保存token
    setToken(state, newToken) {
      state.token = newToken
    }

  },
  actions: {
    //登录
    async login({ commit }, payload) {
      const { password } = payload
      const data = await loginUser({
        ...payload,
        password: password ? md5(password) : ''
      })
      console.log(data);
      commit('setToken', data)
    }
  }
}
