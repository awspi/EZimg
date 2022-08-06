<template>
  <div class="w-full">
    <m-search v-model="modelValue">
      <template #dropdown>
        <div>{{ modelValue }}</div>
      </template>
    </m-search>
  </div>
</template>

<script setup>
import { ref, watch } from 'vue'
const modelValue = ref('')
// watch(
//   () => modelValue.value,
//   (val) => {
//     console.log(val)
//   }
// )
</script>

<style lang="scss" scoped></style>
