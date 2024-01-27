import router from '@/router'
import NProgress from 'nprogress'
import 'nprogress/nprogress.css'
import store from './store'

// 无需token即可访问的白名单地址
const whiteList = ['/login', '/404']
// 前置路由守卫
router.beforeEach(async(to, from, next) => {
  // console.log(to)
  // console.log(from)
  // console.log(next)
  NProgress.start()
  // 判断是否有token
  if (store.getters.token) {
    // 判断此次路由行为是否要跳转到登陆页
    if (to.path === '/login') {
      // 此时无需再登录，直接跳转到主页
      next('/') // 中转到主页
      // next()参数有地址时不会执行后置守卫，需手动关闭进度条
      NProgress.done()
    } else {
      // 此次路由行为并非跳转到登陆页
      // 先判断是否获取过用户资料
      if (!store.getters.userId) {
        await store.dispatch('user/getUserInfo')
      }
      next() // 路由放行
    }
  } else { // 没有token
    if (whiteList.includes(to.path)) {
      next()
    } else {
      next('/login')
      NProgress.done()
    }
  }
})

// 后置路由守卫
router.afterEach((to, from) => {
  NProgress.done()
})
