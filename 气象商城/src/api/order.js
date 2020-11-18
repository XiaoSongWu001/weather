import request from '@/utils/request'
//订单查询
export function queryOrder(data) {
	return request({
		url: '/orderGoods/queryOrder',
		method: 'post',
		data
	})
}
//订单发货 
export function deliverGoods(data) {
	return request({
		url: '/orderGoods/deliverGoods',
		method: 'post',
		data
	})
}
//物流公司获取
export function getLogisticsCompany() {
	return request({
		url: '/base/getLogisticsCompany',
		method: 'get',
	})
}

//物流信息获取
export function logisticsInfo(data) {
	return request({
		url: '/orderGoods/logisticsInfo?number='+data,
		method: 'get',
	})
}