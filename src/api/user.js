import request from '@/utils/request'

// 登录
export const login = (data) => {
  return request({
    url: '/sys/login',
    method: 'post',
    data
  })
}

// 获取用户信息
export const getUserInfo = () => {
  return request({
    url: '/sys/profile'
  })
}

// 修改密码
export const updatePassword = (data) => {
  return request({
    url: '/sys/user/updatePass',
    method: 'put',
    data
  })
}
