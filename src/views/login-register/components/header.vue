<template>
  <!-- PC端头部图标 -->
  <div class="hidden pt-5 h-8 xl:block">
    <!-- <img
      v-lazy
      class="m-auto"
      src="https://res.lgdsunday.club/signlogo.png"
      alt=""
    /> -->
  </div>
  <!-- 移动端头部图标  -->
  <div class="h-[111px] xl:hidden">
    <!-- 背景图 -->
    <img
      v-lazy
      class="dark:hidden"
      src="http://img9.vilipix.com/picture/logo/2021/01/16/19/39/19610301_3f750ac7559f829ee2fdab2a25637e07_170.jpg"
      alt=""
    />
    <img
      v-lazy
      class="h-5 absolute top-[5%] left-[50%] translate-x-[-50%]"
      src="http://img9.vilipix.com/picture/logo/2021/01/16/19/39/19610301_3f750ac7559f829ee2fdab2a25637e07_170.jpg"
      alt=""
      srcset=""
    />
  </div>
</template>

<script setup></script>

<style lang="scss" scoped></style>
