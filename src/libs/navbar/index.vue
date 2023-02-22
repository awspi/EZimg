<template>
  <div
    class="w-full h-5 border-b flex items-center z-10 bg-white dark:bg-zinc-800 border-b-zinc-200 dark:border-b-zinc-700"
    :class="[sticky ? 'sticky top-0 left-0' : 'relative ']">
    <!-- left  -->
    <div @click="onClickLeft" class="h-full w-5 absolute left-0 flex items-center justify-center">
      <slot name="left">
        <m-svg-icon name="back" class="w-2 h-2" fillClass="fill-zinc-900 dark:fill-zinc-200"></m-svg-icon>
      </slot>
    </div>
    <!-- center  -->
    <div class="h-full flex items-center justify-center m-auto font-bold text-base text-zinc-900 dark:text-zinc-200">
      <slot />
    </div>
    <!-- right  -->
    <div @click="onClickRight" class="h-full w-5 absolute right-0 flex items-center justify-center">
      <slot name="right" />
    </div>
  </div>
</template>

<script setup>
// 移动端 navbar
import { useRouter } from 'vue-router'

const router = useRouter()
const props = defineProps({
  clickLeft: Function, //左边按钮点击
  clickRight: Function, //右边按钮点击
  sticky: Boolean //是否吸顶
})
const onClickLeft = () => {
  props.clickLeft ? props.clickLeft() : router.back()
}
const onClickRight = () => {
  props.clickRight && props.clickRight()
}
</script>

<style lang="scss" scoped>
</style>
