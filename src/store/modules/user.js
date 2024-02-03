import { getToken, setToken, removeToken } from '@/utils/auth'
import { getUserInfo, login } from '@/api/user'

const state = {
  token: getToken(),
  userInfo: {}
}

const mutations = {
  // 登录设置token并持久化
  setToken(state, token) {
    state.token = token
    setToken(token)
  },
  // 退出时清除token
  removeToken(state) {
    state.token = null
    removeToken()
  },
  // 设置用户基本资料
  setUserInfo(state, userInfo) {
    state.userInfo = userInfo
  }
}

const actions = {
  async login(context, data) {
    // console.log(data)
    // todo: 调用登录接口
    const token = await login(data)
    // console.log(token)
    context.commit('setToken', token)
  },
  // 获取用户基本资料
  async getUserInfo(context) {
    // console.log('111')
    const res = await getUserInfo()
    // console.log(res)
    context.commit('setUserInfo', res)
    return res // 返回数据
  },
  // 退出登录清空信息
  logout(context) {
    context.commit('removeToken') // 删除token
    context.commit('setUserInfo', {}) // 设置用户信息为空对象
  }
}

export default {
  namespaced: true, // 开启命名空间
  state,
  mutations,
  actions
}
