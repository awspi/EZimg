<template>
  <div>
    <slot>
      <p class="text-sm"> {{ showTime }}</p>
    </slot>
  </div>
</template>

<script>
//倒计时结束
const EMITS_FINISH = 'finish'
//倒计时改变
const EMITS_CHANGE = 'change'
//倒计时interval 1000ms
const INTERVAL_COUNT = 1000
</script>
<script setup>
import { computed, onUnmounted, ref, watch } from 'vue';
import dayjs from './utils'

const props = defineProps({
  // ms
  time: {
    type: Number,
    required: true
  },
  //dayjs format standard
  format: {
    type: String,
    default: 'HH:mm:ss'
  }
})
const emits = defineEmits([EMITS_CHANGE, EMITS_FINISH])

//duration
const duration = ref(0)
/**
 * 结束倒计时
 */
const close = () => {
  if (interval) {
    clearInterval(interval)
  }
}
/**
 * 开始倒计时
 */
let interval = null
const start = () => {
  close()
  interval = setInterval(() => {
    durationFn()
  }, INTERVAL_COUNT);
}
/**
 * 监听props.time 开始倒计时
 * null->60000
 */
watch(() => props.time, () => {
  console.log(props.time, '倒计时开始');
  duration.value = props.time
  start()
}, {
  immediate: true
})

/**
 * 倒计时执行函数
 */
const durationFn = () => {
  duration.value -= INTERVAL_COUNT
  emits(EMITS_CHANGE, duration.value)
  //监听结束行为
  if (duration.value <= 0) {
    duration.value = 0
    emits(EMITS_FINISH)
    close()
  }
}

/**
 * 组件销毁时 清除倒计时
 */
onUnmounted(() => {
  close()
})

/**
 * 处理显示时间格式
 */
const showTime = computed(() => {
  return dayjs.duration(duration.value).format(props.format)
})

</script>

<style lang="scss" scoped>
</style>·
