import request from '@/utils/request'

// 获取角色列表
export const getRoleList = (params) => {
  return request({
    url: '/sys/role',
    params
  })
}

// 新增角色
export const addRole = (data) => {
  return request({
    url: '/sys/role',
    method: 'post',
    data
  })
}
