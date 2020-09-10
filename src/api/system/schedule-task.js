import request from '@/utils/request'
export function getScheduleList(params) {
  return request({
    url: 'sys/schedule/list',
    method: 'get',
    params: params
  })
}
export function getScheduleLogList(params) {
  return request({
    url: 'sys/scheduleLog/list',
    method: 'get',
    params: params
  })
}
export function addScheduleData(data, url) {
  return request({
    url: url || 'sys/schedule/save',
    method: 'post',
    data
  })
}

export function scheduleDataDetails(id) {
  return request({
    url: 'sys/schedule/info/' + id
  })
}

export function scheduleDataDelete(id) {
  return request({
    url: 'sys/schedule/delete',
    method: 'post',
    data: id
  })
}

export function scheduleDataPause(id) {
  return request({
    url: 'sys/schedule/pause',
    method: 'post',
    data: id
  })
}
export function scheduleDataResume(id) {
  return request({
    url: 'sys/schedule/resume',
    method: 'post',
    data: id
  })
}
export function scheduleDataRun(id) {
  return request({
    url: 'sys/schedule/run',
    method: 'post',
    data: id
  })
}

