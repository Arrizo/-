import Cookies from 'js-cookie'
import { getTreeJson } from '@/utils/index'
const state = {
  sidebar: {
    opened: Cookies.get('sidebarStatus') ? !!+Cookies.get('sidebarStatus') : true,
    withoutAnimation: false
  },
  resetRoutes: {},
  device: 'desktop',
  brachTree: []
}

const mutations = {
  TOGGLE_SIDEBAR: state => {
    state.sidebar.opened = !state.sidebar.opened
    state.sidebar.withoutAnimation = false
    if (state.sidebar.opened) {
      Cookies.set('sidebarStatus', 1)
    } else {
      Cookies.set('sidebarStatus', 0)
    }
  },
  RESET_ROUTER: (state, routes) => {
    state.resetRoutes = routes
  },
  CLOSE_SIDEBAR: (state, withoutAnimation) => {
    Cookies.set('sidebarStatus', 0)
    state.sidebar.opened = false
    state.sidebar.withoutAnimation = withoutAnimation
  },
  TOGGLE_DEVICE: (state, device) => {
    state.device = device
  },
  BRACH_TREE: (state, tree) => {
    state.brachTree = tree
  }
}

const actions = {
  resetRouters({ commit }, route) {
    commit('RESET_ROUTER', route)
  },
  toggleSideBar({ commit }) {
    commit('TOGGLE_SIDEBAR')
  },
  closeSideBar({ commit }, { withoutAnimation }) {
    commit('CLOSE_SIDEBAR', withoutAnimation)
  },
  toggleDevice({ commit }, device) {
    commit('TOGGLE_DEVICE', device)
  },
  getBrachTree({ commit }, tree) {
    const treeJson = getTreeJson(tree, 'id', 'parentId')
    commit('BRACH_TREE', treeJson)
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}
