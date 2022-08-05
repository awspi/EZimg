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

/**
 * 动态指定rem基准值,最大不超过40px
 * 根据用户屏幕宽度进行计算,计算出的值设置html根标签作为front-size的大小
 */

export const useRem = () => {
  //max_fz
  const MAX_FONT_SIZE = 40
  //监听html解析完成
  document.addEventListener('DOMContentLoaded', () => {
    // 拿到html标签
    const html = document.querySelector('html')
    //计算fz=屏幕宽度/10
    let fontSize = window.innerWidth / 10
    fontSize = fontSize > MAX_FONT_SIZE ? MAX_FONT_SIZE : fontSize
    //赋值给html
    html.style.fontSize = fontSize + 'px'
  })
}
