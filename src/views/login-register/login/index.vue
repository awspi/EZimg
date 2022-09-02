<template>
  <div class="relative h-screen bg-white dark:bg-zinc-800 text-center xl:bg-zinc-200">
    <!-- 头部图片 -->
    <header-vue></header-vue>
    <!-- 表单 -->
    <div
      class="block px-3 mt-4 dark:bg-zinc-800 xl:bg-white xl:w-[388px] xl:dark:bg-zinc-900 xl:m-auto xl:mt-8 xl:py-4 xl:rounded-sm xl:shadow-lg">
      <!-- title  -->
      <h3 class="hidden mb-2 font-semibold text-base text-main dark:text-zinc-300 xl:block">
        账号登录
      </h3>
      <!-- form  -->
      <vee-form @submit="onLoginHandler">
        <!-- 用户名 -->
        <vee-field v-model="loginForm.username"
          class="dark:bg-zinc-800 dark:text-zinc-400 border-b-zinc-400 border-b outline-0 w-full pb-1 px-1 text-base focus:border-b-main dark:border-b-zinc-200 xl:default:bg-zinc-900"
          type="text" name="username" placeholder="用户名" autocomplete="on" :rules="validateUsername" />
        <vee-error-message class="text-sm text-red-600 block mt-0.5 text-left" name="username" />
        <!-- 密码 -->
        <vee-field v-model="loginForm.password"
          class="dark:bg-zinc-800 dark:text-zinc-400 border-b-zinc-400 border-b outline-0 w-full pb-1 px-1 text-base focus:border-b-main dark:border-b-zinc-200 xl:default:bg-zinc-900"
          type="password" name="password" placeholder="密码" autocomplete="on" :rules="validatePassword" />
        <vee-error-message class="text-sm text-red-600 block mt-0.5 text-left" name="password" />
        <!-- 跳转按钮 -->
        <div class="pt-1 pb-3 leading-[0px] text-right" @click="onToRegister">
          <a
            class="inline-block p-1 text-zinc-400 text-right dark:text-zinc-600 hover:text-zinc-600 dark:hover:text-zinc-400 text-sm duration-300 cursor-pointer">去注册</a>
        </div>
        <!-- 登录按钮  -->
        <m-button :loading="loading" :isActiveAnim="false" class="w-full dark:bg-zinc-900 xl:dark:bg-zinc-800">登录
        </m-button>
      </vee-form>
      <!-- 第三方登录 -->
      <div class="flex justify-around mt-4">
        <m-svg-icon class="w-4 h-4 cursor-pointer" name="qq"></m-svg-icon>
        <m-svg-icon class="w-4 h-4 cursor-pointer" name="wexin"></m-svg-icon>
      </div>
    </div>
    <slider-captcha-vue v-if="isSliderCaptchaVisible" @close="isSliderCaptchaVisible = false"
      @success="onCaptchaSuccess"></slider-captcha-vue>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import headerVue from '../components/header.vue'
import sliderCaptchaVue from './slider-captcha.vue'
import {
  Form as VeeForm,
  Field as VeeField,
  ErrorMessage as VeeErrorMessage
} from 'vee-validate'
import { validateUsername, validatePassword } from '../validate'
import { LOGIN_TYPE_USERNAME } from '@/constants'
import { useStore } from 'vuex'
import { useRouter } from 'vue-router'
const store = useStore()
const router = useRouter()
/**
 * login
 */
const loginForm = ref({
  username: 'LGD_Sunday',
  password: '123123'
})
/**
 * 登录
 */
const onLoginHandler = () => {
  isSliderCaptchaVisible.value = true
}
// 登录时的 loading
const loading = ref(false)

//控制slider-captcha
const isSliderCaptchaVisible = ref(false)

/**
 * captcha通过
 */
const onCaptchaSuccess = () => {
  isSliderCaptchaVisible.value = false
  onLogin()
}
/**
 * 用户登录行为
 */
const onLogin = async () => {
  loading.value = true
  console.log(loginForm)
  //执行登录操作
  try {
    await store.dispatch('user/login', {
      ...loginForm.value,
      loginType: LOGIN_TYPE_USERNAME
    })
  } finally {
    loading.value = false
  }
  router.push('/')
}
/**
 * 跳转注册
 */
const onToRegister = () => {
  //移动端下跳转的类型
  store.commit('app/changeRouterType', 'push')
  router.push('/register')
}
</script>

<style lang="scss" scoped>
</style>
