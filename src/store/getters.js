const getters = {
  sidebar: state => state.app.sidebar,
  device: state => state.app.device,
  token: state => state.user.token,
  avatar: state => state.user.avatar,
  name: state => state.user.name,
  remenberPass: state => state.user.remenberPass,
  resetRoutes: state => state.app.resetRoutes,
  brachTree: state => state.app.brachTree,
  asyncRouter: state => state.user.asyncRouter,
  permissionList: state => state.user.permissionList
}
export default getters
