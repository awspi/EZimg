import { computed } from 'vue'
import { useWindowSize } from '@vueuse/core'

import { PC_DEVICE_WIDTH } from '../constants'
/**
 * 判断是否为移动设备
 * 依据:屏幕宽度是否大于1280
 */

const { width } = useWindowSize()
export const isMobileTerminal = computed(() => {
  return width.value < PC_DEVICE_WIDTH
})
