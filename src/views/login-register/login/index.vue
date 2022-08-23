<template>
  <div class="relative h-screen bg-white dark:bg-zinc-800 text-center xl:bg-zinc-200 ">
    <!-- 头部图片 -->
    <header-vue></header-vue>
    <!-- 表单 -->
    <div
      class=" block px-3 mt-4 dark:bg-zinc-800 xl:bg-white xl:w-[388px] xl:dark:bg-zinc-900 xl:m-auto xl:mt-8 xl:py-4 xl:rounded-sm xl:shadow-lg">
      <!-- title  -->
      <h3 class="hidden mb-2 font-semibold text-base text-main dark:text-zinc-300 xl:block">账号登录</h3>
      <!-- form  -->
      <vee-form @submit="onLoginHandler">
        <!-- 用户名 -->
        <vee-field
          class="dark:bg-zinc-800 dark:text-zinc-400 border-b-zinc-400 border-b outline-0 w-full pb-1 px-1 text-base focus:border-b-main dark:border-b-zinc-200 xl:default:bg-zinc-900"
          type="text" name="username" placeholder="用户名" autocomplete="on" :rules="validateUsername" />
        <vee-error-message class=" text-sm text-red-600 block mt-0.5 text-left" name="username" />
        <!-- 密码 -->
        <vee-field
          class="dark:bg-zinc-800 dark:text-zinc-400 border-b-zinc-400 border-b outline-0 w-full pb-1 px-1 text-base focus:border-b-main dark:border-b-zinc-200 xl:default:bg-zinc-900"
          type="password" name="password" placeholder="密码" autocomplete="on" :rules="validatePassword" />
        <vee-error-message class=" text-sm text-red-600 block mt-0.5 text-left" name="password" />
        <!-- 跳转按钮 -->
        <div class="pt-1 pb-3 leading-[0px] text-right">
          <a
            class="inline-block p-1 text-zinc-400 text-right dark:text-zinc-600 hover:text-zinc-600 dark:hover:text-zinc-400 text-sm duration-300 cursor-pointer">去注册</a>
        </div>
        <!-- 登录按钮  -->
        <m-button :loading="loading" :isActiveAnim="false" class="w-full dark:bg-zinc-900 xl:dark:bg-zinc-900">登录
        </m-button>
      </vee-form>
      <!-- 第三方登录 -->
      <div class="flex justify-around mt-4">
        <m-svg-icon class="w-4 h-4 cursor-pointer" name="qq"></m-svg-icon>
        <m-svg-icon class="w-4 h-4  cursor-pointer" name="wexin"></m-svg-icon>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import headerVue from '../components/header.vue';
import { Form as VeeForm, Field as VeeField, ErrorMessage as VeeErrorMessage } from 'vee-validate'
import { validateUsername, validatePassword } from '../validate'
/**
 * 登录
 */
const onLoginHandler = () => {
  console.log(123);
}
// 登录时的 loading
const loading = ref(false)
</script>

<style lang="scss" scoped>
</style>
