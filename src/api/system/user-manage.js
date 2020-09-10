import request from '@/utils/request'
export function getUserList(params) {
  return request({
    url: 'sys/user',
    method: 'get',
    params: params
  })
}
export function addUserData(data, method) {
  return request({
    url: 'sys/user',
    method: method || 'post',
    data
  })
}
export function roleList() {
  return request({
    url: 'sys/role'
  })
}

export function userDataDetails(id) {
  return request({
    url: 'sys/user/' + id
  })
}

export function userDataDelete(id) {
  return request({
    url: 'sys/user',
    method: 'delete',
    data: id
  })
}

