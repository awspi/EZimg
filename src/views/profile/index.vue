<template>
  <div class="h-full bg-zinc-200 dark:bg-zinc-800 duration-300 overflow-auto xl:pt-1">
    <div
      class=" relative max-w-screen-lg mx-auto bg-white dark:bg-zinc-900 duration-300 xl:rounded-sm xl:border-zinc-200 xl:dark:border-zinc-600 xl:border xl:px-4 xl:py-2">
      <!-- moblie nav -->
      <m-navbar sticky v-if="isMobileTerminal" :clickLeft="onNavbarLeftClick">个人资料</m-navbar>
      <!-- pc title -->
      <div v-else class=" text-lg font-bold text-center mb-4 dark:text-zinc-300">个人资料</div>
      <div class=" h-full w-full px-1 pb-4 text-sm mt-2 xl:text-center">
        <!-- 头像 -->
        <div class="py-1 xl:absolute xl:right-[16%] xl:text-center" @click="changeAvatarClick">
          <span class=" w-8 inline-block mb-2  text-sm font-black dark:text-zinc-300 xl:block xl:mx-auto">我的头像</span>
          <div class="relative w-[80px] h-[80px] group xl:cursor-pointer xl:mx-auto">
            <img class="rounded-full w-full h-full" :src="$store.getters.userInfo.avatar" alt="">
            <!-- 蒙版 -->
            <div
              class=" absolute left-0 top-0 rounded-full w-full h-full bg-black/40 hidden xl:group-hover:block duration-150">
              <m-svg-icon name="change-header-image" class="w-2 h-2 m-auto mt-2"></m-svg-icon>
              <div class="text-xs text-white dark:text-zinc-300 scale-90 mt-0.5 ">点击更换头像</div>
            </div>
          </div>
          <!-- 隐藏域 -->
          <input v-show="false" ref="inputFileTarget" type="file" accept=".png, .jpeg, .jpg, .gif"
            @change="onSelectImgHandler">
          <p class="text-zinc-500 dark:text-zinc-400 mt-1 text-xs xl:w-10">支持 jpg、png、jpeg 格式大小 5M 以内的图片</p>
        </div>
        <!-- form  -->
        <div class="xl:w-2/3">
          <!-- 信息输入 -->
          <div class="py-1 xl:flex xl:items-center xl:my-1">
            <span class=" w-8 block mb-1 text-sm font-black dark:text-zinc-300 xl:block xl:mx-auto">用户名</span>
            <m-input class="w-full" max="20" v-model="userInfo.nickname">
            </m-input>
          </div>
          <div class="py-1 xl:flex xl:items-center xl:my-1">
            <span class=" w-8 block mb-1  text-sm font-black dark:text-zinc-300 xl:block xl:mx-auto">职位</span>
            <m-input class="w-full" max="20" v-model="userInfo.title"></m-input>
          </div>
          <div class="py-1 xl:flex xl:items-center xl:my-1">
            <span class=" w-8 block mb-1  text-sm font-black dark:text-zinc-300 xl:block xl:mx-auto">公司</span>
            <m-input class="w-full" max="20" v-model="userInfo.company"></m-input>
          </div>
          <div class="py-1 xl:flex xl:items-center xl:my-1">
            <span class=" w-8 block mb-1  text-sm font-black dark:text-zinc-300 xl:block xl:mx-auto">个人主页</span>
            <m-input class="w-full" max="20" v-model="userInfo.homePage"></m-input>
          </div>
          <div class="py-1 xl:flex xl:items-center xl:my-1">
            <span class=" w-8 block mb-1  text-sm font-black dark:text-zinc-300 xl:block xl:mx-auto">个人介绍</span>
            <m-input class="w-full" max="50" v-model="userInfo.introduction" type="textarea"></m-input>
          </div>
          <m-button @click="onChangeProfile" :loading="loading"
            class=" w-full mt-2 mb-4 dark:text-zinc-300 dark:bg-zinc-800 xl:w-[160px] xl:m-auto">保存修改
          </m-button>
          <m-button @click="onLogoutClick" v-if="isMobileTerminal"
            class=" w-full  dark:text-zinc-300 dark:bg-zinc-800 xl:w-[160px] xl:m-auto">
            退出登录</m-button>
        </div>
      </div>
    </div>
    <m-dialog v-if="!isMobileTerminal" v-model="isDialogVisible">
      <change-avatar-vue :blob="currentBlob" @close="isDialogVisible = false"></change-avatar-vue>
    </m-dialog>
    <m-popup v-else :class="{ 'h-screen': isDialogVisible }" v-model="isDialogVisible">
      <change-avatar-vue :blob="currentBlob" @close="isDialogVisible = false"></change-avatar-vue>
    </m-popup>
  </div>
</template>

<script setup>
import { isMobileTerminal } from '@/utils/flexible';
import { useRouter } from 'vue-router';
import { useStore } from 'vuex';
import { confirm, message } from '@/libs'
import { ref, watch } from 'vue';
import { putProfile } from '@/api/sys.js'
import changeAvatarVue from './components/change-avatar.vue'
console.log('组件profile被渲染');
const router = useRouter()
const store = useStore()
const inputFileTarget = ref(null)
// 选中的图片
const currentBlob = ref('')
const loading = ref(false)
const isDialogVisible = ref(false)
/**
 * onNavbarLeftClick
 */
const onNavbarLeftClick = () => {
  //移动端下跳转的类型
  store.commit('app/changeRouterType', 'back')
  router.back()
}
/**
 * changeAvatarClick
 */
const changeAvatarClick = () => {
  inputFileTarget.value.click()
}

/**
 * onSelectImgHandler
 * !当两次选择文件是同一个的时候,change的回调不会再次被触发->每次选择图片不再被使用时,清空掉inputFileTarget.value
 */
const onSelectImgHandler = () => {
  const imgFile = inputFileTarget.value.files[0]
  // 生成 blob 对象
  const blob = URL.createObjectURL(imgFile)
  currentBlob.value = blob
  isDialogVisible.value = true
  console.log(currentBlob);
}
watch(isDialogVisible, (val) => {
  if (!val) {
    inputFileTarget.value.value = null
  }
})

/**
 * onChangeProfile
 */
const onChangeProfile = async () => {
  loading.value = true
  await putProfile(userInfo.value)
  message('success', '更新成功')
  store.commit('user/setUserInfo', userInfo.value)
  loading.value = false
}
/**
 * onLogoutClick
 */
const onLogoutClick = () => {
  confirm('确定退出吗?').then(() => {
    store.dispatch('user/logout')
  })
}
/**
 *! 数据本地的双向同步，增加一个单层深拷贝
 */
const userInfo = ref({ ...store.getters.userInfo })

// const changeStoreUserInfo = (key, value) => {
//   const newInfo = {
//     ...store.getters.userInfo,
//     [key]: value//[key]作为变量
//     // ...拓展运算符 重复的后面取代前面的
//   }
//   console.log(newInfo);
//   // store.commit('user/setUserInfo', newInfo)
// }
</script>

<style lang="scss" scoped>

</style>
