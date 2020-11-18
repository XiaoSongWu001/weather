<template>
	<div>
		<div style="background: white;margin-bottom: 10px;padding: 10px;box-shadow: 0px 5px 10px rgba(0, 0, 0, 0.1);">
			<div style="border-bottom:1px solid #f6f6f6;padding: 10px;">
				搜索条件
			</div>
			<div style="margin: 5px; 0">
				<el-input size="mini" placeholder="商品名称或关键字" clearable style="width: 200px;margin-left: 10px;" v-model="paramsProduct.goodsName">
				</el-input>
				<el-select clearable style="margin:0 10px;width: 200px;" size="mini" v-model="paramsProduct.isHot" placeholder="是否热卖">
					<el-option v-for="item in optionsHot" :key="item.value" :label="item.label" :value="item.value">
					</el-option>
				</el-select>
				<el-select clearable style="width: 200px;" size="mini" v-model="paramsProduct.isBest" placeholder="是否精品">
					<el-option v-for="item in optionsHot" :key="item.value" :label="item.label" :value="item.value">
					</el-option>
				</el-select>
			</div>
			<div style="margin: 5px; 0">
				<el-select clearable style="margin:0 10px;width: 200px;" size="mini" v-model="paramsProduct.emailFree" placeholder="是否包邮">
					<el-option v-for="item in optionsHot" :key="item.value" :label="item.label" :value="item.value">
					</el-option>
				</el-select>
				<el-select clearable style="width: 200px;" size="mini" v-model="paramsProduct.isNew" placeholder="是否新品">
					<el-option v-for="item in optionsHot" :key="item.value" :label="item.label" :value="item.value">
					</el-option>
				</el-select>
			</div>
			<div>
				<el-button size="mini" type="primary" icon="el-icon-search" style="margin-left: 10px;" @click="selectAllProduct">搜索</el-button>
				<el-button size="mini" type="primary" style="margin-left: 10px;" @click="addproduct">添加商品</el-button>
			</div>
		</div>
		<!-- <div class="typetop">
			<el-select size="mini" v-model="value" filterable placeholder="请选择">
				<el-option v-for="item in options" :key="item" :label="item" :value="item">
				</el-option>
			</el-select>
		</div> -->
		<el-container>
			<el-table :data="productData" border style="width: 100%;margin-bottom: 10px;" height="710" max-height="780"
			 v-loading="tableLoading" element-loading-text="正在拼命加载中。。。。">
				<el-table-column prop="id" label="序号" min-width="8%" align="center"></el-table-column>
				<el-table-column prop="recommendImage" label="推荐图" min-width="20%" align="center" :sortable="'custom'">
					<template slot-scope="scope">
						<img v-if="scope.row.recommendImage!=null&&scope.row.recommendImage!=''" :src="url1+scope.row.recommendImage"
						 style="width: 30px;height: 30px;float: left;" />
					</template>
				</el-table-column>
				<el-table-column prop="goodsName" label="产品名称" min-width="20%" align="center"></el-table-column>
				<!-- <el-table-column prop="goodsSaleNum" label="虚拟销量" min-width="10%" align="center"></el-table-column> -->
				<el-table-column prop="goodsPrice" label="价格" min-width="10%" align="center"> </el-table-column>
				<el-table-column prop="goodsStock" label="库存" min-width="10%" align="center"></el-table-column>
				<el-table-column prop="goodsSaleNum" label="销量" min-width="10%" align="center"> </el-table-column>
				<el-table-column label="上架" min-width="17%" align="center">
					<template slot-scope="scope">
						<el-switch v-model="scope.row.goodsStatus" :active-value="1" :inactive-value="0" @change="changeswitch(scope.$index, scope.row,scope.row.goodsStatus)">
						</el-switch>
					</template>
				</el-table-column>
				<el-table-column label="操作" min-width="30%" align="center">
					<template slot-scope="scope">
						<el-button size="mini" type="primary" @click="paramSet(scope.$index, scope.row)">参数配置</el-button>
						<el-button size="mini" type="primary" @click="producttype(scope.$index, scope.row)">属性</el-button>
						<el-button size="mini" type="primary" @click="editproduct(scope.$index, scope.row)">编辑</el-button>
						<el-button size="mini" type="primary" @click="delproduct(scope.$index, scope.row)">删除</el-button>
						<!-- <el-dropdown style="margin-left: 10px;" trigger="click" @command="handleCommand">
							<el-button size="mini" type="primary" style="margin-right: 10px;">
								操作<i class="el-icon-arrow-down el-icon--right"></i>
							</el-button>
							<el-dropdown-menu slot="dropdown">
								<el-dropdown-item icon="el-icon-refresh-right" command="orderrefund">订单退款</el-dropdown-item>
								<el-dropdown-item icon="el-icon-bicycle" command="ordersend">订单配送</el-dropdown-item>
								<el-dropdown-item icon="el-icon-tickets" command="orderremark">订单备注</el-dropdown-item>
								<el-dropdown-item icon="el-icon-edit-outline" command="orderupdate">订单修改</el-dropdown-item>
								<el-dropdown-item icon="el-icon-notebook-2" command="orderrecord">订单记录</el-dropdown-item>
								<el-dropdown-item icon="el-icon-s-claim" command="confirmgoods">确认收货</el-dropdown-item>
							</el-dropdown-menu>
						</el-dropdown> -->
					</template>
				</el-table-column>
			</el-table>
		</el-container>

		<el-dialog :title="title" :visible.sync="centerDialogVisible" width="40%" center @close="closeDialog">
			<div style="width: 100%;" v-if="title=='编辑商品'">
				<span style="margin-right: 10px;height:40px;line-height: 40px;letter-spacing: 5px;">产品分类:</span>
				<el-cascader v-model="editname1" :key="cascaderKey" :options="optionsList" :props="{label: 'sortName',value:'id',checkStrictly: true}"></el-cascader>
			</div>
			<div style="display:flex;margin-top: 20px;">
				<span style="margin-right: 10px;height:40px;line-height: 40px;letter-spacing: 5px;">产品名称:</span>
				<el-input v-model="params.goodsName" placeholder="请输入内容" style="width: 60%;"></el-input>
			</div>
			<div style="display:flex;margin-top: 20px;">
				<span style="margin-right: 10px;height:40px;line-height: 40px;letter-spacing: 5px;">产品说明:</span>
				<el-input type="textarea" :rows="5" v-model="params.goodsIntroduce" style="width: 60%;"></el-input>
			</div>
			<div style="display:flex;margin-top: 20px;">
				<span style="margin-right: 10px;height:40px;line-height: 40px;letter-spacing: 2px;">产品关键字:</span>
				<el-input v-model="params.goodsKeyword" style="width: 60%;"></el-input>
			</div>
			<div style="display:flex;margin-top: 20px;">
				<span style="margin-right: 10px;height:40px;line-height: 40px;">产品计量单位:</span>
				<el-input v-model="params.unitName" style="width: 60%;"></el-input>
			</div>
			<div style="display:flex;margin-top: 20px;" class="father">
				<span style="margin-right: 10px;height:40px;line-height: 40px;letter-spacing: 5px;">产品主图:</span>
				<img v-if="imgone1" :src="item" :key="i" v-for="(item,i) in recommendList" alt="" style="width: 100px;height: 100px;margin-right: 10px;">
				<!-- <el-upload action="#" :show-file-list="false" list-type="picture-card" class="upload-demo"
				 :auto-upload="false" :on-change="changeSuccess" ref="upload">
					<i class="el-icon-plus"></i>
				</el-upload> -->
				<el-upload :action="actionurl" list-type="picture-card" class="upload-demo" :auto-upload="false" ref="upload1"
				 :data="params" :multiple="false" :limit="1" :on-success="successUpload1" name="recommendImage" :http-request="uploadFile1"
				 :on-change="editchange1">
					<i class="el-icon-plus"></i>
				</el-upload>
			</div>
			<div style="display:flex;margin-top: 20px;" class="father">
				<span style="margin-right: 10px;height:40px;line-height: 40px;letter-spacing: 2px;">产品轮播图:</span>
				<img v-if="imgone2" :src="item" :key="i" v-for="(item,i) in rotationList" alt="" style="width: 100px;height: 100px;margin-right: 10px;">
				<el-upload :on-change="editchange2" :action="actionurl" list-type="picture-card" class="upload-demo" :auto-upload="false"
				 ref="upload2" :multiple="true" :on-success="successUpload2" :on-remove="handleRemove" name="rotationImages"
				 :http-request="uploadFile2">
					<i class="el-icon-plus"></i>
				</el-upload>
			</div>
			<div style="display:flex;margin-top: 20px;" class="father">
				<span style="margin-right: 10px;height:40px;line-height: 40px;letter-spacing: 2px;">产品详情图:</span>
				<img v-if="imgone3" :src="item" :key="i" v-for="(item,i) in descriptionList" alt="" style="width: 100px;height: 100px;margin-right: 10px;">
				<el-upload :on-change="editchange3" :action="actionurl" list-type="picture-card" class="upload-demo" :auto-upload="false"
				 ref="upload3" :multiple="true" :on-success="successUpload3" name="goodsDescription" :on-remove="handleRemove"
				 :http-request="uploadFile3">
					<i class="el-icon-plus"></i>
				</el-upload>
			</div>

			<!-- 	<div style="display:flex;margin-top: 20px;">
				<div style="width: 33%;display: flex;">
					<span style="margin-right: 10px;height:30px;line-height: 30px;">产品售价:</span>
					<el-input v-model="params.orderNum" style="width: 150px;" size="mini"></el-input>
				</div>
				<div style="width: 33%;display: flex;">
					<span style="margin-right: 10px;height:30px;line-height: 30px;">产品市场价:</span>
					<el-input v-model="params.orderNum" size="mini" style="width: 150px;"></el-input>
				</div>
				<div style="width: 33%;display: flex;">
					<span style="margin-right: 10px;height:30px;line-height: 30px;">产品成本价:</span>
					<el-input v-model="params.orderNum" size="mini" style="width: 150px;"></el-input>
				</div>
			</div> -->

			<div style="display:flex;margin-top: 10px;">
				<div style="width: 33%;display: flex;">
					<span style="margin-right: 10px;height:30px;line-height: 30px;">赠送积分:</span>
					<el-input v-model="params.giveIntegral" style="width: 150px;" size="mini"></el-input>
				</div>
				<!-- <div style="width: 33%;display: flex;">
					<span style="margin-right: 10px;height:30px;line-height: 30px;margin-left: 42px;">库存:</span>
					<el-input v-model="params.orderNum" style="width: 150px;" size="mini"></el-input>
				</div> -->
			</div>

			<div style="display: flex;margin-top: 10px;">
				<div style="display:flex;width: 33%;">
					<span style="margin-right: 10px;line-height: 30px;">是否包邮:</span>
					<el-radio v-model="params.emailFree" :label="1" @change="yfchange(1)" style="line-height:30px;">是</el-radio>
					<el-radio v-model="params.emailFree" :label="0" @change="yfchange(2)" style="line-height:30px;">否</el-radio>
					<el-input v-model="params.emailPrice" size="mini" style="width: 80px;" placeholder="邮费" v-show="postageinput"></el-input>
				</div>
				<div style="display:flex;width: 33%;">
					<span style="margin-left: 26px;margin-right: 10px;line-height: 30px;">是否优惠:</span>
					<el-radio v-model="params.isDiscount" :label="1" style="line-height:30px;">是</el-radio>
					<el-radio v-model="params.isDiscount" :label="0" style="line-height:30px;">否</el-radio>
				</div>
				<div style="display:flex;width: 33%;">
					<span style="margin-right: 10px;line-height: 30px;">是否新品:</span>
					<el-radio v-model="params.isNew" :label="1" style="line-height:30px;">是</el-radio>
					<el-radio v-model="params.isNew" :label="0" style="line-height:30px;">否</el-radio>
				</div>
			</div>

			<div style="display: flex;margin-top: 10px;">
				<div style="display:flex;width: 33%;">
					<span style="margin-right: 10px;line-height: 30px;">是否热卖:</span>
					<el-radio v-model="params.isHot" :label="1" style="line-height:30px;">是</el-radio>
					<el-radio v-model="params.isHot" :label="0" style="line-height:30px;">否</el-radio>
				</div>
				<div style="display:flex;width: 33%;">
					<span style="margin-right: 10px;line-height: 30px;">是否精品:</span>
					<el-radio v-model="params.isBest" :label="1" style="line-height:30px;">是</el-radio>
					<el-radio v-model="params.isBest" :label="0" style="line-height:30px;">否</el-radio>
				</div>
			</div>
			<!-- 商品参数模板 -->
			<div style="margin-top: 10px;"  v-if="title=='添加商品'">
				<div v-if="goodsParamsModel.length!=0">
					<span style="margin-right: 10px;line-height: 30px;">参数配置：</span>
				</div>
				<div style="margin-top: 10px;width: 25%;float: left;" v-for="(item,i) in goodsParamsModel" :key="i">
					<span style="margin-right: 10px;line-height: 30px;">{{item.goodsParamName}}:</span>
					<el-input v-model="item.goodsParamValue" placeholder="库存" style="width: 120px;" size="mini"></el-input>
				</div>
			</div>
			<span slot="footer" class="dialog-footer">
				<el-button @click="centerDialogVisible = false">取 消</el-button>
				<el-button v-if="title=='添加商品'" type="primary" @click="confirmAddType('addConfirm')">确 定</el-button>
				<el-button v-if="title=='编辑商品'" type="primary" @click="confirmAddType('editConfirm')">确 定</el-button>
			</span>
		</el-dialog>

		<!-- 属性对话框 -->
		<el-dialog :title="titletype" :visible.sync="typeDialogVisible" width="50%" center>
			<div class="boxtype">
				<div style="display:flex;margin-top: 20px;">
					<span style="margin-right: 10px;line-height: 30px;">规则名称:</span>
					<el-input v-for="(item,i) in ruleListOne" placeholder="设置名称" v-model="item[i]" :placeholder="item.goodsPropertyName"
					 style="width: 120px;" size="mini">
						<i style="line-height: 30px;" :class="item.classIcon" slot="suffix" @click="handleIconClick(item[i],i)">
						</i>
					</el-input>
					<el-button style="margin-left: 10px;width: 120px;border: 1px dashed #DDDEE1;" icon="el-icon-plus" size="mini"
					 @click="addrules">添加新规则</el-button>
				</div>
				<div style="display: flex;margin-top: 10px;flex-wrap: wrap;" v-for="(item,i) in ruleList">
					<span style="margin-right: 10px;line-height: 30px;margin-left: 5px;margin-top: 10px;">{{item.goodsPropertyName}}:</span>
					<div v-for="(item1,j) in addTypeList[i].goodsSizes" style="width: 20%;margin-left:10px;margin-top: 10px;">
						<el-button size="mini">
							{{item1.goodsPropertyValue}}
							<i class="el-icon-close el-icon--right" @click="handleIconClickDel(i,j)"></i>
						</el-button>
					</div>
					<div style="margin-top: 10px;">
						<el-input placeholder="设置属性" v-model="testName" style="width: 120px;" size="mini"></el-input>
						<el-button size="mini" type="primary" style="margin-left: 5px;" @click="addType(item[i],i)">添加</el-button>
						<el-button size="mini" type="primary" style="margin-left: 5px;" @click="delType(i)" icon="el-icon-delete"></el-button>
					</div>
				</div>
				<div style="margin-top: 20px;">
					<el-button type="primary" @click="confirmAddType1" size="mini">提交规则</el-button>
				</div>
				<!-- <div style="width: 60%;margin: 20px auto;">
					<el-button v-if="showprice" type="primary" size="medium" style="width: 100%;" @click="ProduceGoods()">生成价格表</el-button>
				</div> -->
				<div v-for="(item,i) in ProduceGoodsList">
					<div style="display: flex;flex-wrap: wrap;">
						<span style="margin:0 10px;line-height: 30px;">{{item.goodsPropertyValue}}</span>
					</div>
					<div style="display: flex;flex-wrap: wrap;">
						<div style="">
							<span style="margin-left:10px;line-height: 30px;">金额：</span>
							<el-input v-model="item.goodsPropertyPrice" placeholder="金额" style="width: 100px;" size="mini">
							</el-input>
						</div>
						<div style="">
							<span style="margin-left:10px;line-height: 30px;">库存：</span>
							<el-input v-model="item.goodsPropertyStock" placeholder="库存" style="width: 100px;" size="mini">
							</el-input>
						</div>
						<div style="">
							<span style="margin-left:10px;line-height: 30px;">成本价：</span>
							<el-input v-model="item.goodsPropertyCost" placeholder="成本价" style="width: 100px;" size="mini">
							</el-input>
						</div>
						<div class="father1" @click="getIndex(i)">
							<el-upload :action="actionurl1+'/base/upload'" list-type="picture-card" class="upload-demo1" ref="upload4"
							 :multiple="true" :on-remove="handleRemove1" :on-preview="handlePictureCardPreview" :limit="1" :on-success="successUpload4"
							 :headers="httpheaders">
								<i class="el-icon-plus"></i>
							</el-upload>
							<el-dialog :visible.sync="dialogVisible" :append-to-body="true">
								<img width="100%" :src="dialogImageUrl" alt="">
							</el-dialog>
							<!-- <el-button size="mini" style="height: 30px;">删除</el-button> -->
						</div>
					</div>
				</div>
				<div style="margin-top: 10px;">
					<el-button v-if="ProduceGoodsList.length!=0" size="mini" type="primary" @click="confirmAddType('ruleconfirm')">提交价格表</el-button>
				</div>
			</div>

			<!-- <span slot="footer" class="dialog-footer">
				<el-button @click="centerDialogVisible = false">取 消</el-button>
			</span> -->
		</el-dialog>
		<!-- 选择分类对话框 -->
		<el-dialog title="选择分类" :visible.sync="chooseClass" width="50%" center>
			<div style="display:flex;margin-top: 20px;">
				<span style="width: 100px;height:40px;line-height: 40px;">分类：</span>
				<div style="width: 100%;">
					<el-cascader v-model="editname" :key="cascaderKey" :options="optionsList" :props="{label: 'sortName',value:'id',checkStrictly: true}"></el-cascader>
				</div>
			</div>
			<span slot="footer" class="dialog-footer">
				<el-button @click="chooseClass = false">取 消</el-button>
				<el-button type="primary" @click="confirmAddType('classConfirm')">确 定</el-button>
			</span>
		</el-dialog>
		<!-- 参数模板对话框 -->
		<el-dialog title="商品参数配置" :visible.sync="moduleDialogVisible" width="50%" center>
			<div v-for="(item,i) in goodsParams" style="display: flex;">
				<span style="margin-right: 10px;line-height: 30px;">属性名:</span>
				<span v-if="i!=edit" style="margin-right: 10px;line-height: 30px;width: 100px;display: block;">{{item.goodsParamName}}</span>
				<el-input v-if="i==edit" size="mini" v-model="goodsParamName1" style="width: 100px;margin-right: 10px;"></el-input>
				<span style="margin-right: 10px;line-height: 30px;">属性值:</span>
				<span v-if="i!=edit" style="margin-right: 10px;line-height: 30px;width: 100px;display: block;overflow: hidden;white-space: nowrap;text-overflow: ellipsis;">{{item.goodsParamValue}}</span>
				<el-input v-if="i==edit" size="mini" v-model="goodsParamValue1" style="width: 100px;margin-right: 10px;"></el-input>
				<el-button v-if="i!=edit" size="mini" icon="el-icon-edit" @click="updatetypename(i)"></el-button>
				<el-button v-if="i==edit" size="mini" icon="el-icon-success" @click="confirmUpdatetypename(i)"></el-button>
				<el-button size="mini" icon="el-icon-delete" @click="deltypename(i)"></el-button>
			</div>
			<div style="display: flex;margin-top: 10px;">
				<div style="display:flex;width: 40%;">
					<span style="margin-right: 10px;line-height: 30px;">属性名:</span>
					<el-input size="mini" v-model="goodsParamName" style="width: 200px;"></el-input>
				</div>
				<div style="display:flex;width: 40%;">
					<span style="margin-right: 10px;line-height: 30px;">属性值:</span>
					<el-input size="mini" v-model="goodsParamValue" style="width: 200px;"></el-input>
				</div>
				<div style="display:flex;width: 20%;">
					<el-button type="primary" size="mini" icon="el-icon-circle-plus" @click="addtypename"></el-button>
				</div>
			</div>
		</el-dialog>
		<el-container class="pagec">
			<el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="params.page"
			 :page-sizes="[30]" :page-size="params.pageSize" layout="total, sizes, prev, pager, next, jumper" :total="total"
			 v-show="showpage">
			</el-pagination>
		</el-container>
	</div>
