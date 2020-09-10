import request from '@/utils/request'

export function getNetworkList() {
  return request({
    url: 'sys/branch/list',
    method: 'get'
  })
}
export function addNetworkList(data, method) {
  return request({
    url: method || 'sys/branch/save',
    method: 'post',
    data
  })
}

export function deleteInfo(branchId) {
  return request({
    url: '/sys/branch/'+branchId,
    method: 'delete'
  })
}

export function getNetworkInfo(id) {
  return request({
    url: 'sys/branch/info/' + id
  })
}

export function deleteMenu(id) {
  return request({
    url: 'sys/menu',
    method: 'delete',
    data: id
  })
}
