import axios from 'axios'
import store from '@/store'
import { Message } from 'element-ui'
import router from '@/router'

const service = axios.create({
  baseURL: process.env.VUE_APP_BASE_API,
  timeout: 50000
})

// 添加请求拦截器
service.interceptors.request.use(function(config) {
  // 在发送请求之前做些什么
  if (store.getters.token) {
    config.headers.Authorization = `Bearer ${store.getters.token}`
  }
  return config
}, function(error) {
  // 对请求错误做些什么
  return Promise.reject(error)
})

// 添加响应拦截器
service.interceptors.response.use(function(response) {
  // 判断是否为blob二进制文件流格式的数据
  if (response.data instanceof Blob) return response.data
  // 非blob二进制文件流，默认为JSON格式
  const { data, message, success } = response.data
  if (success) {
    return data
  } else {
    Message({ type: 'error', message: message })
    return Promise.reject(new Error(message))
  }
}, function(error) {
  // token 失效
  if (error.response.status === 401) {
    Message({ type: 'error', message: '登录超时，请重新登录' })
    store.dispatch('user/logout') // 调用action中的logout清空信息并退出登录
    router.push('/') // 跳转到登陆页
    return Promise.reject(error)
  }
  Message({ type: 'error', message: error.message })
  return Promise.reject(error)
})

export default service
