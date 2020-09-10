import request from '@/utils/request'

export function getMenuList() {
  return request({
    url: 'sys/menu',
    method: 'get'
  })
}
export function getMenuNavList() {
  return request({
    url: 'sys/menu/nav',
    method: 'get'
  })
}
export function addMenuList(data, method) {
  return request({
    url: 'sys/menu',
    method: method || 'post',
    data
  })
}

export function getMenuDetails(id) {
  return request({
    url: 'sys/menu/' + id
  })
}

export function getMenuSelectList() {
  return request({
    url: 'sys/menu/select'
  })
}

export function deleteMenu(id) {
  return request({
    url: 'sys/menu/' + id,
    method: 'delete'
  })
}
