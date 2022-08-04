<template>
  <div>{{ isMobileTerminal }}</div>
  <!-- 一级路由出口 -->
  <router-view></router-view>
</template>

<script setup>
import { isMobileTerminal } from '@/utils/flexible'
</script>

<style lang="scss" scoped></style>
