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
import { computed, nextTick, onMounted, onUnmounted, ref, watch } from 'vue'
import {
  getImgElements,
  getAllImg,
  onCompleteImgs,
  getMinHeightColumn,
  getMaxHeight,
  getMinHeight
} from './utils'
const props = defineProps({
  //数据源
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
  },
  //是否需要图片预读取
  picPreReading: {
    type: Boolean,
    default: true
  }
})

//容器的高度=最高的一列的高度
const containerHeight = ref(0)
//记录每列高度的容器
//key所在列,val高度
const columnHeightObj = ref({})
/**
 * 构建记录每列高度的容器
 */
const useColomnHeightobj = () => {
  columnHeightObj.value = {}
  for (let i = 0; i < props.column; i++) {
    columnHeightObj.value[i] = 0
  }
}
//容器的宽度
const containerTarget = ref()
//容器总宽度(不包括padding margin border)
const containerWidth = ref(0)
//容器的左边距->计算item的left
const containerLeft = ref(0)
/**
 * 计算容器宽度
 */
const useContainerWidth = () => {
  const { paddingLeft, paddingRight } = getComputedStyle(
    containerTarget.value,
    null
  )
  //容器左边距
  containerLeft.value = parseFloat(paddingLeft)
  //容器的宽度
  containerWidth.value =
    containerTarget.value.offsetWidth -
    parseFloat(paddingLeft) -
    parseFloat(paddingRight)
}
//列宽=容器宽度-列间距宽的和
const columnWidth = ref(0)
//列间距宽的和
const columnSpacingTotal = computed(() => {
  return (props.column - 1) * props.columnSpacing
})
/**
 * 计算列宽
 */
const useColumnWidth = () => {
  //计算容器宽度
  useContainerWidth()
  //计算列宽
  columnWidth.value =
    (containerWidth.value - columnSpacingTotal.value) / props.column
}
onMounted(() => {
  //计算列宽
  useColumnWidth()
  console.log(columnWidth.value)
})
//*
//ite高度
let itemHeights = []
/**
 * 监听图片加载完成(需要图片预加载)
 */
const waitImgComplete = () => {
  //拿到所有元素
  let itemElements = [...document.getElementsByClassName('m-waterfall-item')]
  // 拿到所有img标签
  const imgElements = getImgElements(itemElements)
  //获取所有img标签的图片
  const allImgs = getAllImg(imgElements)
  //等待图片加载完成
  onCompleteImgs(allImgs).then(() => {
    // 图片加载完成，获取高度
    itemElements.forEach((el) => {
      itemHeights.push(el.offsetHeight)
    })
    //渲染位置
    useItemLocation()
  })
}
/**
 * 不需要图片预加载
 */
const useItemHeight = () => {
  itemHeights = []
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
 *渲染位置
 */
const useItemLocation = () => {
  //遍历数据源
  props.data.forEach((item, index) => {
    //避免重复运算
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
 * 组件销毁时 清除所有style
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
  columnHeightObj.value[minHeightColumn] +=
    itemHeights[index] + props.rowSpacing
}

/**
 * 触发计算
 */
watch(
  () => {
    return props.data
  },
  (newVal) => {
    nextTick(() => {
      //第一次获取数据时,构建高度记录容器
      const resetColumnHeight = newVal.every((item) => !item._style)
      resetColumnHeight && useColomnHeightobj()

      if (props.picPreReading) {
        waitImgComplete()
      } else {
        useItemHeight()
      }
    })
  },
  {
    immediate: true,
    deep: true
  }
)
/**
 * 重新构建数据流
 */
const reset = () => {
  setTimeout(() => {
    //重新计算列宽
    useColumnWidth()
    //重置定位数据
    // 重置所有的定位数据，因为 data 中进行了深度监听，所以该操作会触发 data 的 watch
    props.data.forEach((item) => {
      item._style = null
    })
  }, 200)
}
//移动端适配 响应式
//监听列数的变化
watch(
  () => props.column,
  () => {
    if (props.picPreReading) {
      // 在 picturePreReading 为 true 的前提下，需要首先为列宽滞空，列宽滞空之后，会取消瀑布流渲染
      columnWidth.value = 0
      //nextTick数据改变之后,视图改变之后的回调
      // 等待页面渲染之后，重新执行计算。否则在 item 没有指定过高度的前提下，计算出的 item 高度会不正确
      nextTick(reset)
    } else {
      reset()
    }
  }
)
</script>

<style lang="scss" scoped></style>
