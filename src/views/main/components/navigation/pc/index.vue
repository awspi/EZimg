<template>
  <div
    class="bg-white dark:bg-zinc-800 sticky top-0 left-0 w-full z-10 duration-500"
  >
    <ul
      :class="[isOpenCategory ? 'h-[206px]' : 'h-[56px]']"
      class="w-[800px] relative flex flex-wrap justify-center overflow-x-auto px-[10px] py-1 text-xs text-zinc-600 duration-300 overflow-hidden mx-auto"
    >
      <!-- arrow -->
      <div
        @click="triggerState"
        class="absolute right-1 bottom-1 z-20 p-1 rounded cursor-pointer duration-200 hover: bg-zinc-200 dark:bg-zinc-800 dark:hover:bg-zinc-900"
      >
        <m-svg-icon
          :name="isOpenCategory ? 'fold' : 'unfold'"
          class="w-1 h-1"
          fillClass="fill-zinc-900 dark:fill-zinc-300"
        ></m-svg-icon>
      </div>

      <!-- item  -->
      <li
        @click="onItemClick(item)"
        :class="{
          'text-zinc-900 bg-zinc-200 dark:bg-zinc-300 dark:text-zinc-300':
            $store.getters.currentCategoryIndex === index
        }"
        v-for="(item, index) in $store.getters.categorys"
        :key="item.id"
        class="shrink-0 px-1.5 py-0 z-10 duration-200 text-base font-bold h-4 leading-4 text-zinc-900 dark:text-zinc-500 dark:hover:text-zinc-300 dark:bg-zinc-900 cursor-pointer hover:bg-zinc-200 dark:hover:bg-zinc-900 rounded mr-1 mb-1"
      >
        {{ item.name }}
      </li>
    </ul>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useStore } from 'vuex'
const store = useStore()
/**
 * 展开箭头状态处理
 */
const isOpenCategory = ref(false)
const triggerState = () => {
  isOpenCategory.value = !isOpenCategory.value
}
/**
 * 选中状态处理
 */
const onItemClick = (item) => {
  store.commit('app/changeCurrentCategory', item)
}
</script>

<style lang="scss" scoped></style>
