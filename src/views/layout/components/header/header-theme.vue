<template>
  <m-popover placement="bottom-left">
    <template #reference>
      <m-svg-icon
        name="theme-light"
        class="w-4 h-4 p-1 rounded-sm duration-200 outline-none hover:bg-zinc-100/60"
      ></m-svg-icon>
    </template>
    <div class="w-[140px] overflow-hidden">
      <div
        class="flex items-center p-1 cursor-pointer rounded hover:bg-zinc-100/60"
        v-for="item in themeArr"
        :key="item.id"
      >
        <m-svg-icon
          :name="item.icon"
          class="w-1.5 h-1.5 mr-1"
          fillClass="fill-zinc-900"
        ></m-svg-icon>
        <span class="text-zinc-800 text-sm">{{ item.name }}</span>
      </div>
    </div>
  </m-popover>
</template>

<script setup>
import { THEME_LIGHT, THEME_DARK, THEME_SYSTEM } from '@/constants/index.js'
const themeArr = [
  { id: '0', type: THEME_LIGHT, icon: 'theme-light', name: '极简白' },
  { id: '1', type: THEME_DARK, icon: 'theme-dark', name: '极夜黑' },
  { id: '2', type: THEME_SYSTEM, icon: 'theme-system', name: '跟随系统' }
]
</script>

<style lang="scss" scoped></style>
