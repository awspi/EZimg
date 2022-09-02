<template>
  <!-- 路由出口 -->
  <router-view v-slot="{ Component }">
    <!-- 动画组件 -->
    <transition :name="transitionName" @before-enter="beforeEnter" @after-leave="afterLeave">
      <!-- 缓存组件 -->
      <!-- 动态组件 -->
      <!--
          ?当使用 <component :is="..."> 来在多个组件间作切换时，被切换掉的组件会被卸载。我们可以通过 <KeepAlive> 组件强制被切换掉的组件仍然保持“存活”的状态。
            -->
      <!-- 同域名下的跳转,比如(动态路由 detail/:id) -->
      <!-- <component :is="Component" :key="$route.fullPath" /> -->
      <!-- ?<KeepAlive> 默认会缓存内部的所有组件实例，但我们可以通过 include 和 exclude prop 来定制该行为 -->
      <keep-alive :include="virtualTaskStack">
        <component :is="Component" :key="$route.fullPath"
          :class='{ "fixed left-0 top-0 w-screen z-50": isAnimation }' />
      </keep-alive>
    </transition>
  </router-view>
</template>

<script>
const NONE = 'none'
const ROUTER_TYPE_PUSH = 'push'
const ROUTER_TYPE_BACK = 'back'
const ROUTER_TYPE_ENUM = [NONE, ROUTER_TYPE_PUSH, ROUTER_TYPE_BACK]
//在vuex中维护了一个routerType 决定每次跳转执行什么动画
</script>

<script setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router';

const props = defineProps({
  //路由的跳转类型,进入组件,退出组件
  routerType: {
    type: String,
    default: NONE,
    validator(val) {
      const res = ROUTER_TYPE_ENUM.includes(val)
      if (!res) {
        throw new Error(`${val} routerType必须是${ROUTER_TYPE_ENUM}中的一项`)
      }
      return res
    }
  },
  //!首页的组件名称->永远位于栈底
  mainComponentName: {
    type: String,
    required: true
  }
})

// !虚拟任务栈 先进后出 [home,my,profile] -->
const virtualTaskStack = ref([props.mainComponentName])

/**
 * router前置守卫
 * routerType->transitionName
 * 监听路由变化
 */
const transitionName = ref('')
const router = useRouter()
router.beforeEach((to, from) => {
  console.log(to);
  // 定义当前动画名称
  transitionName.value = props.routerType
  //入栈
  if (props.routerType === ROUTER_TYPE_PUSH) {
    virtualTaskStack.value.push(to.name)//router name、component name
  } else if (props.routerType === ROUTER_TYPE_BACK) {
    //出栈
    virtualTaskStack.value.pop()
  }
  // 进入首页默认清空栈
  if (to.name === props.mainComponentName) {
    clearTask()
  }
})

/**
 * 清空栈
 * 当进入首页调用
 */
const clearTask = () => {
  virtualTaskStack.value = [props.mainComponentName]
}




//处理动画状态 (是否有相应的class) 跳转前加上,跳转后取消
const isAnimation = ref(false)
const beforeEnter = () => {
  isAnimation.value = true
}
const afterLeave = () => {
  isAnimation.value = false
}


</script>

<style lang="scss" scoped>
// 过渡动画 移动端路由跳转

// push页面时：新页面的进入动画
.push-enter-active {
  animation-name: push-in;
  animation-duration: 0.4s;
}

// push页面时：老页面的退出动画
.push-leave-active {
  animation-name: push-out;
  animation-duration: 0.4s;
}

// push页面时：新页面的进入动画
@keyframes push-in {
  0% {
    transform: translate(100%, 0);
  }

  100% {
    transform: translate(0, 0);
  }
}

// push页面时：老页面的退出动画
@keyframes push-out {
  0% {
    transform: translate(0, 0);
  }

  100% {
    transform: translate(-50%, 0);
  }
}

// 后退页面时：即将展示的页面动画
.back-enter-active {
  animation-name: back-in;
  animation-duration: 0.4s;
}

// 后退页面时：后退的页面执行的动画
.back-leave-active {
  animation-name: back-out;
  animation-duration: 0.4s;
}

// 后退页面时：即将展示的页面动画
@keyframes back-in {
  0% {
    width: 100%;
    transform: translate(-100%, 0);
  }

  100% {
    width: 100%;
    transform: translate(0, 0);
  }
}

// 后退页面时：后退的页面执行的动画
@keyframes back-out {
  0% {
    width: 100%;
    transform: translate(0, 0);
  }

  100% {
    width: 100%;
    transform: translate(50%, 0);
  }
}
</style>
