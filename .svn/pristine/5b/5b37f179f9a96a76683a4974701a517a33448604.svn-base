import request from '@/utils/request'
import qs from 'qs'
import { getToken } from '@/utils/auth'
const baseUrl = 'http:' + process.env.VUE_APP_BASE_API
export function inspectHistoryList(params) {
  return request({
    url: '/inspect',
    method: 'get',
    params: params
  })
}
export function exportExcel(url, params) {
  var urls = baseUrl + url + qs.stringify(params) + '&token=' + getToken()
  window.open(urls)
}

