/**
 * 从itemElements中 抽离出imgElements
 */
export const getImgElements = (itemElements) => {
  const imgElements = []
  itemElements.forEach((el) => {
    imgElements.push(...el.getElementsByTagName('img'))
  })
  return imgElements
}
/**
 * 生成所有的图片链接数组
 */
export const getAllImg = (imgElements) => {
  return imgElements.map((imgElement) => {
    return imgElement.src
  })
}
/**
 * 监听图片数组加载完成(promise)
 */
export const onCompleteImgs = (imgs) => {
  //promise集合
  const promiseAll = []
  // 循环imgs 构建promiseAll
  imgs.forEach((img, index) => {
    promiseAll[index] = new Promise((resolve, reject) => {
      //处理img的加载情况
      const imgObj = new Image()
      imgObj.src = img
      imgObj.onload = () => {
        resolve({ img, index })
      }
    })
  })
  return Promise.all(promiseAll)
}

/**
 * 返回最小高度
 */
export const getMinHeight = (columnHeightObj) => {
  return Math.min(...Object.values(columnHeightObj))
}
/**
 * 返回最大高度
 */
export const getMaxHeight = (columnHeightObj) => {
  return Math.max(...Object.values(columnHeightObj))
}

/**
 * 返回列高对象中最小高度所在的列
 */
export const getMinHeightColumn = (columnHeightObj) => {
  const minHeight = getMinHeight(columnHeightObj)
  return Object.keys(columnHeightObj).find((key) => {
    return columnHeightObj[key] === minHeight
  })
}
