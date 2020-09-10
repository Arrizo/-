import request from '@/utils/request'
export function getBlackList(params) {
  return request({
    url: 'sys/black_list',
    method: 'get',
    params: params
  })
}
export function addBlackData(data, method) {
  return request({
    url: 'sys/black_list',
    method: method || 'post',
    data
  })
}
export function blackDataDelete(id) {
  return request({
    url: 'sys/black_list',
    method: 'delete',
    data: id
  })
}
export function blackDataDetails(id) {
  return request({
    url: 'sys/black_list/' + id
  })
}
