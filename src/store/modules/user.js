import { loginUser, getProfile, registerUser } from '@/api/sys.js'
import { message } from '@/libs'
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
      token: '',
      userInfo: {}
    }
  },
  mutations: {
    //保存token
    setToken(state, newToken) {
      state.token = newToken
    },
    //保存用户信息
    setUserInfo(state, info) {
      state.userInfo = info
    }
  },
  actions: {
    //注册
    async register(context, payload) {
      const { password } = payload
      // 注册
      return await registerUser({
        ...payload,
        password: password ? md5(password) : ''
      })
    },
    //登录
    async login({ commit, dispatch }, payload) {
      const { password } = payload
      const data = await loginUser({
        ...payload,
        password: password ? md5(password) : ''
      })
      console.log(data)
      commit('setToken', data.token)
      dispatch('profile')
    },
    //获取用户信息
    async profile({ commit }) {
      const data = await getProfile()
      console.log(data);
      commit('setUserInfo', data)
      message(
        'success',
        `欢迎您 ${data.vipLevel
          ? '尊贵的 VIP' + data.vipLevel + ' 用户 ' + data.nickname
          : data.nickname
        } `,
        6000
      )
    },
    //退出用户
    logout({ commit }) {
      //clear token
      commit('setToken', '')
      //clear userInfo
      commit('setUserInfo', '')
      //refresh page
      location.reload()
    }
  }
}
