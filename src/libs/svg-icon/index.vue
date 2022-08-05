<template>
  <svg aria-hidden="true">
    <use :xlink:href="symbolId" :class="fillClass" :fill="color" />
  </svg>
</template>

<script setup>
import { computed } from 'vue'

const props = defineProps({
  //显示的svg
  name: {
    type: String,
    required: true
  },
  //svg color
  color: {
    type: String
  },
  //tailwind指定svg的类名
  fillClass: {
    type: String
  }
})
//真实svg图标
const symbolId = computed(() => {
  return `#icon-${props.name}`
})
</script>

<style lang="scss" scoped></style>
