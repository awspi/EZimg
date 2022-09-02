<template>
  <div class="bg-white dark:bg-zinc-900 duration-500 sticky top-0 left-0 z-10  ">
    <ul ref="ulTarget" class="relative flex overflow-x-auto p-1 text-xs text-zinc-600 overflow-hidden ">
      <!-- 滑块 -->
      <li ref="sliderTarget" :style="sliderStyle"
        class="absolute h-[22px] bg-zinc-900 dark:bg-zinc-700 rounded-lg duration-200"></li>
      <!-- 汉堡按钮 -->
      <li
        class="z-20 fixed top-0 right-[-1px] h-4 px-1 flex items-center bg-white dark:bg-zinc-900 shadow-l-white dark:shadow-l-zinc"
        @click="onShowPopup">
        <m-svg-icon name="hamburger" class="w-1.5 h-1.5"></m-svg-icon>
      </li>
      <!-- items -->
      <li v-for="(item, index) in $store.getters.categorys" :key="item.id"
        class="shrink-0 px-1.5 py-0.5 duration-200 last:mr-4 z-10" :ref="setItemRef" :class="{
          'text-zinc-100': $store.getters.currentCategoryIndex === index
        }" @click="onItemClick(item)">
        {{ item.name }}
      </li>
    </ul>
    <m-popup v-model="isVisible">
      <menu-vue @onItemClick="onItemClick"></menu-vue>
    </m-popup>
  </div>
</template>

<script setup>
import { onBeforeUpdate, ref, watch } from 'vue'
import { useStore } from 'vuex'
import { useScroll } from '@vueuse/core'
import MenuVue from '@/views/main/components/menu/index.vue'


const store = useStore()
//
//滑块
const sliderStyle = ref({
  transform: 'translateX(0px)',
  width: '52px'
})

//获取所有itemRef
let itemRefs = []
const setItemRef = (el) => {
  el && itemRefs.push(el)
}
//数据响应后,DOM变化前
onBeforeUpdate(() => {
  itemRefs = []
})
//ul ref
const ulTarget = ref()
//通过vueuse的useScroll获取响应式的scroll滚动距离
const { x: ulScrollLeft } = useScroll(ulTarget)
watch(
  //watch 监听getters的时候,需要传递一个函数
  () => store.getters.currentCategoryIndex,
  (val) => {
    const { left, width } = itemRefs[val].getBoundingClientRect()
    //DOMRect {x: 72.53125, y: 9.75, width: 53.25, height: 23.3984375, top: 9.75, …}

    sliderStyle.value = {
      //滑块位置=ul横向滑动位置+当前元素left-ul的padding
      transform: `translateX(${ulScrollLeft.value + left - 10}px)`,
      width: width + 'px'
    }
  }
)
//item 点击
const onItemClick = (item) => {
  store.commit('app/changeCurrentCategory', item)
  isVisible.value = false
}

//控制popup显示
const isVisible = ref(false)
const onShowPopup = () => {
  isVisible.value = true
}
</script>

<style lang="scss" scoped>
</style>
