import request from '@/utils/request'

export function getDataList(params) {
  return request({
    url: 'archives/electronicRecordData/list',
    method: 'get',
    params: params
  })
}
export function addArchivesInfo(data) {
  return request({
    url: 'archives/electronicRecordData/save',
    method: 'post',
    data
  })
}
export function editArchivesInfo(data) {
  return request({
    url: 'archives/electronicRecordData/update',
    method: 'put',
    data
  })
}
export function getArchivesInfo(id) {
  return request({
    url: 'archives/electronicRecordData/info/' + id
  })
}
export function delArchivesInfo(id) {
  return request({
    url: 'archives/electronicRecordData/delete',
    method: 'delete',
    data: id
  })
}
export function getTypeList() {
  return request({
    url: 'archives/electronicRecordCategory/list',
    method: 'get'
  })
}
