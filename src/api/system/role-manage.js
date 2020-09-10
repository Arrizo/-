import request from '@/utils/request'
export function getRoleList(params) {
  return request({
    url: 'sys/role',
    method: 'get',
    params: params
  })
}
export function addRoleData(data, method) {
  return request({
    url: 'sys/role',
    method: method || 'post',
    data
  })
}
export function roleList() {
  return request({
    url: 'sys/role'
  })
}
export function MenuList() {
  return request({
    url: 'sys/menu/list'
  })
}

export function roleDataDetails(id) {
  return request({
    url: 'sys/role/' + id
  })
}

export function roleDataDelete(id) {
  return request({
    url: 'sys/role',
    method: 'delete',
    data: id
  })
}

