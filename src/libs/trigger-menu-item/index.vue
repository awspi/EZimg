<template>
  <div class="w-5 flex flex-col items-center justify-center mx-0.5" @click="onItemClick">
    <m-svg-icon :name="icon" :fillClass="iconClass" class="w-3 h-3"></m-svg-icon>
    <p class=" text-sm mt-0.5" :class="textClass">
      <slot />
    </p>
  </div>
</template>

<script setup>
import { useRouter } from 'vue-router';

const props = defineProps({
  icon: {
    type: String,
    required: true
  },
  iconClass: {
    type: String,

  },
  textClass: {
    type: String,
    default: 'text-zinc-900 dark:text-zinc-200'
  },
  to: {
    type: String
  }
})

const router = useRouter()

const onItemClick = () => {
  if (props.to) {
    router.push(props.to)
  }
}
</script>

<style lang="scss" scoped>
</style>
