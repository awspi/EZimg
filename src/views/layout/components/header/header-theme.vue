<template>
  <m-popover placement="bottom-left">
    <!-- *具名插槽:触发弹层的视图 -->
    <template #reference>
      <m-svg-icon
        :name="svgIconName"
        class="w-4 h-4 p-1 rounded-sm duration-200 outline-none hover:bg-zinc-100/60 dark:hover:bg-zinc-900"
        fillClass="fill-zinc-900 dark:fill-zinc-300"
      ></m-svg-icon>
    </template>
    <!-- *匿名插槽:弹出层 -->
    <div class="w-[140px] overflow-hidden">
      <div
        class="flex items-center p-1 cursor-pointer rounded hover:bg-zinc-100/60 dark:hover:bg-zinc-800"
        v-for="item in themeArr"
        :key="item.id"
        @click="onItemClick(item)"
      >
        <m-svg-icon
          :name="item.icon"
          class="w-1.5 h-1.5 mr-1"
          fillClass="fill-zinc-900 dark:fill-zinc-300"
        ></m-svg-icon>
        <span class="text-zinc-800 text-sm dark:text-zinc-300">{{
          item.name
        }}</span>
      </div>
    </div>
  </m-popover>
</template>

<script setup>
import { THEME_LIGHT, THEME_DARK, THEME_SYSTEM } from '@/constants/index.js'
import { computed } from 'vue'
import { useStore } from 'vuex'
const themeArr = [
  { id: '0', type: THEME_LIGHT, icon: 'theme-light', name: '极简白' },
  { id: '1', type: THEME_DARK, icon: 'theme-dark', name: '极夜黑' },
  { id: '2', type: THEME_SYSTEM, icon: 'theme-system', name: '跟随系统' }
]
//1.监听主题切换的行为
//2.根据行为保存当前需要展示的主题到vuex
//3.根据vuex中的主题 展示对应的显示图标
//4.根据vuex中的主题 设置html的class=“dark”
/**
 * theme切换
 */
const store = useStore()
const onItemClick = (item) => {
  store.commit('theme/changeThemeType', item.type)
}
/**
 * 展示图标
 */
const svgIconName = computed(() => {
  const themeTarget = themeArr.find((item) => {
    return item.type === store.getters.themeType
  })
  return themeTarget?.icon
})
</script>

<style lang="scss" scoped></style>
