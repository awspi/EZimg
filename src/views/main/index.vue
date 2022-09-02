<template>
  <div ref="containerTarget"
    class="h-full overflow-auto bg-white dark:bg-zinc-800 duration-500 scrollbar-thin scrollbar-thumb-transparent xl:scrollbar-thumb-zinc-200 xl:dark:scrollbar-thumb-zinc-900 scrollbar-track-transparent">
    <navigation-vue>
    </navigation-vue>
    <div class="max-w-screen-xl mx-auto relative m-1 xl:mt-4">
      <list-vue></list-vue>
    </div>
    <!-- mobile tab-bar  -->
    <m-trigger-menu v-if="isMobileTerminal" class="fixed bottom-6 left-0 right-0 m-auto w-[220px]">
      <m-trigger-menu-item icon="home" iconClass="fill-zinc-900 dark:fill-zinc-200">首页</m-trigger-menu-item>

      <m-trigger-menu-item v-if="$store.getters.token" icon="vip" iconClass="fill-zinc-400 dark:fill-zinc-500"
        textClass="text-zinc-400 dark:text-zinc-500" @click="onVipClick">
        VIP
      </m-trigger-menu-item>

      <m-trigger-menu-item v-if="$store.getters.token" icon="profile" iconClass="fill-zinc-00 dark:fill-zinc-500"
        textClass="text-zinc-400 dark:text-zinc-500" @click="onMyClick">
        {{ $store.getters.token ? '我的' : '去登录' }}
      </m-trigger-menu-item>
    </m-trigger-menu>
  </div>
</template>

<script>
//声明组件名称
export default {
  name: 'home'
}
</script>

<script setup>
import navigationVue from './components/navigation/index.vue'
import listVue from './components/list/index.vue'
import { isMobileTerminal } from '@/utils/flexible';
import { useRouter } from 'vue-router';
import { useStore } from 'vuex';
import { onActivated, ref } from 'vue';
import { useScroll } from '@vueuse/core';
console.log('组件home被渲染');
const router = useRouter()
const store = useStore()
/**
 * VIP 跳转
 */
const onVipClick = () => {
  router.push('/member')
}
/**
 * profile 跳转
 */
const onMyClick = () => {
  //移动端下跳转的类型
  store.commit('app/changeRouterType', 'push')
  if (store.getters.token) {
    router.push('/profile')
  } else {
    router.push('/login')
  }
}

//记忆滚动位置
const containerTarget = ref(null)
const { y: containerTargetScrollY } = useScroll(containerTarget)
// 被缓存的组件再次可见，会回调 onActivated 方法
onActivated(() => {
  if (!containerTarget.value) {
    return
  }
  containerTarget.value.scrollTop = containerTargetScrollY.value
})
</script>

<style lang="scss" scoped>
</style>
