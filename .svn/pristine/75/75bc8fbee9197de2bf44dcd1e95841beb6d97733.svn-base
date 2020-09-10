import request from '@/utils/request'
export function bocDataInfo(params) {
  return request({
    url: 'data/people_bank_data',
    method: 'get',
    params: params
  })
}
export function addBocDataInfo(data, method) {
  return request({
    url: 'data/people_bank_data',
    method: method || 'post',
    data
  })
}
export function bocDataDetails(id) {
  return request({
    url: 'data/people_bank_data/' + id
  })
}
// 同步人行信息
export function synchrodata() {
  return request({
    url: 'data/people_bank_data/synchrodata',
    method: 'get'
  })
}

export function bocDelete(id) {
  return request({
    url: 'data/people_bank_data',
    method: 'delete',
    data: id
  })
}
export function bocDataInfoById(id) {
  return request({
    url: 'data/people_bank_data/' + id
  })
}
