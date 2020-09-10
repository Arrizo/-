import request from '@/utils/request'
import qs from 'qs'
import { getToken } from '@/utils/auth'
const baseUrl = document.location.protocol + process.env.VUE_APP_BASE_API
export function bussinessDataList(params) {
  return request({
    url: 'data/ic',
    method: 'get',
    params: params
  })
}
export function addBussinessDataList(data, method) {
  return request({
    url: 'data/ic',
    method: method || 'post',
    data
  })
}
export function bussinessDelete(id) {
  return request({
    url: 'data/ic',
    method: 'delete',
    data: id
  })
}
export function getBusinessDetails(id) {
  return request({
    url: 'data/ic/' + id
  })
}

export function downloadExcel(url) {
  var urls = baseUrl + url
  window.open(urls)
}
export function exportExcel(url, params) {
  var urls = baseUrl + url + qs.stringify(params) + '&token=' + getToken()
  console.log(urls)
  window.open(urls)
}
