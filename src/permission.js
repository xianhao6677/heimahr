import router from '@/router'
import NProgress from 'nprogress'
import 'nprogress/nprogress.css'
import store from './store'
import { asyncRoutes } from '@/router'

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
        // 获取当前登录用户个人信息，并解构出该用户所拥有的权限点集合
        const { roles } = await store.dispatch('user/getUserInfo')
        // console.log(menus)
        // console.log(asyncRoutes)
        // // 根据该用户的权限点集合，通过 动态路由列表 筛选出 可以访问的页面路由
        const filterRoutes = asyncRoutes.filter(item => {
          // console.log(item.path.slice(1))
          return roles.menus.includes(item.path.slice(1))
        })
        // console.log(filterRoutes)
        // 添加动态路由信息到 store 的路由列表
        store.commit('user/setRoutes', filterRoutes)
        // 404页面添加到数组的最后一项
        // router.addRoutes([...filterRoutes, { path: '*', redirect: '/404', hidden: true }])
        router.addRoutes([...store.getters.routes, { path: '*', redirect: '/404', hidden: true }])
        // router添加动态路由后，需要转发一下
        next(to.path) // 让路由拥有添加的路由信息，router的已知缺陷
      } else {
        next() // 路由放行
      }
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
