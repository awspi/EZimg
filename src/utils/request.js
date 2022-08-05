import axios from 'axios'
import { F0 } from './hack'
const service = axios.create({
  baseURL: import.meta.env.VITE_BASE_API,
  timeout: 5000
})
// 请求拦截器

service.interceptors.request.use((config) => {
  const { icode, time } = F0()
  config.headers.icode = icode
  config.headers.codetype = time
  return config // 必须返回配置
})
/**
 * 响应拦截器
 */
service.interceptors.response.use((response) => {
  const { data, success, message } = response.data
  if (success) {
    return data
  }
  //TODO 业务请求错误
  return Promise.reject(new Error(message))
})
export default service