</template>

<script>
	import {
		removeToken
	} from '@/utils/auth'
	import {
		queryGoods
	} from '@/api/product'
	import {
		getClassification
	} from '@/api/product'
	import {
		addGoods
	} from '@/api/product'
	import {
		updateGoods
	} from '@/api/product'
	import {
		delGoods
	} from '@/api/product'
	//商品属性接口
	import {
		addGoodsProperty
	} from '@/api/product'
	import {
		getGoodsProperty
	} from '@/api/product'
	import {
		addGoodsSize
	} from '@/api/product'
	import {
		delGoodsSize
	} from '@/api/product'
	import {
		delGoodsProperty
	} from '@/api/product'
	import {
		ProduceGoods
	} from '@/api/product'
	import {
		submitPriceList
	} from '@/api/product'
	import {
		delFile
	} from '@/api/product'
	import {
		getPriceList
	} from '@/api/product'
	import {
		getParamsTemplate
	} from '@/api/product'
	//商品参数模板
	import {
		getGoodsParams
	} from '@/api/product'
	import {
		addGoodsParam
	} from '@/api/product'
	import {
		updateGoodsParam
	} from '@/api/product'
	import {
		delGoodsParam
	} from '@/api/product'
	import {
		batchAddGoodsParam
	} from '@/api/product'
	import {
		goodsOnAndOff
	} from '@/api/product'
	import {
		getToken
	} from '@/utils/auth'
	export default {
		data() {
			return {
				actionurl: '',
				actionurl1: this.IMGURL.baseUrl1,
				url1: this.IMGURL.baseUrl,
				options: ['sss', '123', 'asd'],
				optionsHot:[{
					label:'否',
					value:'0'
				},{
					label:'是',
					value:'1'
				}],
				optionsNew:[{
					label:'否',
					value:0
				},{
					label:'是',
					value:1
				}],
				typename: '',
				typevalue: '',
				productData: [],
				value: '',
				switchinput: true,
				tableLoading: false,
				centerDialogVisible: false,
				typeDialogVisible: false,
				chooseClass: false,
				editname: '',
				editname1: null,
				cascaderKey: 0,
				optionsList: [],
				title: '',
				titletype: '',
				showzdytype: false,
				dialogImageUrl: '', //对话框中的图片上传
				dialogVisible: false,
				showpage: true,
				total: 0,
				//生成价格表字段
				priceParam: {
					goodsPropertyStock: '',
					goodsPropertySaleNum: '',
					goodsPropertyPrice: '',
					goodsPropertyImage: '',
					goodsPropertyCost: '',
				},
				httpheaders: {
					"Authorization": '',
				},
				//对话框中的添加字段
				params: {
					id: null,
					recommendImage: '',
					rotationImages: '',
					goodsDescription: '',
					goodsName: '',
					goodsIntroduce: '',
					goodsKeyword: '',
					goodsSortId: '',
					unitName: '',
					isHot: null,
					isBest: null,
					isNew: null,
					isDiscount: null,
					emailFree: null,
					giveIntegral: 0,
					emailPrice: 0,
					tgradio: '',
					goodsStatus: null,
					isDelete: null,
					goodsParams: [],
				},
				paramsProduct: {
					pageSize: 30,
					page: 1,
					goodsName:'',
					isHot:'',
					isBest:'',
					emailFree:'',
					isNew:'',
				},
				fileUrl: '../../../assets/p10.jpg',
				file: [],
				imgone1: false,
				imgone2: false,
				imgone3: false,
				postageinput: false,
				rulename: '',
				ruleList: [],
				ruleListOne: [],
				addTypeList: [],
				testName: '',
				files1: [],
				files2: [],
				files3: [],
				recommendList: [],
				rotationList: [],
				descriptionList: [],

				lineid: 0,
				fileList1: [],
				fileList2: [],
				fileList3: [],
				dialogImageUrl: '',
				ProduceGoodsList: [], //生成价格数组
				showprice: false,
				showprice1: false,
				moduleDialogVisible: false,
				goodsParams: [], //商品参数
				edit: -1,
				goodsParamName: '',
				goodsParamValue: '',
				goodsParamName1: '',
				goodsParamValue1: '',
				goodsId: '',
				goodsParamsModel: [],
				goodsOnAndOff: 0,
			}
		},

		methods: {
			handleSelectionChange(val) {
				console.log(val)
			},
			//删除产品
			delproduct(index, row) {
				// this.params.isDelete=1
				// this.params.id=row.id
				console.log(row)
				delGoods(row.id).then(res => {
					console.log(res)
					this.paramsProduct.page = 1
					this.selectAllProduct()
				})
			},
			handleCommand(command) {
				if (command == "ordersend") {
					this.title = "订单配送"
					this.width = '30%'
					this.changebutton = 0
					this.centerDialogVisible = true
				} else if (command == "orderremark") {
					this.title = "订单备注"
					this.width = '30%'
					this.changebutton = 1
					this.centerDialogVisible = true
				} else if (command == "orderupdate") {
					this.title = "订单修改"
					this.changebutton = 2
					this.width = '30%'
					this.centerDialogVisible = true
				} else if (command == "orderrecord") {
					this.width = '50%'
					this.title = "订单记录"
					this.changebutton = 3
					this.centerDialogVisible = true
				} else if (command == 'confirmgoods') {
					this.isReceive = true
					this.title = "确认收货"
					this.changebutton = 4
					this.width = '30%'
					this.centerDialogVisible = true
				} else if (command == 'orderrefund') {
					this.title = "订单退款"
					this.changebutton = 6
					this.width = '30%'
					this.centerDialogVisible = true
				}
			},
			//参数配置
			paramSet(index, row) {
				this.goodsId = row.id
				getGoodsParams(row.id).then(res => {
					console.log(res)
					this.goodsParams = res.data
				})
				this.edit = -1
				this.moduleDialogVisible = true
			},
			updatetypename(i) {
				this.edit = i
				this.goodsParamName1 = this.goodsParams[i].goodsParamName
				this.goodsParamValue1 = this.goodsParams[i].goodsParamValue
			},
			confirmUpdatetypename(i) {
				this.goodsParams[i].goodsParamName = this.goodsParamName1
				this.goodsParams[i].goodsParamValue = this.goodsParamValue1
				console.log(this.goodsParams[i])
				updateGoodsParam(this.goodsParams[i]).then(res => {
					console.log(res)
					this.edit = -1
				})
			},
			addtypename() {
				if (this.goodsParamName != '' && this.goodsParamValue != '') {
					addGoodsParam({
						goodsId: this.goodsId,
						goodsParamName: this.goodsParamName,
						goodsParamValue: this.goodsParamValue,
					}).then(res => {
						console.log(res)
						this.goodsParams.push({
							id: res.data,
							goodsId: this.goodsId,
							goodsParamName: this.goodsParamName,
							goodsParamValue: this.goodsParamValue,
						})
						this.goodsParamName = ''
						this.goodsParamValue = ''
					})
				} else {
					this.$message.warning('属性名或属性值不能为空')
				}
			},
			deltypename(i) {
				if (this.goodsParams.length > 1) {
					console.log(this.goodsParams[i].id)
					delGoodsParam(this.goodsParams[i].id).then(res => {
						console.log(res)
						this.goodsParams.splice(i, 1)
					})
				} else {
					this.$message.warning('至少需要一条属性')
				}
			},
			//邮费
			yfchange(id) {
				if (id == 1) {
					this.postageinput = false
				} else {
					this.postageinput = true
				}
			},
			//添加按钮
			addType(data, i) {
				console.log(this.lineid)
				if (this.testName != '') {
					this.addTypeList[i].goodsSizes.push({
						goodsId: this.params.id,
						goodsPropertyValue: this.testName,
					})
					// getGoodsProperty(this.params.id).then(res => {
					// 	console.log(res)
					// })
					// addGoodsSize({
					// 	goodsId: this.params.id,
					// 	goodsPropertyId: this.ruleList[i].id,
					// 	goodsPropertyValue: this.testName,
					// }).then(res => {
					// 	this.addTypeList[i].push({
					// 		goodsId: this.params.id,
					// 		goodsPropertyName: this.ruleList[i].goodsPropertyName,
					// 		goodsPropertyValue: this.testName,
					// 		id: res.data
					// 	})
					// 	// this.$set(this.addTypeList[i], 'id', res.data)
					// })
					console.log(this.addTypeList)
					this.testName = ''
					// setTimeout(() => {
					// 	this.testName = ''
					// }, 500);
				} else {
					this.$message.warning('属性值不能为空')
				}
			},
			//按钮删除属性
			delType(i) {
				// delGoodsProperty(this.ruleList[i].id).then(res => {
				// 	console.log(res)
				// })
				this.ruleList.splice(i, 1)
				this.addTypeList.splice(i, 1)
				console.log(this.ruleList)
				console.log(this.addTypeList)
			},
			//按钮删除规格
			handleIconClickDel(i, j) {
				console.log(this.addTypeList[i].goodsSizes[j])
				this.addTypeList[i].goodsSizes.splice(j, 1)
			},
			//生成价格表
			// ProduceGoods() {
			// 	this.showprice1 = true
			// 	ProduceGoods(this.params.id).then(res => {
			// 		for (var i = 0; i < res.data.length; i++) {
			// 			res.data[i].goodsId = this.params.id
			// 		}
			// 		this.ProduceGoodsList = res.data
			// 		console.log(this.ProduceGoodsList)
			// 	})
			// },
			//预览图片
			handlePictureCardPreview(file) {
				console.log(file)
				this.dialogImageUrl = file.url;
				this.dialogVisible = true;
			},
			//选择勾勾按钮
			handleIconClick(data, i) {
				this.showprice = true
				this.lineid = i
				if (data != undefined && data != '') {
					if (this.ruleListOne[i].classIcon == 'el-icon-close') {} else {
						// console.log(this.addTypeList)
						this.ruleList.push({
							goodsId: this.params.id,
							goodsPropertyName: data,
							goodsPropertyValue: ''
						})
						this.addTypeList.push({
							goodsId: this.params.id,
							goodsPropertyName: data,
							goodsSizes: []
						})
						console.log(this.addTypeList)
						this.$set(this.ruleListOne[i], 'classIcon', 'el-icon-close')
						// console.log(this.ruleList)
						// if (this.ruleList.length >= 1) {
						// 	this.addTypeList[i] = []
						// }
					}
				} else {
					this.$message.warning('请输入规则名称')
				}

			},
			//添加规则
			addrules() {
				this.ruleListOne.push({
					goodsId: this.params.id,
					goodsPropertyName: '',
					classIcon: 'el-icon-check'
				})
				console.log(this.ruleListOne)
			},
			confirmAddType1() {
				// console.log(this.ruleList)
				// console.log(this.addTypeList)
				addGoodsProperty(this.addTypeList).then(res => {
					console.log(res)
					if (res.code == 200) {
						this.$message.success('规则提交成功！')
						// this.typeDialogVisible = false
						this.ProduceGoodsList = res.data.data
					}
				})
			},
			//属性确认按钮
			confirmAddType(type) {
				if (type == 'classConfirm') {
					this.goodsParamsModel = []
					console.log(this.editname)
					if (this.editname.length != 0) {
						this.centerDialogVisible = true
						this.params.recommendImage = ''
						this.params.goodsDescription = ''
						this.params.rotationImages = ''
						if (this.editname.length > 0) {
							this.params.goodsSortId = this.editname[this.editname.length - 1]
						}
						console.log(this.params.goodsSortId)
					} else {
						this.$message.warning('请选择分类')
					}
					getParamsTemplate(this.params.goodsSortId).then(res => {
						console.log(res)
						for (var i = 0; i < res.data.length; i++) {
							this.goodsParamsModel.push({
								goodsParamName: res.data[i].goodsParamName,
								goodsParamValue: '',
							})
						}
					})
				} else if (type == 'addConfirm') {
					console.log(this.params.goodsName == '')
					console.log(this.files1)
					if (this.fileList1.length == 0) {
						this.$message.warning("请添加主图")
					} else if (this.fileList2.length == 0) {
						this.$message.warning("请添加轮播图")
					} else if (this.fileList3.length == 0) {
						this.$message.warning("请添加详情图")
					} else {
						if (this.params.goodsName == '') {
							this.$message.warning("请输入商品名称")
						} else {
							var self = this
							this.$refs.upload1.submit();
							this.$refs.upload2.submit();
							this.$refs.upload3.submit();
							let fd = new FormData();
							fd.append('goodsName', this.params.goodsName)
							fd.append('goodsIntroduce', this.params.goodsIntroduce)
							fd.append('goodsKeyword', this.params.goodsKeyword)
							fd.append('unitName', this.params.unitName)
							fd.append('isHot', this.params.isHot)
							fd.append('isBest', this.params.isBest)
							fd.append('isNew', this.params.isNew)
							fd.append('isDiscount', this.params.isDiscount)
							fd.append('emailFree', this.params.emailFree)
							fd.append('goodsSortId', this.params.goodsSortId)
							fd.append('giveIntegral', this.params.giveIntegral)
							fd.append('emailPrice', this.params.emailPrice)
							fd.append('goodsStatus', this.params.goodsStatus)
							this.files1.forEach(function(file) {
								fd.append('recommend', file, file.name); // 因为要上传多个文件，所以需要遍历一下才行
								//不要直接使用我们的文件数组进行上传，你会发现传给后台的是两个Object
							})
							this.files2.forEach(function(file) {
								fd.append('rotation', file, file.name); // 因为要上传多个文件，所以需要遍历一下才行
								//不要直接使用我们的文件数组进行上传，你会发现传给后台的是两个Object
							})
							this.files3.forEach(function(file) {
								fd.append('details', file, file.name); // 因为要上传多个文件，所以需要遍历一下才行
								//不要直接使用我们的文件数组进行上传，你会发现传给后台的是两个Object
							})
							addGoods(fd).then(res => {
								console.log(res)
								if (res.code == 200) {
									for (var i = 0; i < this.goodsParamsModel.length; i++) {
										this.goodsParamsModel[i].goodsId = res.data
									}
									this.centerDialogVisible = false
									this.chooseClass = false
									this.files1 = []
									this.files2 = []
									this.files3 = []
									self.params.goodsParams = []
									this.goodsParamsModel.forEach(function(param) {
										if (param.goodsParamValue != '') {
											self.params.goodsParams.push(param)
										}
									})
									if (self.params.goodsParams.length != 0) {
										batchAddGoodsParam(self.params.goodsParams).then(res => {
											console.log(res)
										})
									}
									this.selectAllProduct()
								}
							})
							this.clearfiles()
						}
					}

				} else if (type == 'editConfirm') {
					console.log(this.files1)
					if (this.params.goodsName == '') {
						this.$message.warning("请输入商品名称")
					} else {
						this.$refs.upload1.submit();
						this.$refs.upload2.submit();
						this.$refs.upload3.submit();
						let fd = new FormData();
						var goodsSortId=null
						if (this.editname1.length > 0) {
							goodsSortId = this.editname1[this.editname1.length - 1]
						}
						fd.append('goodsSortId', goodsSortId)
						fd.append('id', this.params.id)
						fd.append('goodsName', this.params.goodsName)
						fd.append('goodsIntroduce', this.params.goodsIntroduce)
						fd.append('goodsKeyword', this.params.goodsKeyword)
						fd.append('unitName', this.params.unitName)
						fd.append('isHot', this.params.isHot)
						fd.append('isBest', this.params.isBest)
						fd.append('isNew', this.params.isNew)
						fd.append('isDiscount', this.params.isDiscount)
						fd.append('emailFree', this.params.emailFree)
						// fd.append('goodsSortId', this.params.goodsSortId)
						fd.append('goodsStatus', this.params.goodsStatus)
						fd.append('giveIntegral', this.params.giveIntegral)
						fd.append('emailPrice', this.params.emailPrice)
						this.files1.forEach(function(file) {
							fd.append('recommend', file, file.name); // 因为要上传多个文件，所以需要遍历一下才行
							//不要直接使用我们的文件数组进行上传，你会发现传给后台的是两个Object
						})
						this.files2.forEach(function(file) {
							fd.append('rotation', file, file.name); // 因为要上传多个文件，所以需要遍历一下才行
							//不要直接使用我们的文件数组进行上传，你会发现传给后台的是两个Object
						})
						this.files3.forEach(function(file) {
							fd.append('details', file, file.name); // 因为要上传多个文件，所以需要遍历一下才行
							//不要直接使用我们的文件数组进行上传，你会发现传给后台的是两个Object
						})
						updateGoods(fd).then(res => {
							this.centerDialogVisible = false
							this.chooseClass = false
							this.files1 = []
							this.files2 = []
							this.files3 = []
							this.selectAllProduct()
						})
						this.clearfiles()
					}
				} else if (type == 'ruleconfirm') {
					submitPriceList(this.ProduceGoodsList).then(res => {
						console.log(res)
						if (res.code == 200) {
							this.$message.success('提交成功')
							this.typeDialogVisible = false
						}
					})

				}
			},
			//获取图片上传的index
			getIndex(i) {
				this.lineid = i
				console.log(i)
			},
			//图片上传
			successUpload4(response, file, fileList) {
				console.log(response)
				this.ProduceGoodsList[this.lineid].goodsPropertyImage = response.data
				console.log(this.ProduceGoodsList)
			},
			//删除图片
			handleRemove1(file, fileList) {
				delFile(this.ProduceGoodsList[this.lineid].goodsPropertyImage).then(res => {
					console.log(res)
				})
				console.log(this.ProduceGoodsList)
			},
			addproduct() {
				this.params.id = ''
				this.params.goodsName = ''
				this.params.goodsIntroduce = ''
				this.params.goodsKeyword = ''
				this.params.unitName = ''
				this.params.isHot = ''
				this.params.isBest = ''
				this.params.isNew = ''
				this.params.isDiscount = ''
				this.params.emailFree = ''
				this.params.goodsStatus = ''
				this.imgone1 = false
				this.imgone2 = false
				this.imgone3 = false
				this.title = "添加商品"
				this.chooseClass = true
				this.showzdytype = true
			},
			editproduct(index, row) {
				this.title = "编辑商品"
				this.showzdytype = false
				this.imgone1 = true
				this.imgone2 = true
				this.imgone3 = true
				console.log(row)
				this.params.id = row.id
				this.params.goodsName = row.goodsName
				this.params.goodsIntroduce = row.goodsIntroduce
				this.params.goodsKeyword = row.goodsKeyword
				this.params.unitName = row.unitName
				this.params.isHot = row.isHot
				this.params.isBest = row.isBest
				this.params.isNew = row.isNew
				this.params.isDiscount = row.isDiscount
				this.params.emailFree = row.emailFree
				this.params.goodsStatus = row.goodsStatus
				this.params.goodsSortId = row.goodsSortId
				this.recommendList = []
				this.rotationList = []
				this.descriptionList = []
				if (row.recommendImage != '' && row.recommendImage != null) {
					var m1 = row.recommendImage.split(",");
					for (var i = 0; i < m1.length; i++) {
						this.recommendList.push(this.url1 + m1[i])
					}
				}
				if (row.rotationImages != '' && row.rotationImages != null) {
					var m2 = row.rotationImages.split(",");
					for (var i = 0; i < m2.length; i++) {
						this.rotationList.push(this.url1 + m2[i])
					}
					console.log(this.rotationList)
				}
				if (row.goodsDescription != '' && row.goodsDescription != null) {
					var m3 = row.goodsDescription.split(",");
					for (var i = 0; i < m3.length; i++) {
						this.descriptionList.push(this.url1 + m3[i])
					}
				}
				console.log(this.optionsList)
				for (let i = 0; i < this.optionsList.length; i++) {
					if (this.optionsList[i].id == row.goodsSortId) {
						this.editname1 = [this.optionsList[i].id]
						console.log(this.editname1)
					}
					this.centerDialogVisible = true
				}
			},
			producttype(index, row) {
				this.ruleList = []
				this.ruleListOne = []
				this.addTypeList = []
				console.log(row)
				this.typeDialogVisible = true
				this.titletype = "属性"
				this.params.id = row.id
				getGoodsProperty(this.params.id).then(res => {
					console.log(res)
					this.ruleList = res.data
					if (this.ruleList.length == 0) {
						this.showprice = false
						this.showprice1 = false
					} else {
						this.showprice = true
						this.showprice1 = true
					}
					for (var i = 0; i < res.data.length; i++) {
						this.ruleListOne.push({
							goodsPropertyName: res.data[i].goodsPropertyName
						})
						this.addTypeList.push({
							goodsId: this.params.id,
							goodsPropertyName: res.data[i].goodsPropertyName,
							goodsSizes: []
						})
						if (res.data[i].goodsSizes) {
							for (var j = 0; j < res.data[i].goodsSizes.length; j++) {
								this.addTypeList[i].goodsSizes.push(res.data[i].goodsSizes[j])
								// this.ruleList.push(res.data[i].goodsSizes[j])
							}
						}
					}
				})
				getPriceList(this.params.id).then(res => {
					console.log(res)
					this.ProduceGoodsList = res.data
				})
				console.log(this.addTypeList)
			},
			confirm() {
				this.$message.success("点了确定")
			},
			//页码
			handleSizeChange(val) {
				this.paramsProduct.pageSize = val

			},
			handleCurrentChange(val) {
				this.paramsProduct.page = val
				this.selectAllProduct()
			},
			changeswitch(index, row, value) {
				console.log(value)
				console.log(row)
				goodsOnAndOff({
					id: row.id,
					goodsStatus: value,
				}).then(res => {
					console.log(res)
					// this.$message.success(res.msg)
					this.params.page = 1
					this.selectAllProduct()
				})
				// this.selectAllProduct()
				// if (value == 1) {
				// 	this.params.goodsStatus=value
				// 	updateGoods(this.params).then(res => {})
				// 	this.$message.success("上架成功！")
				// } else {
				// 	this.params.goodsStatus=value
				// 	updateGoods(this.params).then(res => {})
				// 	this.$message.success("下架成功！")
				// }
			},
			uploadFile1(files) {
				console.log(files)
				this.files1.push(files.file);
				console.log(this.files1)
			},
			uploadFile2(files) {
				console.log(files)
				this.files2.push(files.file);
			},
			uploadFile3(files) {
				console.log(files)
				this.files3.push(files.file);
			},
			//文件上传成功执行主图
			successUpload1(response, file, fileList) {
				this.centerDialogVisible = false
				this.params.recommendImage = this.params.recommendImage + response.data
			},
			//文件上传成功执行
			successUpload2(response, file, fileList) {
				this.centerDialogVisible = false
				this.params.rotationImages = this.params.rotationImages + response.data
			},
			//文件上传成功执行
			successUpload3(response, file, fileList) {
				this.centerDialogVisible = false
				this.params.goodsDescription = this.params.goodsDescription + response.data
			},
			handleRemove(file, fileList) {
				console.log(file, fileList);
			},
			beforeAvatarUpload(file) {
				const isJPG = file.raw.type === 'image/jpeg';
				const isLt2M = file.size / 1024 / 1024 < 2;
				return isJPG && isLt2M;
			},
			editchange1(file, fileList) {
				this.fileList1 = fileList
				console.log(fileList)
				this.imgone1 = false
			},
			editchange2(file, fileList) {
				this.fileList2 = fileList
				console.log(fileList)
				this.imgone2 = false
			},
			editchange3(file, fileList) {
				this.fileList3 = fileList
				console.log(fileList)
				this.imgone3 = false
			},
			//文件上传时执行主图
			// changeSuccess(response, file) {
			// 	this.imgone = true
			// 	for (var i = 0; i < file.length; i++) {
			// 		if (i == file.length - 1) {
			// 			if (this.beforeAvatarUpload(file[i])) {
			// 				this.imgone = true
			// 				this.params.recommend = file[i].url
			// 			} else {
			// 				this.$message.error('上传头像图片只能是 JPG 格式且小于两兆');
			// 			}
			// 		}
			// 	}
			// },
			// //文件上传时执行轮播图
			// changeSuccess1(response, file) {
			// 	this.imgone = true
			// 	this.params.rotation = []
			// 	for (var i = 0; i < file.length; i++) {
			// 		if (this.beforeAvatarUpload(file[i])) {
			// 			this.params.rotation.push(file[i].url)
			// 		} else {
			// 			this.$message.error('上传头像图片只能是 JPG 格式且小于两兆');
			// 		}
			// 	}
			// },
			// //文件上传时执行详细图
			// changeSuccess2(response, file) {
			// 	this.imgone = true
			// 	this.params.details = []
			// 	for (var i = 0; i < file.length; i++) {
			// 		if (this.beforeAvatarUpload(file[i])) {
			// 			this.params.details.push(file[i].url)
			// 		} else {
			// 			this.$message.error('上传头像图片只能是 JPG 格式且小于两兆');
			// 		}
			// 	}
			// },

			clearfiles() {
				this.$refs.upload1.clearFiles();
				this.$refs.upload2.clearFiles();
				this.$refs.upload3.clearFiles();
			},
			closeDialog() {
				this.clearfiles()
			},
			//查询商品信息
			selectAllProduct() {
				this.productData = []
				queryGoods(this.paramsProduct).then(res => {
					console.log(res)
					this.productData = res.data.list
					this.total = res.data.total
				})
				console.log(this.productData)
			},
			// 查询商品分类信息
			getGoodsSort() {
				this.optionsList = []
				getClassification().then(res => {
					for (let i = 0; i < res.data.length; i++) {
						this.optionsList.push(res.data[i])
					}
				})
			},
		},
		mounted() {
			this.selectAllProduct()
			this.getGoodsSort()
			this.httpheaders.Authorization = getToken()
			console.log(this.IMGURL)
		}

	}
