import { ALL_CATEGORY_ITEM, CATEGORY_NOMAR_DATA } from '@/constants'
import { getCategory } from '@/api/category.js'
/**
 * 处理navigationBar中的数据category
 */
export default {
  //独立作用域
  namespaced: true,
  state: () => ({
    //?解决navigation抖动问题
    //1.让category具备一个初始化数据
    //2.从服务端获取数据,替换初始化数据
    //3.防止数据太老->把每次获取到的数据都做为下一次的初始化数据->设置缓存 localstorage/vuex-persistedstate
    categorys: CATEGORY_NOMAR_DATA
  }),
  mutations: {
    setCategorys(state, newCategorys) {
      state.categorys = [ALL_CATEGORY_ITEM, ...newCategorys]
    }
  },
  actions: {
    async useCategoryData({ commit }) {
      const { categorys } = await getCategory()
      commit('setCategorys', categorys)
    }
  }
}
