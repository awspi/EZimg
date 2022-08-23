<template>
  <m-popover class="flex items-center" placement="bottom-left">
    <template #reference>
      <div v-if="isLogin"
        class="relative flex items-center p-0.5 rounded cursor-pointer duration-200 outline-none hover:bg-zinc-100 dark:hover:bg-zinc-900">
        <!-- 头像 -->
        <img class="w-3 h-3 rounded-sm"
          src="http://img9.vilipix.com/picture/logo/2021/01/16/19/39/19610301_3f750ac7559f829ee2fdab2a25637e07_170.jpg" />
        <!-- vip  -->
        <m-svg-icon class="h-1.5 w-1.5 absolute right-[16px] bottom-0" name="vip" fillClass="fill-zinc-900">
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
    <div v-if="isLogin" class="w-[140px] overflow-hidden">
      <div class="flex items-center p-1 cursor-pointer rounded hover:bg-slate-100/60 dark:hover:bg-zinc-800"
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
import { ref } from 'vue';
import { useRouter } from 'vue-router';
const isLogin = ref(false)
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
  router.push('/login')
}
</script>

<style lang="scss" scoped>
</style>
