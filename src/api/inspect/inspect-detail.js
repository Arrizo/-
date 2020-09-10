import request from '@/utils/request'
import { getToken } from '@/utils/auth'
import qs from 'qs'
const baseUrl = 'http:' + process.env.VUE_APP_BASE_API
export function inspectDetailInfo(params) {
  return request({
    url: '/inspect/detail',
    method: 'get',
    params: params
  })
}
export function exportExcel(url, params) {
  var urls = baseUrl + url + qs.stringify(params) + '&token=' + getToken()
  window.open(urls)
}