</script>

<style scoped="scoped">
	.typetop {
		margin: 20px 20px;
	}

	.upload-demo /deep/ .el-upload--picture-card {
		width: 100px;
		height: 100px;
		line-height: 100px;
	}

	.upload-demo1 /deep/ .el-upload--picture-card {
		width: 60px;
		height: 30px;
		line-height: 30px;
	}

	.father /deep/ .el-upload-list--picture-card .el-upload-list__item {
		width: 100px;
		height: 100px;
		line-height: 100px;
	}

	.father1 /deep/ .el-upload-list--picture-card .el-upload-list__item {
		width: 60px;
		height: 30px;
		line-height: 30px;
	}

	.father1 {
		display: flex;
		margin: 0 5px;
	}

	.el-dialog {
		display: flex;
		flex-direction: column;
		margin: 0 !important;
		position: absolute;
		top: 50%;
		left: 50%;
		transform: translate(-50%, -50%);
		max-height: calc(100% - 30px);
		max-width: calc(100% - 30px);
	}

	.el-dialog .el-dialog__body {
		flex: 1;
		overflow: auto;
	}

	.el-radio {
		margin-right: 15px;
	}

	.el-radio__label {
		padding-left: 0;
	}

	.boxtype {
		width: 100%;
	}
</style>
