<template>
  <transition name="down">
    <div
      v-show="isVisible"
      class="min-w-[420px] fixed top-[20px] left-[50%] translate-x-[-50%] z-50 flex items-center px-3 py-1.5 rounded-sm border cursor-pointer"
      :class="styles[type].containerClass"
    >
      <m-svg-icon
        :name="styles[type].icon"
        :fillClass="styles[type].fillClass"
        class="w-1.5 h-1.5 mr-1.5"
      ></m-svg-icon>
      <span class="text-sm" :class="styles[type].textClass">{{ content }}</span>
    </div>
  </transition>
</template>
<script>
const SUCCESS = 'success'
const WARN = 'warn'
const ERROR = 'error'
const typeEnum = [SUCCESS, WARN, ERROR]
</script>
<script setup>
import mSvgIcon from '../svg-icon/index.vue'
import { onMounted, ref } from 'vue'

const props = defineProps({
  //msg消息类型
  type: {
    type: String,
    required: true,
    validator(val) {
      const res = typeEnum.includes(val)
      if (!res) {
        throw new Error(`type必须为${typeEnum}中的一项`)
      }
      return res
    }
  },
  //描述内容
  content: {
    type: String,
    required: true
  },
  //展示时长
  duration: {
    type: Number
  },
  //关闭回调
  destory: {
    type: Function
  }
})
const styles = {
  //warn
  warn: {
    icon: 'warn',
    fillClass: 'fill-warn-300',
    textClass: 'text-warn-300',
    containerClass:
      'bg-warn-300 border-warn-200 hover:shadow-lg hover:shadow-warn-100'
  },
  //error
  error: {
    icon: 'error',
    fillClass: 'fill-error-300',
    textClass: 'text-error-300',
    containerClass:
      'bg-error-300 border-error-200 hover:shadow-lg hover:shadow-error-100'
  },
  //success
  success: {
    icon: 'success',
    fillClass: 'fill-success-300',
    textClass: 'text-success-300',
    containerClass:
      'bg-success-300 border-success-200 hover:shadow-lg hover:shadow-success-100'
  }
}
//isVisible
const isVisible = ref(false)
/**
 * 保证动画展示,需要在mounted之后进行展示
 */

onMounted(() => {
  isVisible.value = true
  setTimeout(() => {
    isVisible.value = false
  }, props.duration)
})
</script>

<style lang="scss" scoped>
.down-enter-active,
.down-leave-active {
  transition: all 0.5s;
}
.down-enter-from,
.down-leave-to {
  opacity: 0;
  transform: translate3d(-50%, -100px, 0);
}
</style>
