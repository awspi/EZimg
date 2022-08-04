<template>
  <div>123</div>
</template>

<script setup>
import { getCategory } from '@/api/category.js'
const getCategoryData = async () => {
  const category = await getCategory()
  console.log(category)
}
getCategoryData()
</script>

<style lang="scss" scoped></style>
