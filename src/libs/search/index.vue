<template>
  <div
    ref="containerTarget"
    class="group relative p-0.5 rounded-xl border-white duration-500 hover:bg-red-100/40"
  >
    <!-- 搜索图标 -->
    <m-svg-icon
      class="w-1.5 h-1.5 absolute translate-y-[-50%] top-[50%] left-2"
      name="search"
      color="#707070"
    ></m-svg-icon>
    <!-- 输入框 -->
    <input
      v-model="inputValue"
      @keyup.enter="onSearchHandler"
      @focus="onFocusHandler"
      @blur="onBlurHandler"
      type="text"
      class="block w-full h-[44px] pl-4 outline-0 bg-zinc-100 rounded-xl text-zinc-900 tracking-wide text-base font-semibold border border-zinc-100 focus:border-zinc-300 duration-500 group-hover:bg-white group-hover:border-zinc-200"
      placeholder="搜索"
    />
    <!-- 删除按钮 -->
    <m-svg-icon
      v-show="inputValue"
      name="input-delete"
      class="w-1.5 h-1.5 absolute translate-y-[-50%] top-[50%] right-8 cursor-pointer duration-500"
      @click="onClearClick"
    >
    </m-svg-icon>
    <!-- 分割线 -->
    <div
      class="opacity-0 h-1.5 w-[1px] absolute translate-y-[-50%] top-[50%] right-[62px] duration-500 bg-zinc-200 group-hover:opacity-100"
    ></div>
    <!-- 搜索按钮 -->
    <m-button
      @click="onSearchHandler"
      class="opacity-0 absolute translate-y-[-50%] top-[50%] right-1 rounded-full group-hover:opacity-100 duration-500"
      icon="search"
      iconColor="#ffffff"
    ></m-button>
    <!-- 下拉区域 -->
    <transition name="slide">
      <div
        v-if="$slots.dropdown"
        v-show="isFocus"
        class="max-h-[368px] w-full text-base overflow-auto bg-white absolute z-20 left-0 top-[56px] p-2 rounded duration-200 hover:shadow-2xl"
      >
        <slot name="dropdown" />
      </div>
    </transition>
  </div>
</template>
<script>
//双向绑定
const EMIT_UPDATE_MODELVALUE = 'update:modelValue'
//search搜索
const EMIT_SEARCH = 'search'
//删除所有文本
const EMIT_CLEAR = 'clear'
//输入事件
const EMIT_INPUT = 'input'
//获取焦点
const EMIT_FOCUS = 'focus'
//失去焦点
const EMIT_BLUR = 'blur'
</script>
<script setup>
/**
 * 1.输入内容实现双向数据绑定
 * 2.搜索按钮在hover时 进行展示
 * 3.一键清空input文本
 * 4.触发搜索
 * 5.控制下拉展示区的显示
 * 6.事件处理
 */
import { useVModel, onClickOutside } from '@vueuse/core'
import { ref, watch } from 'vue'

const emits = defineEmits([
  EMIT_UPDATE_MODELVALUE,
  EMIT_SEARCH,
  EMIT_CLEAR,
  EMIT_INPUT,
  EMIT_BLUR,
  EMIT_FOCUS
])
const props = defineProps({
  modelValue: {
    required: true,
    type: String
  }
})
// 输入文本
const inputValue = useVModel(props)

// 监听用户输入行为
watch(inputValue, (val) => {
  emits(EMIT_INPUT, val)
})

/**
 * 删除文本
 */
const onClearClick = () => {
  inputValue.value = ''
  emits(EMIT_CLEAR, '')
}
/**
 * 搜索
 */
const onSearchHandler = () => {
  emits(EMIT_SEARCH, inputValue.value)
}
//input是否获取到焦点
const isFocus = ref(false)
/**
 * input获取到焦点
 */
const onFocusHandler = () => {
  isFocus.value = true
  emits(EMIT_FOCUS)
}
/**
 * 失去焦点
 */
const onBlurHandler = () => {
  emits(EMIT_BLUR)
}

const containerTarget = ref()
/**
 * 点击区域外,isFocus=false
 */
onClickOutside(containerTarget, () => {
  isFocus.value = false
})
</script>

<style lang="scss" scoped>
.slide-enter-from,
.slide-leave-to {
  opacity: 0;
  transform: translateY(40px);
}
.slide-enter-active,
.slide-leave-active {
  transition: all 0.5s;
}
</style>
