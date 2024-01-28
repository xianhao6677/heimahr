import request from '@/utils/request'

// 获取部门列表数据
export const getDepartment = () => {
  return request({
    url: '/company/department'
  })
}
