<template>
  <div class="fixed bottom-10 right-3">
    <!-- 回到顶部 -->
    <div
      @click="a"
      class="w-4 h-4 mb-1 bg-white dark:bg-zinc-900 border dark:border-0 border-zinc-200 rounded-full flex justify-center items-center cursor-pointer duration-200 hover:shadow-lg group"
    >
      <m-svg-icon
        name="top"
        class="w-2 h-2"
        fillClass="fill-zinc-900 drak:fill-zinc-200 group-hover:fill-main"
      ></m-svg-icon>
    </div>
    <!-- 引导 -->
    <div
      class="w-4 h-4 mb-1 bg-white dark:bg-zinc-900 border dark:border-0 border-zinc-200 rounded-full flex justify-center items-center cursor-pointer duration-200 hover:shadow-lg group"
    >
      <m-svg-icon
        name="guide"
        class="w-2 h-2"
        fillClass="fill-zinc-900 drak:fill-zinc-200 group-hover:fill-main"
      ></m-svg-icon>
    </div>
    <!-- 反馈 -->
    <m-popover class="flex items-center" placement="top-left">
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

<script setup></script>

<style lang="scss" scoped></style>
