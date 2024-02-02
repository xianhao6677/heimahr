import request from '@/utils/request'

// 获取-权限点列表
export const getPermissionList = () => {
  return request({
    url: '/sys/permission'
  })
}

// 新增-权限点
export const addPermission = (data) => {
  return request({
    url: '/sys/permission',
    method: 'post',
    data
  })
}

// 获取-权限点详情
export const getPermissionDetail = (id) => {
  return request({
    url: `/sys/permission/${id}`
  })
}

// 修改-权限点详情
export const updatePermission = (data) => {
  return request({
    url: `/sys/permission/${data.id}`,
    method: 'put',
    data
  })
}

// 删除-权限点
export const delPermission = (id) => {
  return request({
    url: `/sys/permission/${id}`,
    method: 'delete'
  })
}
