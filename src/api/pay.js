import request from '@/utils/request'

/**
 * 获取 VIP 支付数据
 * @returns
 */
export const getVipPayList = () => {
  return request({
    url: '/user/vip/pay/list'
  })
}
