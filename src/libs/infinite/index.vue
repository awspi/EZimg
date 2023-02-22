<template>
  <div>
    <slot />
    <div ref="loadingTarget" class="h-6 py-4">
      <!-- 加载完成 -->
      <m-svg-icon
        v-show="loading"
        class="w-4 h-4 mx-auto animate-spin"
        name="infinite-load"
      ></m-svg-icon>
      <!-- 没有更多数据 -->
      <p v-if="isFinished" class="text-center text-base text-zinc-400">
        到底了~
      </p>
    </div>
  </div>
</template>

<script setup>
import { useVModel, useIntersectionObserver } from '@vueuse/core'

import { ref, watch } from 'vue'

const props = defineProps({
  //是否处于加载状态
  modelValue: {
    type: Boolean,
    required: true
  },
  //数据是否全部加载完毕
  isFinished: {
    type: Boolean,
    default: false
  }
})

const emits = defineEmits(['onLoad', 'update:modelValue'])
//处理loading
const loading = useVModel(props)
//-----
// 记录是否可见
const targetIsIntersection = ref(false)
const loadingTarget = ref(null)
useIntersectionObserver(loadingTarget, ([{ isIntersecting }]) => {
  targetIsIntersection.value = isIntersecting
  // 每次可见状态改变了就调用emitLoad()
  emitLoad()
})
/**
 * 触发load事件
 */
const emitLoad = () => {
  //当 加载更多的视图可见
  // && loading==false 保证不重复触发加载命令
  // && 数据尚未全部加载完成 加载完了就不去触发加载命令
  if (targetIsIntersection.value && !loading.value && !props.isFinished) {
    loading.value = true
    //emits onLoad
    emits('onLoad')
  }
}
/**
 * 监听loading变化
 * * 解决数据加载完成但是因为首屏未铺满的情况下 标
 * * 标识的isIntersecting不发生改变 导致不会触发emitLoad
 *
 */
watch(loading, () => {
  setTimeout(() => {
    // 触发 load，延迟处理，等待 渲染和 useIntersectionObserver 的再次触发
    emitLoad()
  }, 100)
})
</script>

<style lang="scss" scoped></style>
