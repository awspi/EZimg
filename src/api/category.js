import request from '@/utils/request'
/**
 * 获取分页列表
 */
export const getCategory = () => {
  return request({
    url: '/category'
  })
}
/**
 *
 */
