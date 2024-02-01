import layout from '@/layout'
export default {
  path: '/employee',
  component: layout,
  children: [{
    path: '',
    name: 'employee',
    component: () => import('@/views/employee'),
    meta: {
      title: '员工',
      icon: 'people'
    }
  }, {
    path: '/employee/detail/:id?',
    component: () => import('@/views/employee/detail.vue'),
    hidden: true, // 在左侧菜单中隐藏该二级路由
    meta: {
      title: '员工详情' // 页面上方导航显示的文本
    }
  }]
}
