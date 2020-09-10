import { login, logout, getInfo, getPermission } from '@/api/user'
import { getMenuNavList } from '@/api/system/menu-manage'
import { getToken, setToken, removeToken } from '@/utils/auth'
import { resetRouter } from '@/router'
import cookie_storage from '@/utils/Cookie_Storage'
import Layout from '@/layout'
import appMain from '@/layout/components/AppMain'
import { LOGIN_TOKEN, USER_FORM_COOKIE } from '@/env_config/env'
const state = {
  token: getToken(),
  name: '',
  avatar: '',
  remenberPass: !!cookie_storage.getInstance().getBlmCookie(USER_FORM_COOKIE) || false,
  asyncRouter: [],
  permissionList: []
}

const mutations = {
  SET_TOKEN: (state, token) => {
    state.token = token
  },
  SET_NAME: (state, name) => {
    state.name = name
  },
  SET_AVATAR: (state, avatar) => {
    state.avatar = avatar
  },
  REMENT_PASS: (state, remenber) => {
    state.remenberPass = remenber
  },
  ADD_ASYNC_ROUTER: (state, router) => {
    state.asyncRouter = router
  },
  ADD_PERMISSION: (state, permisstion) => {
    state.permissionList = permisstion
  }
}

const actions = {
  // user login
  login({ commit }, userInfo) {
    // const { username, password } = userInfo
    return new Promise((resolve, reject) => {
      login(userInfo).then(response => {
        commit('SET_TOKEN', response.token)
        setToken(response.token)
        if (state.remenberPass) {
          cookie_storage.getInstance().setBlmCookie(USER_FORM_COOKIE, userInfo, 15)
        } else {
          cookie_storage.getInstance().removeCookie(USER_FORM_COOKIE)
        }
        cookie_storage.getInstance().setBlmLocalStorage(LOGIN_TOKEN, response.token)
        resolve(response)
      }).catch(error => {
        reject(error)
      })
    })
  },
  // 动态生成路由
  async getAsyncRouter({ commit, state }) {
    const routers = []
    await getMenuNavList().then(res => {
      for (const menu of res.data) {
        var subRouter = []
        if (menu.subset && menu.subset.length > 0) {
          for (const subMenu of menu.subset) {
            var routerObj = {
              path: `/${menu.href}/${subMenu.href}`,
              component: Layout,
              redirect: `/${subMenu.href}`,
              name: menu.href,
              meta: { title: menu.text },
              children: [{
                path: `/${subMenu.href}`,
                name: subMenu.href,
                component: () => import(`@/views/${subMenu.href}`),
                meta: { title: subMenu.text, icon: 'dashboard' }
              }]
            }
            // add by ljd 20200903
            // 添加三级菜单处理，原有代码不支持三级菜单
            if (subMenu.subset && subMenu.subset.length > 0) {
              // console.log('subMenu.subset', JSON.stringify(subMenu.subset))
              let num = 0
              for (const child of subMenu.subset) {
                // console.log(child.href)
                // const obj = {
                //   path: `/${child.href}`,
                //   name: child.href,
                //   component: () => import(`@/views/${child.href}`),
                //   meta: { title: child.text, icon: 'dashboard' }
                // }
                // routerObj.children[0].component = appMain
                // routerObj.children[0].redirect = `/${child.href}`
                // if (!routerObj.children[0].children) {
                //   console.log('fisrt not children')
                //   routerObj.children[0].children = []
                // }
                // console.log('obj', obj)
                // routerObj.children[0].children.push(obj)
                if (num === 0) {
                  routerObj.children = []
                  num++
                }
                const obj1 = {
                  path: `/${subMenu.href}/${child.href}`,
                  component: appMain,
                  redirect: `/${child.href}`,
                  name: subMenu.href,
                  meta: { title: subMenu.text, icon: 'dashboard' },
                  children: [{
                    path: `/${child.href}`,
                    name: child.href,
                    component: () => import(`@/views/${child.href}`),
                    meta: { title: child.text, icon: 'dashboard' }
                  }]
                }
                routerObj.children.push(obj1)
              }
            }
            // console.log('routerObj', JSON.stringify(routerObj))
            subRouter.push(routerObj)
          }
        } else {
          const comp =
                        import(`@/views/${menu.href}`)
          var routerObjs = {
            path: `/${menu.href}`,
            // name: '',
            component: Layout,
            meta: { title: menu.text },
            children: [{
              path: menu.href,
              name: menu.href,
              component: () => comp,
              meta: { title: menu.name, icon: 'dashboard' }
            }]
          }
          subRouter.push(routerObjs)
        }
        // console.log(JSON.stringify(subRouter))
        routers.push(subRouter)
      }
    }).catch(error => {
      console.log(error)
    })
    commit('ADD_ASYNC_ROUTER', routers)
    getPermission().then(res => {
      if (res.code === 0) {
        commit('ADD_PERMISSION', res.result)
      }
    })
  },
  // get user info
  getInfo({ commit, state }) {
    return new Promise((resolve, reject) => {
      getInfo(state.token).then(response => {
        const { data } = response

        if (!data) {
          reject('Verification failed, please Login again.')
        }

        const { name, avatar } = data

        commit('SET_NAME', name)
        commit('SET_AVATAR', avatar)
        resolve(data)
      }).catch(error => {
        reject(error)
      })
    })
  },
  // 是否记住密码
  remenber({ commit }, rem) {
    console.log(rem)
    commit('REMENT_PASS', rem)
  },
  // user logout
  logout({ commit, dispatch, state, rootState }) {
    return new Promise((resolve, reject) => {
      logout().then(() => {
        commit('SET_TOKEN', '')
        removeToken()
        resetRouter()
        cookie_storage.getInstance().removeLocal(LOGIN_TOKEN)
        // console.log('BRACH_TREE', rootState.app)
        commit('app/BRACH_TREE', [], { root: true })
        // console.log('BRACH_TREE', rootState.app)
        resolve()
      }).catch(error => {
        reject(error)
      })
    })
  },

  // remove token
  resetToken({ commit }) {
    return new Promise(resolve => {
      commit('SET_TOKEN', '')
      removeToken()
      cookie_storage.getInstance().removeLocal(LOGIN_TOKEN)
      resolve()
    })
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}

