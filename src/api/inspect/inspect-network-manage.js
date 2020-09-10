import request from '@/utils/request'
export function inspectNetDataList(params) {
  return request({
    url: 'inspect/branch_account',
    method: 'get',
    params: params
  })
}
export function addInspectNetDataList(data, method) {
  return request({
    url: 'inspect/branch_account',
    method: method || 'post',
    data
  })
}
export function batchAccout(data) {
  return request({
    url: 'inspect/branch_account/check',
    method: 'post',
    data
  })
}
export function batchAllAccout(data) {
  return request({
    url: 'inspect/branch_account/check_all',
    method: 'post',
    data
  })
}
export function inspectNetDelete(id) {
  return request({
    url: 'inspect/branch_account',
    method: 'delete',
    data: id
  })
}
export function getInspectNetDetails(id) {
  return request({
    url: 'inspect/branch_account/' + id
  })
}
