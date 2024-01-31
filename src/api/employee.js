import request from '@/utils/request'

// 获取员工列表
export const getEmployeeList = (params) => {
  return request({
    url: '/sys/user',
    params // 地址参数/查询参数
  })
}

// 导出所有员工信息(excel文件)
export const exportEmployee = () => {
  return request({
    url: '/sys/user/export',
    responseType: 'blob' // 返回的是二进制文件流格式的数据，使用blob接收
  })
}
