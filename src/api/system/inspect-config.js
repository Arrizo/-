import request from '@/utils/request'
export function getConfigList(params) {
  return request({
    url: 'sys/config/list',
    method: 'get'
  })
}

export function getUpdataParms(data) {
  return request({
    url: 'sys/config/update_inspect_param',
    method: 'post',
    data
  })
}

