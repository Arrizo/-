import request from '@/utils/request'
import qs from 'qs'
export function getExaminationList(params) {
  return request({
    url: 'examination/list',
    method: 'get',
    params: params
  })
}
export function addExamination(data, url, method) {
  return request({
    url: url || 'examination/save',
    method: method || 'post',
    data
  })
}

export function getExaminationDetails(id) {
  return request({
    url: 'examination/info/' + id
  })
}

export function deleteExamination(id) {
  return request({
    url: 'examination/delete',
    method: 'delete',
    data: id
  })
}

export function getAbnormalInfo(key, type = true) {
  var url = type ? 'abnormal/info/' : 'illegalInfo/info/'
  // var url = ''
  return request({
    url: url + key,
    method: 'get'
  })
}
export function accountMedicals(data) {
  return request({
    url: 'examination/accountMedical',
    method: 'put',
    data
  })
}
export function getBenefitInfo(id) {
  return request({
    url: 'examination/getBenefitList?id=' + id,
    method: 'put'
  })
}
export function getEnterpriseReport(row) {
  return request({
    url: 'api/enterprise/getEnterpriseReport',
    method: 'get',
    params: qs.parse({ keyword: row.creditCode || row.enterpriseName, id: row.id })
  })
}
