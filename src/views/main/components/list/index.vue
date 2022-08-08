<template>
  <div>
    <m-waterfall
      class="px-1 w-full"
      :data="pexelsList"
      nodeKey="id"
      :column="isMobileTerminal ? 2 : 5"
      :picPreReading="false"
    >
      <template v-slot="{ item, width }">
        <item-vue :data="item" :width="width"></item-vue>
      </template>
    </m-waterfall>
    <m-infinite
      v-model="loading"
      :isFinished="isFinished"
      @onLoad="getPexelsListData"
    ></m-infinite>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { getPexelsList } from '@/api/pexels.js'
import itemVue from './item.vue'
import { isMobileTerminal } from '@/utils/flexible'
/**
 * 请求query
 */
let query = {
  page: 1,
  size: 20
}
const pexelsList = ref([])
/**
 * 获取PexelsList数据
 */
const getPexelsListData = async () => {
  if (isFinished.value) return
  //完成第一次请求后(pexelsList不为空),后续的请求让page+1
  if (pexelsList.value.length) {
    query.page++
  }
  //请求接口
  const res = await getPexelsList(query)
  if (query.page === 1) {
    pexelsList.value = res.list
  } else {
    pexelsList.value.push(...res.list)
  }
  //判断数据是否全部加载完成
  if (pexelsList.value.length === res.total) {
    isFinished.value = true
  }
  //修改isLoading
  loading.value = false
}
//--------------------
const loading = ref(false) //数据是否在加载中
const isFinished = ref(false) //数据是否全部加载完成
</script>

<style lang="scss" scoped></style>
