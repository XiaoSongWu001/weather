import request from '@/utils/request'
//获取菜单
export function getPermission(data) {
	return request({
		url: '/permission/getPermission',
		method: 'post',
		data
	})
}
//获取管理员可用菜单
export function getAdminPermission() {
	return request({
		url: '/permission/getAdminPermission',
		method: 'get',
		// params:{token},
	})
}

//添加菜单
export function addPermission(data) {
	return request({
		url: '/permission/addPermission',
		method: 'post',
		data
	})
}
//修改菜单
export function updatePermission(data) {
	return request({
		url: '/permission/updatePermission',
		method: 'post',
		data
	})
}

//角色管理
//查询角色
export function getRole(data) {
	return request({
		url: '/permission/getRole',
		method: 'post',
		data
	})
}
//添加角色 
export function addRole(data) {
	return request({
		url: '/permission/addRole',
		method: 'post',
		data
	})
}
//修改角色
export function updateRole(data) {
	return request({
		url: '/permission/updateRole',
		method: 'post',
		data
	})
}
//获取角色id（表格编辑操作）
export function queryRole(data) {
	return request({
		url: '/permission/queryRole?roleId='+data,
		method: 'get',
	})
}
//管理员管理
//查询管理员
export function queryAdmin(data) {
	return request({
		url: '/permission/queryAdmin',
		method: 'post',
		data
	})
}
//新增管理员
export function addAdmin(data) {
	return request({
		url: '/permission/addAdmin',
		method: 'post',
		data
	})
}
//修改管理员
export function updateAdmin(data) {
	return request({
		url: '/permission/updateAdmin',
		method: 'post',
		data
	})
}

//获取用户默认等级
export function getUserLevels(data) {
	return request({
		url: '/admin/getUserLevels?pageNo='+data,
		method: 'get',
	})
}
//修改用户默认等级
export function updateUserLevel(data) {
	return request({
		url: '/admin/updateUserLevel',
		method: 'post',
		data
	})
}

//新增用户默认等级
export function addUserLevel(data) {
	return request({
		url: '/admin/addUserLevel',
		method: 'post',
		data
	})
}