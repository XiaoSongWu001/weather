import request from '@/utils/request'
//获取积分比例
export function getIntegralRatio() {
	return request({
		url: '/base/getIntegralRatio',
		method: 'get',
	})
}

//设置积分比例
export function setIntegralRatio(data) {
	return request({
		url: '/base/setIntegralRatio?integralRatio='+data,
		method: 'get',
	})
}
//获取默认文件接口
export function getDefaultImgs() {
	return request({
		url: '/admin/getDefaultImgs',
		method: 'get',
	})
}

//设置积分比例
export function setDefaultImgs(data) {
	return request({
		url: '/admin/setDefaultImgs',
		method: 'post',
		data
	})
}