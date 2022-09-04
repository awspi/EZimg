<template>
  <div>
    <span id="qqLoginBtn" v-show="false"></span>
    <m-svg-icon class="w-4 h-4 cursor-pointer" name="qq" @click="qqLogin"></m-svg-icon>
  </div>
</template>

<script>
//QQ登录URL
const QQ_LOGIN_URL =
  'https://graph.qq.com/oauth2.0/authorize?client_id=101998494&response_type=token&scope=all&redirect_uri=https%3A%2F%2Fimooc-front.lgdsunday.club%2Flogin'
//? redirect_uri是一个线上的地址
</script>


<script setup>

/**
 * QQ登录挂起
 */

import { onMounted } from 'vue';
onMounted(() => {
  QC.Login({
    btnId: 'qqLoginBtn'
  }, (data, options) => {
    // 登录成功之后的回调，但是需要注意，这个回调只会在《登录回调页面中被执行》
    // 登录存在缓存，登录成功一次之后，下次进入会自动重新登录（即：触发该方法，所以我们应该在离开登录页面时，注销登录）
    console.log('QQ登录成功')
    // 1. 注销登录，否则在后续登录中会直接触发该回调
    QC.Login.signOut()
    // 2. 获取当前用户唯一标识，作为判断用户是否已注册的依据
    const accessToken = /access_token=((.*))&expires_in/.exec(
      window.location.hash
    )[1]
    // 3. 拼接请求对象
    const oauthObj = {
      nickname: data.nickname,
      figureurl_qq_2: data.figureurl_qq_2,
      accessToken
    }
    console.log(oauthObj);
    //TODO vedio18.5
  })
})

/**
 * qq登录事件
 */
const qqLogin = () => {
  openQQWindow()
}
/**
 * 处理qq登录视窗
 */
const openQQWindow = () => {

  window.open(QQ_LOGIN_URL, 'oauth2Login_10609',
    'height=525,width=585, toolbar=no, menubar=no, scrollbars=no, status=no, location=yes, resizable=yes')
}

</script>

<style lang="scss" scoped>
</style>
