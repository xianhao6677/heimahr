import request from '@/utils/request'

// 获取组织架构-部门列表数据
export const getDepartment = () => {
  return request({
    url: '/company/department'
  })
}

// 获取-部门负责人列表
export const getManagerList = () => {
  return request({
    url: '/sys/user/simple'
  })
}
