<template>
  <div
    class="w-full z-50 bg-white dark:bg-zinc-900 border-b border-b-zinc-200 dark:border-b-zinc-700 px-2 py-1 duration-500">
    <div class="flex items-center">
      <img class="guide-home h-4 cursor-pointer mr-2"
        src="http://img9.vilipix.com/picture/logo/2021/01/16/19/39/19610301_3f750ac7559f829ee2fdab2a25637e07_170.jpg"
        alt="" @click="onToHome" />
      <header-search-vue class="mr-2"></header-search-vue>
      <header-theme-vue class="mr-2"></header-theme-vue>
      <header-my-vue class="mr-2"></header-my-vue>
    </div>
  </div>
</template>

<script setup>
import headerMyVue from './header-my.vue'
import headerThemeVue from './header-theme.vue'
import headerSearchVue from './header-search/index.vue'
import { useRouter } from 'vue-router'

const router = useRouter()
const onToHome = () => {
  router.push('/')
}
</script>

<style lang="scss" scoped>
</style>
