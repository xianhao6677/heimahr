const getters = {
  sidebar: state => state.app.sidebar,
  device: state => state.app.device,
  token: state => state.user.token,
  userId: state => state.user.userInfo.userId, // 用户ID
  avatar: state => state.user.userInfo.staffPhoto, // 用户头像
  name: state => state.user.userInfo.username, // 用户名称
  routes: state => state.user.routes, // 路由列表
  company: state => state.user.userInfo.company, // 公司名称
  departmentName: state => state.user.userInfo.departmentName // 部门名称
}
export default getters
