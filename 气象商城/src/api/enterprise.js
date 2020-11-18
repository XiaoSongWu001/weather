import request from '@/utils/request'
//企业申请查询
export function getExamineCompanyInfo(data,token) {
	return request({
		url: '/admin/getExamineCompanyInfo?pageNo='+data,
		method: 'get',
		params: {token}
	})
}

//企业申请审核
export function examineCompanyInfo(data) {
	return request({
		url: '/admin/examineCompanyInfo',
		method: 'post',
		data
	})
}
//当前用户管理的公司的信息
export function getOwnCompanyInfo(token) {
	return request({
		url: '/admin/getOwnCompanyInfo',
		method: 'get',
		params: {token}
	})
}
//当前用户管理的公司的已加入员工信息
export function getStaffs(data,token) {
	return request({
		url: '/admin/getStaffs?pageNo='+data,
		method: 'get',
		params: {token}
	})
}
//待处理的加入公司的员工申请信息
export function getJoinCompanyInfo(data,token) {
	return request({
		url: '/admin/getJoinCompanyInfo?pageNo='+data,
		method: 'get',
		params: {token}
	})
}
//审核员工申请的接口
export function examineJoinCompanyInfo(data) {
	return request({
		url: '/admin/examineJoinCompanyInfo',
		method: 'post',
		data
	})
}
//管理员工等级的接口
export function setStaffLevel(data) {
	return request({
		url: '/admin/setStaffLevel',
		method: 'post',
		data
	})
}
//开除员工的接口
export function expelStaff(data) {
	return request({
		url: '/admin/expelStaff',
		method: 'post',
		data
	})
}
