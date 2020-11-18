import request from '@/utils/request'
//获取所有的商品分类
export function getClassification() {
	return request({
		url: '/commodity/getGoodsSort',
		method: 'get'
	})
}
//修改商品分类
export function updateGoodsSort(params) {
	return request({
		url: '/commodity/updateGoodsSort',
		method: 'post',
		params
	})
}
//添加商品分类
export function addGoodsSort(params) {
	return request({
		url: '/commodity/addGoodsSort',
		method: 'post',
		params
	})
}
//删除商品分类
export function delGoodsSort(data) {
	return request({
		url: '/commodity/delGoodsSort?id='+data,
		method: 'get',
	})
}
//商品管理
//查询商品
export function queryGoods(data) {
	return request({
		url: '/commodity/queryGoods',
		method: 'post',
		data
	})
}
//添加商品
export function addGoods(data) {
	return request({
		url: '/commodity/addGoods',
		method: 'post',
		data
	})
}
//修改商品
export function updateGoods(data) {
	return request({
		url: '/commodity/updateGoods',
		method: 'post',
		data
	})
}

//删除商品
export function delGoods(data) {
	return request({
		url: '/commodity/delGoods?goodsId='+data,
		method: 'get',
	})
}
//分类参数模板管理
//查询分类参数模板
export function getParamsTemplate(data) {
	return request({
		url: '/commodity/getParamsTemplate?goodsSortId=' + data,
		method: 'get'
	})
}
//添加分类参数模板
export function addParamsTemplate(data) {
	return request({
		url: '/commodity/addParamsTemplate',
		method: 'post',
		data
	})
}
//修改分类参数模板 
export function updateParamsTemplate(data) {
	return request({
		url: '/commodity/updateParamsTemplate',
		method: 'post',
		data
	})
}
//删除分类参数模板
export function delParamsTemplate(data) {
	return request({
		url: '/commodity/delParamsTemplate?id=' + data,
		method: 'get'
	})
}
//批量添加商品参数
export function batchAddGoodsParam(data) {
	return request({
		url: '/commodity/batchAddGoodsParam',
		method: 'post',
		data
	})
}

//商品参数模板管理
//商品上架
export function goodsOnAndOff(data) {
	return request({
		url: 'commodity/goodsOnAndOff',
		method: 'post',
		data
	})
}
//查询商品参数模板
export function getGoodsParams(data) {
	return request({
		url: '/commodity/getGoodsParams?goodsId=' + data,
		method: 'get'
	})
}
//添加商品参数模板
export function addGoodsParam(data) {
	return request({
		url: '/commodity/addGoodsParam',
		method: 'post',
		data
	})
}
//修改商品参数模板 
export function updateGoodsParam(data) {
	return request({
		url: '/commodity/updateGoodsParam',
		method: 'post',
		data
	})
}
//删除商品参数模板
export function delGoodsParam(data) {
	return request({
		url: '/commodity/delGoodsParam?id=' + data,
		method: 'get'
	})
}


//商品属性管理添加
export function addGoodsProperty(data) {
	return request({
		url: '/commodity/addGoodsProperty',
		method: 'post',
		data
	})
}
//商品属性管理删除
export function delGoodsProperty(data) {
	return request({
		url: '/commodity/delGoodsProperty?id='+data,
		method: 'get',
	})
}
//商品属性管理的查询
export function getGoodsProperty(data) {
	return request({
		url: '/commodity/getGoodsProperty?goodsId=' + data,
		method: 'get'
	})
}
//商品属性管理的添加商品规格
export function addGoodsSize(data) {
	return request({
		url: '/commodity/addGoodsSize',
		method: 'post',
		data
	})
}
//商品属性管理的删除商品规格
export function delGoodsSize(data) {
	return request({
		url: '/commodity/delGoodsSize?id='+ data,
		method: 'get',
	})
}
//价格表生成
export function ProduceGoods(data) {
	return request({
		url: '/commodity/ProduceGoods?goodsId='+data,
		method: 'get',
	})
}
//价格表提交
export function submitPriceList(data) {
	return request({
		url: '/commodity/submitPriceList',
		method: 'post',
		data
	})
}
//价格表查询
export function getPriceList(data) {
	return request({
		url: '/commodity/getPriceList?goodsId='+data,
		method: 'get',
	})
}
//删除文件 base/delFile
export function delFile(data) {
	return request({
		url: '/base/delFile?url='+data,
		method: 'get',
	})
}