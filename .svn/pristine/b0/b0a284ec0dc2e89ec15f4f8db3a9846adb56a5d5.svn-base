import request from '@/utils/request'

export function getTypeList(params) {
  return request({
    url: 'archives/electronicRecordCategory/list',
    method: 'get',
    params: params
  })
}
export function addArchivesType(data) {
  return request({
    url: 'archives/electronicRecordCategory/save',
    method: 'post',
    data
  })
}
export function editArchivesType(data) {
  return request({
    url: 'archives/electronicRecordCategory/update',
    method: 'put',
    data
  })
}
export function getArchivesTypeInfo(id) {
  return request({
    url: 'archives/electronicRecordCategory/info/' + id
  })
}
export function delArchivesType(id) {
  return request({
    url: 'archives/electronicRecordCategory/delete',
    method: 'delete',
    data: id
  })
}
