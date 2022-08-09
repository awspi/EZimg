<template>
  <div>
    <div
      @click="onItemClick(item)"
      v-for="(item, index) in hintData"
      :key="index"
      class="py-1 pl-1 text-bold text-zinc-500 rounded cursor-pointer duration-300 hover:bg-zinc-200 dark:hover:bg-zinc-900"
      v-html="highlightText(item)"
    ></div>
  </div>
</template>
<script>
const EMITS_ITEM_CLICK = 'itemClick'
</script>
<script setup>
import { ref, watch } from 'vue'
import { getHint } from '@/api/pexels.js'
import { watchDebounced } from '@vueuse/shared'
const props = defineProps({
  searchText: {
    type: String,
    required: true
  }
})
const emits = defineEmits([EMITS_ITEM_CLICK])
/**
 * 获取搜索提示的数据
 */

const hintData = ref([])
const getHintData = async () => {
  const { result } = await getHint({
    q: props.searchText
  })
  hintData.value = result
}
/**
 * watch 可以监听 ref响应式数据/包含getter的函数
 */
watchDebounced(() => props.searchText, getHintData, {
  immediate: true,
  debounce: 500
})
const onItemClick = (item) => {
  emits(EMITS_ITEM_CLICK, item)
}
/**
 * 处理关键词高亮
 */
const highlightText = (text) => {
  const hightlightStr = `<span class="text-zinc-900 dark:text-zinc-200">${props.searchText}</span>`
  //正则->从显示的文本中找出与用户输入的内容相同的内容 用高亮标签进行替换
  const reg = new RegExp(props.searchText, 'gi')
  return text.replace(reg, hightlightStr)
}
</script>

<style lang="scss" scoped></style>
