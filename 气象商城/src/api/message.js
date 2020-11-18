import request from '@/utils/request'
//广告查询
export function select(data) {
	return request({
		url: '/advertise/select',
		method: 'post',
		data
	})
}
//广告新增
export function add(data) {
	return request({
		url: '/advertise/add',
		method: 'post',
		data
	})
}

//广告修改
export function update(data) {
	return request({
		url: '/advertise/update',
		method: 'post',
		data
	})
}

//广告删除
export function del(data) {
	return request({
		url: '/advertise/delete?id='+data,
		method: 'get',
	})
}

//广告审核
// export function updateState(data,data1) {
// 	return request({
// 		url: '/advertise/updateState?id=' + data +'&&state=' + data1,
// 		method: 'get',
// 	})
// }

//广告积分给定
export function updateADpoints(data,data1) {
	return request({
		url: '/advertise/updateADpoints?id=' + data +'&&adPoints=' + data1,
		method: 'get',
	})
}
//灾害消息查询
export function warningmsg(data) {
	return request({
		url: '/warningmsg/list',
		method: 'post',
		data
	})
}
//灾害消息新增
export function warningmsgAdd(data) {
	return request({
		url: '/warningmsg/add',
		method: 'post',
		data
	})
}
//灾害消息修改
export function warningmsgUpdate(data) {
	return request({
		url: '/warningmsg/update',
		method: 'post',
		data
	})
}
//灾害消息删除
export function warningmsgDel(data) {
	return request({
		url: '/warningmsg/delete?id='+data,
		method: 'get',
	})
}
//平台消息
//平台消息查询
export function publicSelect(data) {
	return request({
		url: '/messPublish/list',
		method: 'post',
		data
	})
}
//平台消息新增
export function publicAdd(data) {
	return request({
		url: '/messPublish/add',
		method: 'post',
		data
	})
}
//平台消息修改
export function publicUpdate(data) {
	return request({
		url: '/messPublish/update',
		method: 'post',
		data
	})
}
//平台消息删除
export function publicDel(data) {
	return request({
		url: '/messPublish/delete?id='+data,
		method: 'get',
	})
}
//圈子消息
//圈子消息获取
export function circleSelect(data) {
	return request({
		url: '/messType/tree',
		method: 'post',
		data
	})
}
//圈子消息新增
export function circleAdd(data) {
	return request({
		url: '/messType/add',
		method: 'post',
		data
	})
}
//圈子消息修改
export function circleUpdate(data) {
	return request({
		url: '/messType/update',
		method: 'post',
		data
	})
}
//圈子消息删除
export function circleDel(data) {
	return request({
		url: '/messType/delete?id='+data,
		method: 'get',
	})
}

//广告联系获取
export function addressContactList(data) {
	return request({
		url: '/advertiseContact/addressContactList',
		method: 'post',
		data
	})
}

//广告联系
export function addressContactIsContact(data,data1) {
	return request({
		url: '/advertiseContact/addressContactIsContact?id='+data+'&isContact='+data1,
		method: 'get',
	})
}