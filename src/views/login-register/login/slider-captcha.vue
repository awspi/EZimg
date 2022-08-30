<template>
  <div
    class="text-sm bg-white dark:bg-zinc-800 rounded border border-zinc-200 dark:border-zinc-900 shadow-3xl fixed top-[20%] left-[50%] translate-x-[-50%] w-[340px] h-[270px]"
  >
    <!-- 头部  -->
    <div class="flex items-center h-5 text-left px-1 mb-1">
      <span class="flex-grow dark:text-zinc-200">请完成验证</span>
      <!-- 刷新 -->
      <m-svg-icon
        name="refresh"
        fillClass="fill-zinc-900 "
        class="w-3 h-3 p-0.5 rounded-sm dark:fill-zinc-900 cursor-pointer hover:bg-zinc-200 dark:hover:bg-zinc-900"
        @click="onReset"
      ></m-svg-icon>
      <!-- 关闭 -->
      <m-svg-icon
        name="close"
        fillClass="fill-zinc-900 "
        class="ml-2 w-3 h-3 p-0.5 rounded-sm dark:fill-zinc-900 cursor-pointer hover:bg-zinc-200 dark:hover:bg-zinc-900"
        @click="onClose"
      ></m-svg-icon>
    </div>
    <div id="captcha"></div>
  </div>
</template>

<script>
const EMITS_CLOSE = 'close'
const EMITS_SUCCESS = 'success'
</script>

<script setup>
import '@/vendor/SliderCaptcha/slidercaptcha.min.css'
import '@/vendor/SliderCaptcha/longbow.slidercaptcha.min.js'
import { onMounted } from 'vue'
import { getCaptcha } from '@/api/sys'

const emits = defineEmits([EMITS_CLOSE, EMITS_SUCCESS])

/**
 * 创建人类行为验证
 */
let captcha = null
onMounted(() => {
  captcha = sliderCaptcha({
    //渲染位置
    id: 'captcha',
    //*用户拼图完成之后的回调
    async onSuccess(behavior) {
      const res = await getCaptcha({ behavior })
      if (res) {
        emits(EMITS_SUCCESS)
      }
    },
    //fall
    onFail() {
      console.log('fall')
    },
    //默认的验证方法
    verify() {
      return true
    }
  })
})

/**
 * 重置
 */
const onReset = () => {
  captcha.reset()
}
/**
 * 关闭
 */
const onClose = () => {
  emits(EMITS_CLOSE)
}
</script>

<style lang="scss" scoped></style>
