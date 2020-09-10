// 电子档案
import Layout from '@/layout'
const routes = [
  {
    path: '/archives',
    component: Layout,
    redirect: '/archives/archive-list',
    children: [{
      path: 'archive-list',
      name: 'ArchiveList',
      component: () => import('@/views/archives/archlivesList'),
      meta: { title: '电子档案信息', icon: 'dashboard' }
    }]
  },
  {
    path: '/Atype',
    component: Layout,
    children: [{
      path: 'archive-type',
      name: 'ArchiveType',
      component: () => import('@/views/archives/archlivesType'),
      meta: { title: '电子档案分类', icon: 'dashboard' }
    }]
  }
]

export default routes
