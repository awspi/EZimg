
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
