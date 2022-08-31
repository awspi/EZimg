<template>
  <div
    class="relative h-screen bg-white dark:bg-zinc-800 text-center xl:bg-zinc-200"
  >
    <!-- 头部图片 -->
    <header-vue></header-vue>
    <!-- 表单 -->
    <div
      class="block px-3 mt-4 dark:bg-zinc-800 xl:bg-white xl:w-[388px] xl:dark:bg-zinc-900 xl:m-auto xl:mt-8 xl:py-4 xl:rounded-sm xl:shadow-lg"
    >
      <!-- title  -->
      <h3
        class="hidden mb-2 font-semibold text-base text-main dark:text-zinc-300 xl:block"
      >
        账号注册
      </h3>
      <!-- form  -->
      <vee-form @submit="onRegister">
        <!-- 用户名 -->
        <vee-field
          v-model="regForm.username"
          class="dark:bg-zinc-800 dark:text-zinc-400 border-b-zinc-400 border-b outline-0 w-full pb-1 px-1 text-base focus:border-b-main dark:border-b-zinc-200 xl:default:bg-zinc-900"
          type="text"
          name="username"
          placeholder="用户名"
          autocomplete="on"
          :rules="validateUsername"
        />
        <vee-error-message
          class="text-sm text-red-600 block mt-0.5 text-left"
          name="username"
        />
        <!-- 密码 -->
        <vee-field
          v-model="regForm.password"
          class="dark:bg-zinc-800 dark:text-zinc-400 border-b-zinc-400 border-b outline-0 w-full pb-1 px-1 text-base focus:border-b-main dark:border-b-zinc-200 xl:default:bg-zinc-900"
          type="password"
          name="password"
          placeholder="密码"
          autocomplete="on"
          :rules="validatePassword"
        />
        <vee-error-message
          class="text-sm text-red-600 block mt-0.5 text-left"
          name="password"
        />
        <!-- 确认密码 -->
        <vee-field
          v-model="regForm.confirmPassword"
          class="dark:bg-zinc-800 dark:text-zinc-400 border-b-zinc-400 border-b outline-0 w-full pb-1 px-1 text-base focus:border-b-main dark:border-b-zinc-200 xl:default:bg-zinc-900"
          type="password"
          name="confirmPassword"
          placeholder="确认密码"
          autocomplete="on"
          rules="validateConfirmPassword:@password"
        />
        <vee-error-message
          class="text-sm text-red-600 block mt-0.5 text-left"
          name="confirmPassword"
        />

        <div class="pt-1 pb-3 leading-[0px] text-right">
          <!-- 跳转按钮 -->
          <div class="pt-1 pb-3 leading-[0px] text-right" @click="onToLogin">
            <a
              class="inline-block p-1 text-zinc-400 text-right dark:text-zinc-600 hover:text-zinc-600 dark:hover:text-zinc-400 text-sm duration-300 cursor-pointer"
              >去登录</a
            >
          </div>
          <!-- 用户协议 -->
          <div class="text-center">
            <a
              class="text-zinc-400 dark:text-zinc-600 hover:text-zinc-600 dark:hover:text-zinc-400 text-sm duration-400"
              href="https://baidu.com"
              target="__black"
            >
              注册即同意《注册协议》
            </a>
          </div>
        </div>
        <!-- 注册按钮  -->
        <m-button
          :loading="loading"
          :isActiveAnim="false"
          class="w-full dark:bg-zinc-900 xl:dark:bg-zinc-900"
          >注册
        </m-button>
      </vee-form>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import headerVue from '../components/header.vue'
import {
  Form as VeeForm,
  Field as VeeField,
  ErrorMessage as VeeErrorMessage,
  defineRule
} from 'vee-validate'
import {
  validateUsername,
  validatePassword,
  validateConfirmPassword
} from '../validate'
import { LOGIN_TYPE_USERNAME } from '@/constants'
import { useStore } from 'vuex'
import { useRouter } from 'vue-router'
const store = useStore()
const router = useRouter()
/**
 * login
 */
const regForm = ref({
  username: '',
  password: '',
  confirmPassword: ''
})

// 注册时的 loading
const loading = ref(false)

/**
 * ?插入规则
 */
defineRule('validateConfirmPassword', validateConfirmPassword)

/**
 * 用户注册行为
 * 注册成功后直接登录
 */
const onRegister = async () => {
  loading.value = true
  console.log(regForm)
  const payload = {
    username: regForm.value.username,
    password: regForm.value.password
  }
  //执行注册操作
  try {
    await store.dispatch('user/register', {
      ...payload
    })
    // 注册成功，触发登录
    //todo 检验是否注册成功
    await store.dispatch('user/login', {
      ...payload,
      loginType: LOGIN_TYPE_USERNAME
    })
  } finally {
    loading.value = false
  }
  router.push('/')
}
/**
 * 跳转登录
 */
const onToLogin = () => {
  //TODO 配置跳转方式
  router.push('/login')
}
</script>

<style lang="scss" scoped></style>
