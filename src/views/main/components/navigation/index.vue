<template>
  <mobile-navigation-vue
    v-if="isMobileTerminal"
    :data="categoryData"
  ></mobile-navigation-vue>
  <mobile-navigation-vue v-else="isMobileTerminal"></mobile-navigation-vue>
</template>

<script setup>
import { isMobileTerminal } from '@/utils/flexible.js'
import mobileNavigationVue from './mobile/index.vue'
import pcNavigationVue from './mobile/index.vue'
import { getCategory } from '@/api/category.js'
import { ref } from 'vue'
import { ALL_CATEGORY_ITEM } from '@/constants'
const categoryData = ref([])
const getCategoryData = async () => {
  const { categorys } = await getCategory()
  categoryData.value = categorys
  //补全 “全部” 数据
  categoryData.value.unshift(ALL_CATEGORY_ITEM)
}
getCategoryData()
</script>

<style lang="scss" scoped></style>
