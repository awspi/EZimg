import { watch } from 'vue'
import store from '@/store'
import { THEME_LIGHT, THEME_DARK, THEME_SYSTEM } from '@/constants/index.js'
/**
 *!监听系统主题改变
 */
let matchMedia = null
const watchSystemThemeChange = () => {
  //*只需要初始化一次
  if (matchMedia) return
  matchMedia = window.matchMedia('(prefers-color-scheme:dark)')
  matchMedia.onchange = () => {
    changeTheme(THEME_SYSTEM)
  }
}
/**
 * 变更主题
 * @param {} theme 主题标记
 */
const changeTheme = (theme) => {
  let themeClassName = ''
  switch (theme) {
    case THEME_LIGHT:
      themeClassName = 'light'
      break
    case THEME_DARK:
      themeClassName = 'dark'
      break
    case THEME_SYSTEM:
      //调用方法监听主题方法
      watchSystemThemeChange()
      themeClassName = matchMedia.matches ? 'dark' : 'light'
      break
  }
  document.querySelector('html').className = themeClassName
}
/**
 * 初始化主题
 */
export default () => {
  //1.当主题发生改变/进入系统时 对html class进行配置
  watch(() => store.getters.themeType, changeTheme, {
    //初始化执行
    immediate: true
  })
}
