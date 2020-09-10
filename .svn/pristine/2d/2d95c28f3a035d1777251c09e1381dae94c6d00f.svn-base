import request from '@/utils/request'
// import qs from 'qs'
export function login(data) {
  return request({
    url: 'sys/login',
    method: 'post',
    data
  })
}
export function reflushCode(uuid) {
  return request({
    url: 'captcha?uuid=' + uuid
  })
}
export function getInfo(token) {
  return request({
    url: '/user/info',
    method: 'get',
    params: { token }
  })
}
export function getPermission() {
  return request({
    url: 'sys/menu/permission',
    method: 'get'
  })
}
export function logout() {
  return request({
    url: '/sys/logout',
    method: 'post'
  })
}
