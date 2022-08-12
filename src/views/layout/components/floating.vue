<template>
  <div class="fixed bottom-10 right-3">
    <!-- 回到顶部 -->
    <div
      @click="onBacktopClick"
      class="guide-backto w-4 h-4 mb-1 bg-white dark:bg-zinc-900 border dark:border-0 border-zinc-200 rounded-full flex justify-center items-center cursor-pointer duration-200 hover:shadow-lg group"
    >
      <m-svg-icon
        name="top"
        class="w-2 h-2"
        fillClass="fill-zinc-900 drak:fill-zinc-200 group-hover:fill-main"
      ></m-svg-icon>
    </div>
    <!-- 引导 -->
    <div
      class="guide-start w-4 h-4 mb-1 bg-white dark:bg-zinc-900 border dark:border-0 border-zinc-200 rounded-full flex justify-center items-center cursor-pointer duration-200 group hover:shadow-lg"
      @click="onGuideClick"
    >
      <m-svg-icon
        name="guide"
        class="w-2 h-2"
        fillClass="fill-zinc-900 drak:fill-zinc-200 group-hover:fill-main"
      ></m-svg-icon>
    </div>
    <!-- 反馈 -->
    <m-popover class="guide-feedback flex items-center" placement="top-left">
      <template #reference>
        <div
          class="w-4 h-4 mb-1 bg-white dark:bg-zinc-900 border dark:border-0 border-zinc-200 rounded-full flex justify-center items-center cursor-pointer duration-200 hover:shadow-lg group"
        >
          <m-svg-icon
            name="feedback"
            class="w-2 h-2"
            fillClass="fill-zinc-900 drak:fill-zinc-200 group-hover:fill-main"
          ></m-svg-icon>
        </div>
      </template>
      <div class="w-[140px] overflow-hidden">
        <div
          class="flex items-center cursor-pointer rounded hover:bg-zinc-100/60 dark:hover:bg-zinc-800"
        >
          <m-svg-icon
            name="feedback"
            class="w-1.5 h-1.5 mr-1"
            fillClass="fill-zinc-900 dark:fill-zinc-300"
          ></m-svg-icon>
          <span class="text-zinc-800 dark:text-zinc-300 text-sm">反馈</span>
        </div>
      </div>
    </m-popover>
  </div>
</template>

<script setup>
import Driver from 'driver.js'
import 'driver.js/dist/driver.min.css'
import steps from './steps'
import { onMounted } from 'vue'

let driver = null
onMounted(() => {
  //引导
  driver = new Driver({
    allowClose: false, // Whether the click on overlay should close or not
    closeBtnText: '关闭', // Text on the close button for this step
    nextBtnText: '下一步', // Next button text for this step
    prevBtnText: '上一步' // Previous button text for this step
  })
})
const onGuideClick = () => {
  driver.defineSteps(steps)
  driver.start()
}
const onBacktopClick = () => {}
</script>

<style lang="scss" scoped>
.driver-fix-stacking {
  position: fixed;
  z-index: 100004 !important;
}
</style>
