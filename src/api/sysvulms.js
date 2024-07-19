import request from '@/utils/request'

export function getSysvulmsList(data) {
  return request({
    url: '/sysvulms/list',
    method: 'post',
    data
  })
}

export function submitsysvuls(data) {
  alert('提交中。。。。。')
  return request({
    url: '/sysvulms/add',
    method: 'post',
    data
  })
}

export function getsysvulsInfo(id) {
  return request({
    url: '/sysvulms/info',
    method: 'get',
    params: { id }
  })
}

export function getChecksysvulsList(params) {
  return request({
    url: '/check/sysvulms/list',
    method: 'get',
    params
  })
}

export function SysvulsExport(data) {
  return request({
    url: '/sysvulms/export',
    method: 'post',
    data
  })
}

export function checksysvul(sysvul_id) {
  return request({
    url: '/check/sysvulms',
    method: 'POST',
    data: {
      sysvul_id,
      check: 1
    }
  })
}

export function sysvulsDel(id) {
  return request({
    url: '/sysvulms/del',
    method: 'POST',
    data: {
      id
    }
  })
}
