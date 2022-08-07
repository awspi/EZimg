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
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { getPexelsList } from '@/api/pexels.js'
import itemVue from './item.vue'
import { isMobileTerminal } from '@/utils/flexible'
/**
 * 请求数据
 */
let query = {
  page: 1,
  size: 20
}
const pexelsList = ref([])
const getPexelsListData = async () => {
  const res = await getPexelsList(query)
  pexelsList.value = res.list
  // console.log(pexelsList.value)
}
getPexelsListData()
</script>

<style lang="scss" scoped></style>
