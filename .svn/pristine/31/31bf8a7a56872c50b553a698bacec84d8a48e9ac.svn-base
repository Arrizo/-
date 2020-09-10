
import Layout from '@/layout'
const routes = [
  {
    path: '/system',
    component: Layout,
    redirect: '/system/network-manage',
    children: [{
      path: 'network-manage',
      name: 'NetworkManage',
      component: () => import('@/views/System/NetworkSystem'),
      meta: { title: '网点管理', icon: 'dashboard' }
    }]
  },
  {
    path: '/Usermanage',
    component: Layout,
    children: [{
      path: '/user-manage',
      name: 'UserManage',
      component: () => import('@/views/System/UserManage'),
      meta: { title: '用戶管理', icon: 'dashboard' }
    }]
  },
  {
    path: '/RoleManage',
    component: Layout,
    children: [{
      path: '/role-manage',
      name: 'RoleManage',
      component: () => import('@/views/System/RoleManage'),
      meta: { title: '角色管理', icon: 'dashboard' }
    }]
  },
  {
    path: '/MenuManage',
    component: Layout,
    children: [{
      path: '/menu-manage',
      name: 'MenuManage',
      component: () => import('@/views/System/MenuManage'),
      meta: { title: '菜单管理', icon: 'dashboard' }
    }]
  },
  {
    path: '/ScheduleTask',
    component: Layout,
    children: [{
      path: '/schedule-Task',
      name: 'ScheduleTask',
      component: () => import('@/views/System/ScheduleTask'),
      meta: { title: '定时任务', icon: 'dashboard' }
    }]
  },
  {
    path: '/LogQuery',
    component: Layout,
    children: [{
      path: '/log-query',
      name: 'LogQuery',
      component: () => import('@/views/System/LogQuery'),
      meta: { title: '日志查询', icon: 'dashboard' }
    }]
  },
  {
    path: '/InspectConfig',
    component: Layout,
    children: [{
      path: '/inspect-config',
      name: 'InspectConfig',
      component: () => import('@/views/System/InspectConfig'),
      meta: { title: '年检参数配置', icon: 'dashboard' }
    }]
  },
  {
    path: '/BlackListManage',
    component: Layout,
    children: [{
      path: '/black-list-manage',
      name: 'BlackListManage',
      component: () => import('@/views/System/BlackListManage'),
      meta: { title: '黑名单管理', icon: 'dashboard' }
    }]
  }
  // { path: '*', redirect: '/404', hidden: true }
]

export default routes

