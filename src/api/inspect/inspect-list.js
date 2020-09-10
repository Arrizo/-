import request from '@/utils/request'

import { getToken } from '@/utils/auth'

import qs from 'qs'
const baseUrl = document.location.protocol + process.env.VUE_APP_BASE_API
export function getInspectList(data) {
  return request({
    url: 'inspect',
    method: 'get',
    params: data
  })
}
export function getInspecMethodsDetails(id) {
  return request({
    url: 'inspect/' + id
  })
}

export function getInspecInfoCompare(id) {
  return request({
    url: 'inspect/inspect_info_compare/' + id
  })
}
export function getInspecMethodsdelte(id) {
  return request({
    url: 'inspect',
    method: 'delete',
    data: [id]
  })
}
// 部分年检
export function batchInspect(data) {
  return request({
    url: 'inspect/batch_inspect',
    method: 'post',
    data
  })
}
export function reportRpeopleBank(data) {
  return request({
    url: 'inspect/report_people_bank',
    method: 'post',
    data
  })
}
export function reportRpeopleBankAll(data) {
  return request({
    url: 'inspect/report_people_bank_all',
    method: 'post',
    data
  })
}

export function batchInspectAll(data) {
  return request({
    url: 'inspect/batch_inspect_all',
    method: 'post',
    data
  })
}
// 下载模板
export function downloadExcel(url) {
  var urls = baseUrl + url+ '?token=' + getToken()
  window.open(urls)
}
// 导出
export function exportExcel(url, params) {
  var urls = baseUrl + url + qs.stringify(params) + '&token=' + getToken()
  console.log(urls)
  window.open(urls)
}
export function getBranchTree() {
  return request({
    url: 'sys/branch/select',
    method: 'get'
  })
}
export function excelImport(url) {
  return baseUrl + url
}
export function changeStatusInfo(id) {
  return request({
    url: 'inspect/change_status/' + id
  })
}
// function requestParams(params, method) {
//   obj={}
//   if()
// }
