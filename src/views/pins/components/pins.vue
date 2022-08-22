<template>
  <div class="fixed top-0 left-0 w-screen h-screen text-xl bg-slate-200 z-20">
    {{ id }}
  </div>
</template>

<script setup>
defineProps({
  id: {
    required: true,
    type: String
  }
})
</script>

<style lang="scss" scoped>
</style>
