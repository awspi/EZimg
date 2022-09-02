import { isMobileTerminal } from '@/utils/flexible'

export default {
  //简单访问
  categorys: (state) => state.category.categorys,
  themeType: (state) => state.theme.themeType,
  currentCategory: (state) => state.app.currentCategory,
  currentCategoryIndex: (state, getters) => {
    const res = getters.categorys.findIndex((item) => {
      return item.id === getters.currentCategory.id
    })
    return res
  },
  //搜索历史
  historys: (state) => state.search.historys,
  //搜索框内容
  searchText: (state) => state.app.searchText,
  //TOKEN
  token: (state) => state.user.token,
  //用户信息
  userInfo: (state) => state.user.userInfo,
  //routerType 路由跳转方式
  routerType: (state) => {
    if (!isMobileTerminal.value) {
      return 'none'
    }
    return state.app.routerType
  }
}
