// 账户管理路由
import Layout from '@/layout'
const routes = [
  {
    path: '/accountManage',
    component: Layout,
    redirect: '/accountManage/accout',
    children: [{
      path: 'accout',
      name: 'Accout',
      component: () => import('@/views/manage/AccoutManage'),
      meta: { title: '账户管理', icon: 'dashboard' }
    }]
  }
  // {
  //   path: '/Ireport',
  //   component: Layout,
  //   children: [{
  //     path: '/inspect-report',
  //     name: 'InspectReport',
  //     component: () => import('@/views/inspect/dashboard/index'),
  //     meta: { title: '年检统计报表', icon: 'dashboard' }
  //   }]
  // },
  // {
  //   path: '/Idetalis',
  //   component: Layout,
  //   children: [{
  //     path: '/inspect-detail',
  //     name: 'InspectDetail',
  //     component: () => import('@/views/inspect/InspectDetail'),
  //     meta: { title: '年检统计详情', icon: 'dashboard' }
  //   }]
  // },
  // {
  //   path: '/Ihistory',
  //   component: Layout,
  //   children: [{
  //     path: '/inspect-history',
  //     name: 'InspectHistory',
  //     component: () => import('@/views/inspect/InspectHistoryList'),
  //     meta: { title: '年检历史清单', icon: 'dashboard' }
  //   }]
  // },
  // {
  //   path: '/business-manage',
  //   component: Layout,
  //   children: [{
  //     path: '/business-data-manage',
  //     name: 'BusinessDataManage',
  //     component: () => import('@/views/inspect/InspectBussinessManage'),
  //     meta: { title: '工商数据管理', icon: 'dashboard' }
  //   }]
  // },
  // {
  //   path: '/boc-manage',
  //   component: Layout,
  //   children: [{
  //     path: '/boc-data-manage',
  //     name: 'BocDataManage',
  //     component: () => import('@/views/inspect/InspectBocManage'),
  //     meta: { title: '人行数据管理', icon: 'dashboard' }
  //   }]
  // },
  // {
  //   path: '/insert-manage',
  //   component: Layout,
  //   children: [{
  //     path: '/insert-data-manage',
  //     name: 'InsertDatManage',
  //     component: () => import('@/views/inspect/InspectInsideBocManage'),
  //     meta: { title: '行内数据管理', icon: 'dashboard' }
  //   }]
  // },
  // {
  //   path: '/network-manage',
  //   component: Layout,
  //   children: [{
  //     path: '/network-data-manage',
  //     name: 'NetworkDataManage',
  //     component: () => import('@/views/inspect/InspectNetworkManage'),
  //     meta: { title: '网点账户管理', icon: 'dashboard' }
  //   }]
  // }
  // { path: '*', redirect: '/404', hidden: true }
]

export default routes
