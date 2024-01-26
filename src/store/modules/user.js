import { getToken, setToken, removeToken } from '@/utils/auth'

const state = {
  token: getToken()
}

const mutations = {
  // 登录设置token并持久化
  setToken(state, token) {
    state.token = token
    setToken(token)
  },
  // 退出时清除token
  removeToken() {
    state.token = null
    removeToken()
  }
}

const actions = {
  login(context, data) {
    console.log(data)
    // todo: 调用登录接口
    context.commit('setToken', '123456')
  }
}

export default {
  namespaced: true, // 开启命名空间
  state,
  mutations,
  actions
}
