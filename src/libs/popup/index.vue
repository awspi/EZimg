<template>
  <div>
    <teleport to="body">
      <!-- 蒙版 -->
      <transition name="fade">
        <div
          v-if="isVisible"
          class="w-screen h-screen bg-zinc-900/80 z-40 fixed top-0 left-0"
          @click="isVisible = false"
        ></div>
      </transition>
      <!-- 内容 -->
      <transition name="popup-down-up">
        <div
          v-if="isVisible"
          v-bind="$attrs"
          class="w-screen bg-white dark:bg-zinc-800 z-50 fixed bottom-0"
        >
          <slot />
        </div>
      </transition>
    </teleport>
  </div>
</template>

<script setup>
import { useScrollLock, useVModel } from '@vueuse/core'
import { watch } from 'vue'
const props = defineProps({
  modelValue: {
    required: true,
    type: Boolean
  }
})
//* useVModel返回响应式数据,当isVisible的值改变时,会自动触发emit修改modelValue
const isVisible = useVModel(props)
// const emits = defineEmits(['update:modelValue'])

//锁定滚动
const isLocked = useScrollLock(document.body)
// isVisible和锁定滚动 绑定
watch(
  isVisible,
  (val) => {
    isLocked.value = val
  },
  {
    immediate: true
  }
)
</script>

<style lang="scss" scoped>
//fade
.fade-enter-active,
.fade-leave-active {
  transition: all 0.3s;
}
//准备进入,离开完成
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
//pop-down-up
.popup-down-up-enter-active,
.popup-down-up-leave-active {
  transition: all 0.3s;
}
.popup-down-up-enter-from,
.popup-down-up-leave-to {
  transform: translateY(100%);
}
</style>
