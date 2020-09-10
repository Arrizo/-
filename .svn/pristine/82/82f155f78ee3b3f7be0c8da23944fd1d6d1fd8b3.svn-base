import request from '@/utils/request'
import qs from 'qs'
import { getToken } from '@/utils/auth'
const baseUrl = 'http:' + process.env.VUE_APP_BASE_API

export function getAccountManageList(params) {
  return request({
    url: 'account/account/list',
    method: 'get',
    params: params
  })
}
export function addAccountManage(data, url, method) {
  return request({
    url: url || 'account/account/save',
    method: method || 'post',
    data
  })
}
export function updateMonitor(data) {
  return request({
    url: 'account/account/updateAccStatus',
    method: 'put',
    data
  })
}

export function getAccountManageDetails(id) {
  return request({
    url: 'account/account/info/' + id
  })
}

export function deleteAccountManage(id) {
  return request({
    url: 'account/account/delete',
    method: 'delete',
    data: id
  })
}

export function amsReport(data) {
  return request({
    url: 'ams/amsAccountSubmit/',
    method: 'post',
    data
  })
}

export function batchAmsReport(data) {
  return request({
    url: 'ams/amsAccountSubmit',
    method: 'post',
    data
  })
}

export function eccsReport(licenseNumber, id, coutryCode, detAddress, moneyerSubType, type) {
  return request({
    url: 'eccs/creditReportCommit',
    method: 'post',
    data: qs.stringify({
      licenseNumber,
      id,
      coutryCode,
      detAddress,
      moneyerSubType,
      type
    })
  })
}

export function exportExcel(url, params) {
  var urls = baseUrl + url + qs.stringify(params) + '&token=' + getToken()
  window.open(urls)
}

export function excelImport(url) {
  return baseUrl + url
}

// 下载模板
export function downloadExcel(url) {
  var urls = baseUrl + url+ '?token=' + getToken()
  window.open(urls)
}
