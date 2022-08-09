/**
 * 搜索
 */
export default {
  namespaced: true,
  state: () => {
    return {
      historys: []
    }
  },
  mutations: {
    /**
     * 新增
     * 1.新增的历史插入到头部
     * 2.不可出现重复
     */
    addHistory(state, newHistory) {
      const isFindIndex = state.historys.findIndex(
        (item) => item === newHistory
      )
      if (isFindIndex !== -1) {
        state.historys.splice(isFindIndex, 1)
      }
      state.historys.unshift(newHistory)
    },
    /**
     * 单个删除
     */
    deleteHistory(state, index) {
      state.historys.splice(index, 1)
    },
    /**
     * 全部删除
     */
    deleteAllHistory(state) {
      state.historys = []
    }
  },
  actions: {}
}
