import request from '@/utils/request'

// 获取-权限点列表
export const getPermissionList = () => {
  return request({
    url: '/sys/permission'
  })
}
