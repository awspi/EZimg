<template>
  <div>
    <div class="text-zinc-400 text-xs mb-1">热门精选</div>
    <div class="flex h-[140px]" v-if="themeData.list.length">
      <!-- 大图 -->
      <div
        class="relative rounded w-[260px] cursor-pointer"
        :style="{
          backgroundColor: randomRGB()
        }"
      >
        <img
          v-lazy
          :src="themeData.big.photo"
          class="h-full w-full object-cover rounded"
        />
        <p
          class="absolute bottom-0 left-0 w-full h-full flex items-center backdrop-blur rounded px-1 text-white text-xs duration-300 hover:backdrop-blur-none"
        >
          # {{ themeData.big.title }}
        </p>
      </div>
      <!-- 小图 -->
      <div class="flex flex-wrap flex-1 max-w-[860px]">
        <div
          v-for="item in themeData.list"
          :key="item.id"
          class="h-[45%] w-[260px] text-white text-xs relative ml-1.5 mb-1.5 rounded"
          :style="{
            backgroundColor: randomRGB()
          }"
        >
          <img
            v-lazy
            :src="item.photo"
            class="w-full h-full object-cover rounded"
          />
          <p
            class="backdrop-blur absolute top-0 left-0 w-full h-full flex items-center px-1 cursor-pointer rounded hover:backdrop-blur-none duration-300"
          >
            # {{ item.title }}
          </p>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { getThemes } from '@/api/pexels.js'
import { ref } from 'vue'
import { randomRGB } from '@/utils/color.js'

const themeData = ref({
  big: {},
  list: []
})
const getThemeData = async () => {
  const { themes } = await getThemes()
  themeData.value = {
    big: themes[0],
    list: themes.splice(1, themes.length)
  }
}
getThemeData()
</script>

<style lang="scss" scoped></style>
