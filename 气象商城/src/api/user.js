import request from '@/utils/request'


export function login(data) {
  return request({
    url: '/admin/login',
    method: 'post',
    data
  })
}

export function AdminInfo(token) {
  return request({
    url: '/permission/AdminInfo',
    method: 'get',
		 params: { token }
  })
}

export function changePassword(data) {
  return request({
    url: '/admin/changePassword',
    method: 'post',
		data
  })
}
