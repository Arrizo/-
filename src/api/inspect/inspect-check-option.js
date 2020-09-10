import request from '@/utils/request'

export function getInspectCheckOption() {
  return request({
    url: 'inspect/rule/query',
    method: 'get'
  })
}
export function saveInspectCheckOption(data) {
  return request({
    url: 'inspect/rule/save',
    method: 'post',
    data
  })
}
