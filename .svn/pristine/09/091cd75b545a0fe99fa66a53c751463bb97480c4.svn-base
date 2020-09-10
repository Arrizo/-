import request from '@/utils/request'
export function inspectInsideDataList(params) {
  return request({
    url: 'data/boc',
    method: 'get',
    params: params
  })
}
export function addInspectInsideDataList(data, method) {
  return request({
    url: 'data/boc',
    method: method || 'post',
    data
  })
}
export function inspectInsideDelete(id) {
  return request({
    url: 'data/boc',
    method: 'delete',
    data: id
  })
}
export function getInspectInsideDetails(id) {
  return request({
    url: 'data/boc/' + id
  })
}
