<template>
  <div>
    <m-waterfall class="px-1 w-full" :data="pexelsList" nodeKey="id" :column="isMobileTerminal ? 2 : 5"
      :picPreReading="false">
      <template v-slot="{ item, width }">
        <item-vue :data="item" :width="width" @click="onToPins"></item-vue>
      </template>
    </m-waterfall>
    <m-infinite v-model="loading" :isFinished="isFinished" @onLoad="getPexelsListData"></m-infinite>
    <!-- pins详情内容展示 -->
    <transition :css="false" @beforeEnter="beforeEnter" @enter="enter" @leave="leave">
      <pins-vue v-if="isVisiblePins" :id="currentPins.id"></pins-vue>
    </transition>
  </div>
</template>

<script setup>
import { computed, ref, watch } from 'vue'
import { getPexelsList } from '@/api/pexels.js'
import itemVue from './item.vue'
import { isMobileTerminal } from '@/utils/flexible'
import { useStore } from 'vuex'
import pinsVue from '../../../pins/components/pins.vue'
import gsap from 'gsap'
import { useEventListener } from '@vueuse/core'
const store = useStore()
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

//---------------------
/**
 * 监听currentCategory
 */
watch(
  () => store.getters.currentCategory,
  (currentCategory) => {
    resetQuery({
      page: 1,
      categoryId: currentCategory.id
    })
  }
)
/**
 * 监听 searchText的变化
 */
watch(
  () => store.getters.searchText,
  (val) => {
    resetQuery({
      page: 1,
      searchText: val
    })
  }
)
/**
 *修改请求的query,重新发起请求
 */
const resetQuery = (newQuery) => {
  query = { ...query, ...newQuery }
  //重置query

  pexelsList.value = []
}
//--------------------
/**
 * 监听浏览器后退按钮事件
 */
useEventListener(window, 'popstate', () => {
  isVisiblePins.value = false
})
/**
 * 进入pins
 */
const onToPins = (item) => {
  //修改url
  console.log(item)
  history.pushState(null, null, `/pins/${item.id}`)
  isVisiblePins.value = true
  currentPins.value = item
}
//控制pins显示
const isVisiblePins = ref(false)
//当前选择的pins属性
const currentPins = ref({})
//js钩子
const beforeEnter = (el) => {
  gsap.set(el, {
    scaleX: 0,
    scaleY: 0,
    transformOrigin: '0 0',
    translateX: currentPins.value.location?.translateX,
    translateY: currentPins.value.location?.translateY,
    opacity: 0
  })
}
const enter = (el, done) => {
  gsap.to(el, {
    duration: 0.3,
    scaleX: 1,
    scaleY: 1,
    transformOrigin: '0 0',
    opacity: 1,
    translateX: 0,
    translateY: 0,
    onComplete: done
  })
}
const leave = (el, done) => {
  gsap.to(el, {
    duration: 0.3,
    scaleX: 0,
    scaleY: 0,
    transformOrigin: '0 0',
    opacity: 0,
    translateX: currentPins.value.location?.translateX,
    translateY: currentPins.value.location?.translateY,
    onComplete: done
  })
}
</script>

<style lang="scss" scoped>
</style>
