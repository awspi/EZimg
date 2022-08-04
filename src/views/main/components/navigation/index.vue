<template>
  <mobile-navigation-vue v-if="isMobileTerminal"></mobile-navigation-vue>
  <mobile-navigation-vue v-else="isMobileTerminal"></mobile-navigation-vue>
</template>

<script setup>
import { isMobileTerminal } from '@/utils/flexible.js'
import mobileNavigationVue from './mobile/index.vue'
import pcNavigationVue from './mobile/index.vue'
</script>

<style lang="scss" scoped></style>
