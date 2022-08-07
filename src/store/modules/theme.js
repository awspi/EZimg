import { THEME_LIGHT } from '@/constants'
export default {
  namespaced: true,
  state: () => ({
    //当前主题
    themeType: THEME_LIGHT
  }),
  mutations: {
    changeThemeType(state, newThemeType) {
      state.themeType = newThemeType
    }
  }
}
