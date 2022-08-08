import { useIntersectionObserver } from '@vueuse/core'
export default {
  //图片懒加载 在用户看不到图片时不加载图片.等可以看到图片时再去加载
  mounted(el) {
    //el-> 绑定指令的dom元素
    //1.拿到img的src
    const imgSrc = el.src
    //2.把src变为空
    el.src = ''

    const { stop } = useIntersectionObserver(el, ([{ isIntersecting }]) => {
      //3.当图片可见时 加载图片
      if (isIntersecting) {
        el.src = imgSrc
        //4.停止监听
        stop()
      }
    })
  }
}
