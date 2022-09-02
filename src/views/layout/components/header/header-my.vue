<template>
  <m-popover class="flex items-center" placement="bottom-left">
    <template #reference>
      <div v-if="$store.getters.userInfo.avatar"
        class="relative flex items-center p-0.5 rounded cursor-pointer duration-200 outline-none hover:bg-zinc-100 dark:hover:bg-zinc-900">
        <!-- 头像 -->
        <img class="w-3 h-3 rounded-sm" :src="$store.getters.userInfo.avatar" />
        <!-- vip  -->
        <m-svg-icon v-if="$store.getters.userInfo.vipLevel" class="h-1.5 w-1.5 absolute right-[16px] bottom-0"
          name="vip" fillClass="fill-zinc-900">
        </m-svg-icon>
        <!-- 下箭头 -->
        <m-svg-icon class="h-1.5 w-1.5 ml-0.5" name="down-arrow" fillClass="fill-zinc-900 dark:fill-zinc-300">
        </m-svg-icon>
      </div>
      <div v-else>
        <m-button class="guide-my" icon="profile" iconColor="#fff" @click="onToLogin"></m-button>
      </div>
    </template>
    <!-- 气泡 -->
    <div v-if="$store.getters.userInfo.avatar" class="w-[140px] overflow-hidden">
      <div @click="onItemClick(item)"
        class="flex items-center p-1 cursor-pointer rounded hover:bg-slate-100/60 dark:hover:bg-zinc-800"
        v-for="item in menuArr" :key="item.id">
        <m-svg-icon :name="item.icon" class="w-1.5 h-1.5 mr-1" fillClass="fill-zinc-900 dark:fill-zinc-300">
        </m-svg-icon>
        <span class="text-sm text-zinc-800 dark:text-zinc-300">{{
            item.title
        }}</span>
      </div>
    </div>
  </m-popover>
</template>

<script setup>
import { useRouter } from 'vue-router'
import { useStore } from 'vuex'
import { confirm } from '../../../../libs'
const store = useStore()
const router = useRouter()
const menuArr = [
  {
    id: 0,
    title: '个人资料',
    icon: 'profile',
    path: '/profile'
  },
  {
    id: 1,
    title: '升级vip',
    icon: 'vip-profile',
    path: '/memeber'
  },
  {
    id: 2,
    title: '退出登录',
    icon: 'logout',
    path: ''
  }
]
/**
 * 登录按钮
 */
const onToLogin = () => {
  //移动端下跳转的类型
  store.commit('app/changeRouterType', 'push')
  router.push('/login')
}
/**
 * 处理下拉菜单点击事件
 */
const onItemClick = (item) => {
  console.log(item.id);
  switch (item.id) {
    case 0:
      router.push(item.path)
      break
    case 1:
      router.push('/member')
      break
    case 2:
      confirm('确定退出吗?').then(() => {
        store.dispatch('user/logout')
        router.push('/')
      })
      break

    default:
      break
  }
}
</script>

<style lang="scss" scoped>
</style>
