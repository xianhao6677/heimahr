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

// 修改角色
export const updateRole = (data) => {
  return request({
    url: `/sys/role/${data.id}`,
    method: 'put',
    data
  })
}

// 删除角色
export const delRole = (id) => {
  return request({
    url: `/sys/role/${id}`,
    method: 'delete'
  })
}
