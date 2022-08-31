<template>
  <div class="relative leading-[0px]">
    <!-- 单行 -->
    <input type="text" v-if="type === TYPE_TEXT" v-model="text" :maxLength="max" class=" border-gray-200 dark:border-gray-600 dark:bg-zinc-800 duration-100 dark:text-zinc-400
      border outline-0 py-0.5 px-1 text-sm rounded-sm focus:border-blue-400 w-full">
    <!-- 多行 -->
    <textarea v-if="type === TYPE_TEXTAREA" v-model="text" rows="5" :maxLength="max" class=" border-gray-200 dark:border-gray-600 dark:bg-zinc-800 duration-100 dark:text-zinc-400
      border outline-0 py-0.5 px-1 text-sm rounded-sm focus:border-blue-400 w-full"></textarea>
    <!-- 最大长度 -->
    <span v-if="max" class="absolute right-1 bottom-0.5 text-zinc-400 text-xs"
      :class="{ 'text-red-700': currentNumber === parseInt(max) }">
      {{  currentNumber  }} / {{  max  }}
    </span>
  </div>
</template>

<script>
const TYPE_TEXT = 'text'
const TYPE_TEXTAREA = 'textarea'
</script>

<script setup>
import { useVModel } from '@vueuse/core';
import { computed } from 'vue';

const props = defineProps({
  // v-model
  modelValue: {
    type: String,
    required: true
  },
  // type
  type: {
    type: String,
    default: TYPE_TEXT,
    validator(value) {
      const arr = [TYPE_TEXT, TYPE_TEXTAREA]
      const res = arr.includes(value)
      if (!res) {
        throw new Error(`type类型必须在可选范围内 ${arr.join(',')}`)
      }
      return res
    }
  },
  //maxLen
  max: {
    type: [Number, String]
  }
})

defineEmits(['update:modelValue'])
//输入的字符
const text = useVModel(props)
//输入的字符数
const currentNumber = computed(() => {
  return text.value.length
})
</script>

<style lang="scss" scoped>
</style>
