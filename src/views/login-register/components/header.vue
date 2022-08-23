<template>
  <!-- PC端头部图标 -->
  <div class="hidden pt-5 h-8 xl:block">
    <img v-lazy class="m-auto" src="https://res.lgdsunday.club/signlogo.png" alt="" />
  </div>
  <!-- 移动端头部图标  -->
  <div class="h-[111px] xl:hidden">
    <!-- 背景图 -->
    <img v-lazy class="dark:hidden" src="https://res.lgdsunday.club/login-bg.png" alt="" />
    <img v-lazy class="h-5 absolute top-[5%] left-[50%] translate-x-[-50%]"
      src="https://m.imooc.com/static/wap/static/common/img/logo-small@2x.png" alt="" srcset="" />
  </div>
</template>

<script setup>

</script>

<style lang="scss" scoped>
</style>
