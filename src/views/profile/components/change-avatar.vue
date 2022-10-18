<template>
  <div class=" overflow-auto flex flex-col items-center">
    <m-svg-icon v-if="isMobileTerminal" name="close" fillClass=" fill-zinc-900 dark:fill-zinc-200" @click="close"
      class="w-3 h-3 p-0.5 m-1 ml-auto"></m-svg-icon>
    <img ref="imgTarget" :src="blob" alt="">
    <m-button class="mt-4 w-[80%] xl:1/2" @click="onConfirmClick" :loading="loading">确定</m-button>
  </div>
</template>

<script>
const EMITS_CLOSE = 'close'
//PC端配置对象
const pcOptions = {
  aspectRatio: 1 / 1
}
// 移动端配置对象
const mobileOptions = {
  // 将裁剪框限制在画布的大小
  viewMode: 1,
  // 移动画布，裁剪框不动
  dragMode: 'move',
  // 裁剪框固定纵横比：1:1
  aspectRatio: 1,
  // 裁剪框不可移动
  cropBoxMovable: false,
  // 不可调整裁剪框大小
  cropBoxResizable: false
}


</script>


<script setup>
import { isMobileTerminal } from '@/utils/flexible';
import { onMounted, ref } from 'vue'
//裁剪图片
import 'cropperjs/dist/cropper.css';
import Cropper from 'cropperjs';
import { getOSSClient } from '@/utils/sts.js'
import { useStore } from 'vuex';
import { message } from '@/libs';
import { putProfile } from '@/api/sys.js'

const loading = ref(false)
const imgTarget = ref(null)
const emits = defineEmits([EMITS_CLOSE])
defineProps({
  blob: {
    String,
    required: true
  }
})

/**
 * 裁剪头像
 * !vue中 onMounted之后再获取DOM
 */
let cropper = null
onMounted(() => {
  cropper = new Cropper(imgTarget.value, isMobileTerminal ? pcOptions : mobileOptions

  )
})

const onConfirmClick = () => {
  loading.value = true
  cropper.getCroppedCanvas().toBlob(blob => {
    // console.log(URL.createObjectURL(blob))
    putObjectToOSS(blob)
  })
}
/**
 * OSS上传
 */
let ossClient = null
let store = useStore()
const putObjectToOSS = async (file) => {
  if (!ossClient) {
    ossClient = await getOSSClient()
  }
  try {
    // 因为当前凭证只具备 images 文件夹下的访问权限，所以图片需要上传到 images/xxx.xx 。否则你将得到一个 《AccessDeniedError: You have no right to access this object because of bucket acl.》 的错误
    const fileTypeArr = file.type.split('/')
    const fileName = `${store.getters.userInfo.username}/${Date.now()}.${fileTypeArr[fileTypeArr.length - 1]
      }`
    // 文件存放路径，文件
    const res = await ossClient.put(`images/${fileName}`, file)
    // 通知服务器
    onChangeProfile(res.url)
  } catch (e) {
    message('error', e)
  }
}
/**
 *
 * @param {*} avatar
 */
const onChangeProfile = async (avatar) => {
  //更新vuex
  store.commit('user/setUserInfo', {
    ...store.getters.userInfo,
    avatar
  })
  await putProfile(store.getters.userInfo)
  // 通知
  message('success', '用户头像修改成功')
  // 关闭 loading
  loading.value = false
  // 关闭 dialog
  close()
}


const close = () => {
  emits(EMITS_CLOSE)
}


</script>

<style lang="scss" scoped>

</style>
