import { ALL_CATEGORY_ITEM } from '@/constants'
/**
 * app 模块中的数据不会被缓存
 */
export default {
  namespaced: true,
  state: () => {
    return {
      // 当前选中的分类
      currentCategory: ALL_CATEGORY_ITEM,
      //搜索的文本
      searchText: ''
    }
  },
  mutations: {
    /**
     * 切换选中的分类
     */
    changeCurrentCategory(state, newCategory) {
      state.currentCategory = newCategory
    },
    /**
     * 修改searchText
     */
    changeSearchText(state, newSearchText) {
      state.searchText = newSearchText
    }
  },
  actions: {}
}
