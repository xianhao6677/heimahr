const getters = {
  sidebar: state => state.app.sidebar,
  device: state => state.app.device,
  token: state => state.user.token,
  userId: state => state.user.userInfo.suerId, // 用户ID
  avatar: state => state.user.userInfo.staffPhoto, // 用户头像
  name: state => state.user.userInfo.username // 用户名称
}
export default getters
