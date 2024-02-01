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

// 批量-下载导入员工模板
export const getExportTemplate = () => {
  return request({
    url: '/sys/user/import/template',
    responseType: 'blob'
  })
}

// 批量-导入员工(上传excel)
export const uploadExcel = (data) => {
  return request({
    url: '/sys/user/import',
    method: 'post',
    data
  })
}

// 删除员工信息
export const delEmployee = (id) => {
  return request({
    url: `/sys/user/${id}`,
    method: 'delete'
  })
}
//  新增员工
export const addEmployee = (data) => {
  return request({
    url: '/sys/user',
    method: 'post',
    data
  })
}

// 获取员工详情
export const getEmployeeDetail = (id) => {
  return request({
    url: `/sys/user/${id}`
  })
}
