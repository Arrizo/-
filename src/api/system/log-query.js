import request from '@/utils/request'
export function getLogQueryList(params) {
  return request({
    url: 'sys/log',
    method: 'get',
    params: params
  })
}
