<template>
  <mobile-navigation-vue v-if="isMobileTerminal"></mobile-navigation-vue>
  <pc-navigation-vue v-else></pc-navigation-vue>
</template>

<script setup>
import { isMobileTerminal } from '@/utils/flexible.js'
import mobileNavigationVue from './mobile/index.vue'
import pcNavigationVue from './pc/index.vue'
import { useStore } from 'vuex'

const store = useStore()
//触发store action
store.dispatch('category/useCategoryData')
</script>

<style lang="scss" scoped>
</style>
