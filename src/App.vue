<template>
  <!-- 一级路由出口 -->
  <div class="h-screen fixed top-0 left-0 w-screen">
    <!-- <router-view></router-view> -->
    <!-- ?在vuex中维护了一个routerType 决定每次跳转执行什么动画 -->
    <m-transition-router-view mainComponentName="home" :routerType="$store.getters.routerType">
    </m-transition-router-view>
  </div>
</template>

<script setup></script>

<style lang="scss" scoped>
</style>
