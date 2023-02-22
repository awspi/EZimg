<template>
  <div
    class="relative"
    ref="containerTarget"
    :style="{ height: containerHeight + 'px' }"
  >
    <!-- *数据渲染 -->
    <template v-if="columnWidth && data">
      <div
        v-for="(item, index) in data"
        :key="nodeKey ? item[nodeKey] : index"
        class="m-waterfall-item absolute duration-300"
        :style="{
          width: columnWidth + 'px',
          left: item._style?.left + 'px',
          top: item._style?.top + 'px'
        }"
      >
        <slot :item="item" :width="columnWidth" :index="index" />
      </div>
    </template>
    <!-- 加载提示 -->
    <div v-else>loading</div>
  </div>
</template>

<script setup>
import { computed, onMounted, onUnmounted, ref, watch } from 'vue'
import {
  getMinHeightColumn,
  getMaxHeight,
  getMinHeight
} from './utils'

const props = defineProps({
  //数据源
  /**
   * data是总的数据 而不是每次新增的数据
   */
  data: {
    type: Array,
    required: true
  },
  //唯一标识nodeKey
  nodeKey: {
    type: String
  },
  //列数
  column: {
    default: 2,
    type: Number
  },
  //列间距
  columnSpacing: {
    default: 20,
    type: Number
  },
  //行间距
  rowSpacing: {
    default: 20,
    type: Number
  }
})

//容器的高度=最高的一列的高度
const containerHeight = ref(0)
//? 记录每列总高度的容器
// key:第N列,val:总高度
const columnHeightObj = ref({})
/**
 *?  构建记录每列总高度的容器
 */
const useColumnHeightobj = () => {
  columnHeightObj.value = {}
  for (let i = 0; i < props.column; i++) {
    columnHeightObj.value[i] = 0
  }
  console.warn(columnHeightObj);
}
// 容器ref
const containerTarget = ref()
//容器总宽度(不包括padding margin border)
const containerWidth = ref(0)
// 容器的左边距 -> 计算item的left时用到
const containerLeft = ref(0)
/**
 *? 计算容器内宽度
  不包含padding
 */
const useContainerWidth = () => {
  const { paddingLeft, paddingRight } = getComputedStyle(
    containerTarget.value,
    null
  )
  // 容器的宽度  offsetWidth
  containerWidth.value = containerTarget.value.offsetWidth - parseFloat(paddingLeft) -  parseFloat(paddingRight)
  // 容器左边距
  containerLeft.value = parseFloat(paddingLeft)
}

// 列宽= 容器宽度-列间距宽的和
const columnWidth = ref(0)
// 列间距宽的和
const columnSpacingTotal = computed(() =>  (props.column - 1) * props.columnSpacing)

/**
 * 计算列宽
 */
const useColumnWidth = () => {
  // 计算容器宽度
  useContainerWidth()
  // 计算列宽
  columnWidth.value = (containerWidth.value - columnSpacingTotal.value) / props.column
}


/**
 * DOM已经插入之后再初始化
 */
onMounted(() => {
  // 计算列宽
  useColumnWidth()
})
//*

// 储存props的item高度的数组
let itemHeights = []


/**
 * 获取已经在DOM的itemHeight
 */
const useItemHeight = () => {
  itemHeights = [] //重置itemHeight
  //拿到所有元素
  let itemElements = [...document.getElementsByClassName('m-waterfall-item')]
  //complete
  itemElements.forEach((el) => {
    itemHeights.push(el.offsetHeight)
  })
  //渲染位置
  useItemLocation()
}

/**
 * 渲染位置 直接挂载到props.data上
 */
const useItemLocation = () => {
  //遍历数据源
  props.data.forEach((item, index) => {
    // 避免重复运算
    // 场景:先渲染20个 又新增20个 data就是40个 前20个已经有_style属性 直接就跳过
    //? 为什么不直接跳过前20个 因为顺序可能会变
    if (item._style) return
    //生成_style
    item._style = {}
    item._style.left = getItemLeft()
    item._style.top = getItemTop()
    //指定的列 高度自增
    increaseingHeight(index)
  })
  //指定容器的高度
  containerHeight.value = getMaxHeight(columnHeightObj.value)
}


/**
 * 组件销毁时 清除所有style 避免垃圾不能被回收
 */
onUnmounted(() => {
  props.data.forEach((item) => {
    delete item._style
  })
})

/**
 * 返回下一个item的left
 */
const getItemLeft = () => {
  //拿到最小高度的列
  const column = getMinHeightColumn(columnHeightObj.value)
  //最小高度所在的列 * (列宽 + 间距)
  return (
    column * (columnWidth.value + props.columnSpacing) + containerLeft.value
  )
}
/**
 * 返回下一个item的top
 */
const getItemTop = () => {
  //拿到最小高度
  return getMinHeight(columnHeightObj.value)
}
/**
 * 指定列 高度自增
 */
const increaseingHeight = (index) => {
  //最小高度所在列
  const minHeightColumn = getMinHeightColumn(columnHeightObj.value)

  columnHeightObj.value[minHeightColumn] += itemHeights[index] + props.rowSpacing //高度每次会加行间距
}

/**
 *? props.data改变 触发计算
 */
watch(
  () => props.data,
  (newVal) => {
    // nextTick(() => {
      //第一次获取数据时,构建高度记录容器
      // data是否全部不含_style的 如果是这样就重新构建
      const resetColumnHeight = newVal.every((item) => !item._style)
      resetColumnHeight && useColumnHeightobj()

      useItemHeight()
    // })
  },
  {
    immediate: true,
    deep: true, //深度监听
    flush:'post' //flush:post 代替nextTick
  }
)

//? 移动端适配 响应式
// 监听列数的变化
watch(
  () => props.column,
  () => {
    reset()
  }
)
/**
 * 重新构建数据流
 */
 const reset = () => {
  setTimeout(() => {
    // 重新计算列宽
    useColumnWidth()
    // 重置定位数据
    // 重置所有的定位数据，因为 data 中进行了深度监听，所以该操作会触发 data 的 watch
    props.data.forEach((item) => {
      item._style = null
    })
  }, 200)
}
</script>

<style lang="scss" scoped></style>
