<template>
  <div class="guide-search w-full">
    <m-search v-model="inputValue" @search="onSearchHandler">
      <template #dropdown>
        <!-- 搜索提示 -->
        <hint-vue v-show="inputValue" :searchText="inputValue" @itemClick="onSearchHandler"></hint-vue>
        <!-- 最近搜索  -->
        <history-vue v-show="!inputValue" @itemClick="onSearchHandler"></history-vue>
        <!-- 推荐主题 -->
        <theme-vue v-show="!inputValue"></theme-vue>
      </template>
    </m-search>
  </div>
</template>

<script setup>
import hintVue from './hint.vue'
import historyVue from './history.vue'
import themeVue from './theme.vue'
import { ref } from 'vue'
import { useStore } from 'vuex'
const store = useStore()
const inputValue = ref('')
/**
 * 搜索回调
 * @param {} val
 */
const onSearchHandler = (val) => {
  inputValue.value = val
  val && store.commit('search/addHistory', val)
  // 触发searchText变化
  store.commit('app/changeSearchText', val)
}
</script>

<style lang="scss" scoped>

</style>
