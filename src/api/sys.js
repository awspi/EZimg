import request from '@/utils/request'

/**
 * 人类行为验证
 */
export const getCaptcha = (data) => {
  return request({
    url: '/sys/captcha',
    method: 'POST',
    data
  })
}
/**
 * 登录
 */
export const loginUser = (data) => {
  return request({
    url: '/sys/login',
    method: 'POST',
    data
  })
}
/**
 * 注册
 */
export const registerUser = (data) => {
  return request({
    url: '/sys/register',
    method: 'POST',
    data
  })
}
/**
 * 获取用户信息
 */
export const getProfile = () => {
  return request({
    url: '/user/profile'
  })
}
/**
 * 更新用户信息
 */
export const putProfile = (data) => {
  return request({
    url: '/user/profile',
    data,
    method: 'PUT'
  })
}
/**
 * 获取OSS上传凭证
 */
export const getSts = (data) => {
  return request({
    url: '/user/sts'
  })
}
//TODO 使用自己的阿里云OSS
