import { getToken, setToken, removeToken } from '@/utils/auth'
import { login } from '@/api/user'

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
  async login(context, data) {
    // console.log(data)
    // todo: 调用登录接口
    const token = await login(data)
    console.log(token)
    context.commit('setToken', token)
  }
}

export default {
  namespaced: true, // 开启命名空间
  state,
  mutations,
  actions
}
