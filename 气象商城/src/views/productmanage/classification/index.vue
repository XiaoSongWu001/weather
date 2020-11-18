<template>
	<div>
		<div class="typetop">
			<!-- 所有分类:
			<el-select size="mini" v-model="value" filterable placeholder="请选择">
				<el-option v-for="item in options" :key="item" :label="item" :value="item">
				</el-option>
			</el-select>
			<el-input size="mini" placeholder="请输入内容" clearable style="width: 200px;margin-left: 10px;" v-model="inputtext">
			</el-input> -->
			<el-button size="mini" type="primary" icon="el-icon-search" style="margin-left: 10px;">搜索</el-button>
			<el-button size="mini" type="primary" style="margin-left: 10px;" @click="addClassification">添加分类</el-button>
		</div>
		<el-container>
			<el-table :data="productData" border style="width: 100%;margin-bottom: 10px;" height="710" max-height="780"
			 v-loading="tableLoading" element-loading-text="正在拼命加载中。。。。" row-key="id" lazy :tree-props="{hasChildren: 'hasChildren'}">
				<el-table-column prop="sortName" label="分类名称" min-width="10%" align="center"></el-table-column>
				<el-table-column prop="orderTag" label="排序号" min-width="8%" align="center"></el-table-column>
				<el-table-column prop="sortImage" label="分类图标" min-width="10%" align="center">
					<template slot-scope="scope">
						<img v-if="scope.row.sortImage!=null&&scope.row.sortImage!=''" :src="url1+scope.row.sortImage"
						 style="width: 30px;height: 30px;float: left;" />
					</template>
				</el-table-column>
				<el-table-column prop="addTime" label="创建时间" min-width="15%" align="center"></el-table-column>
				<el-table-column prop="recommendTag" label="是否推荐" min-width="17%" align="center">
					<template slot-scope="scope">
						<span v-if="scope.row.isValid=== 1">
							<el-tag type="success" disable-transitions>是</el-tag>
						</span>
						<span v-else>
							<el-tag type="danger" disable-transitions>否</el-tag>
						</span>
					</template>
				</el-table-column>
				<el-table-column label="操作" min-width="30%" align="center">
					<template slot-scope="scope">
						<el-button size="mini" type="primary" @click="editproduct(scope.$index, scope.row)">编辑</el-button>
						<el-button size="mini" type="primary" @click="moduleSets(scope.$index, scope.row)">模板配置</el-button>
						<!-- <el-button size="mini" type="primary" @click="deleteproduct(scope.$index, scope.row)">删除</el-button> -->
					</template>
				</el-table-column>
			</el-table>
		</el-container>
		<el-dialog title="参数模板" :visible.sync="moduleDialogVisible" width="30%" center @close="closeDialog">
			<div v-for="(item,i) in goodsParams" style="display: flex;">
				<span style="margin-right: 10px;line-height: 30px;">属性名:</span>
				<span v-if="i!=edit" style="margin-right: 10px;line-height: 30px;width: 100px;display: block;">{{item.goodsParamName}}</span>
				<el-button v-if="i!=edit" size="mini" icon="el-icon-edit" @click="updatetypename(i)"></el-button>
				<el-input v-if="i==edit"  size="mini" v-model="goodsParamName1" style="width: 100px;margin-right: 10px;"></el-input>
				<el-button v-if="i==edit"  size="mini" icon="el-icon-success" @click="confirmUpdatetypename(i)"></el-button>
				<el-button size="mini" icon="el-icon-delete" @click="deltypename(i)"></el-button>
			</div>
			<div style="display: flex;margin-top: 10px;">
				<div style="display:flex;width: 50%;">
					<span style="margin-right: 10px;line-height: 30px;">属性名:</span>
					<el-input size="mini" v-model="goodsParamName" style="width: 200px;"></el-input>
				</div>
				<!-- <div style="display:flex;width: 33%;">
					<span style="margin-right: 10px;line-height: 30px;">属性值:</span>
					<el-input size="mini" v-model="item.goodsParamValue" style="width: 200px;"></el-input>
				</div> -->
				<div style="display:flex;width: 50%;">
					<el-button type="primary" size="mini" icon="el-icon-circle-plus" @click="addtypename"></el-button>
				</div>
			</div>
		</el-dialog>
		<el-dialog :title="title" :visible.sync="centerDialogVisible" width="30%" center @close="closeDialog">
			<div style="display:flex;margin-top: 20px;">
				<span style="width: 100px;height:40px;line-height: 40px;">分类名称</span>
				<el-input v-model="params.sortName" placeholder="请输入内容" style=""></el-input>
			</div>
			<div style="display:flex;margin-top: 20px;">
				<span style="width: 100px;height:40px;line-height: 40px;">排序号</span>
				<el-input v-model="params.orderTag" style=""></el-input>
			</div>
			<div style="display:flex;margin-top: 20px;">
				<span style="width: 100px;height:40px;line-height: 40px;">父级</span>
				<div style="width: 100%;">
					<el-cascader v-model="editname" :placeholder="showname" :key="cascaderKey" :options="optionsList" :props="{label: 'sortName',value:'id',checkStrictly: true}"></el-cascader>
				</div>
			</div>
			<div style="display:flex;margin-top: 20px;" class="father">
				<span style="margin-right: 10px;height:40px;line-height: 40px;letter-spacing: 2px;">分类图标:</span>
				<img v-if="imgone" :src="file" alt="" style="width: 100px;height: 100px;margin-right: 10px;">
				<el-upload  v-if="title=='编辑'" :action="action1+'/commodity/updateGoodsSort'" :show-file-list="false"
				 list-type="picture-card" class="upload-demo" :auto-upload="false" :on-change="changeSuccess" ref="upload" :data="params"
				 :multiple="false" :on-success="successUpload" :headers="httpheaders">
					<i class="el-icon-plus"></i>
				</el-upload>
				<el-upload  v-if="title=='添加分类'" :action="action1+'/commodity/addGoodsSort'" :show-file-list="false"
				 list-type="picture-card" class="upload-demo" :auto-upload="false" :on-change="changeSuccess" ref="upload" :data="params"
				 :multiple="false" :on-success="successUpload" :headers="httpheaders">
					<i class="el-icon-plus"></i>
				</el-upload>
			</div>
			<!-- <div style="display:flex;margin-top: 20px;">
				<span style="width: 100px;height:40px;line-height: 40px;">是否可用</span>
				<el-radio v-model="params.radio" label="1" style="height:40px;line-height: 40px;">是</el-radio>
				<el-radio v-model="params.radio" label="0" style="height:40px;line-height: 40px;">否</el-radio>
			</div> -->

			<span slot="footer" class="dialog-footer">
				<el-button @click="centerDialogVisible = false">取 消</el-button>
				<el-button type="primary" @click="confirmEdit('编辑')" v-if="title=='编辑'">确 定</el-button>
				<el-button type="primary" @click="confirmEdit('添加分类')" v-if="title=='添加分类'">确 定</el-button>
			</span>
		</el-dialog>

		<el-container class="pagec">
			<el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="params.page"
			 :page-size="params.page_size" layout="total, sizes, prev, pager, next, jumper" :total="total">
			</el-pagination>
		</el-container>
	</div>
</template>

<script>
	import {
		getParamsTemplate
	} from '@/api/product'
	import {
		getClassification
	} from '@/api/product'
	import {
		updateGoodsSort
	} from '@/api/product'
	import {
		addGoodsSort
	} from '@/api/product'
	import {
		addParamsTemplate
	} from '@/api/product'
	import {
		updateParamsTemplate
	} from '@/api/product'
	import {
		delParamsTemplate
	} from '@/api/product'
	import {
		delGoodsSort
	} from '@/api/product'
	import { getToken } from '@/utils/auth'
	export default {
		data() {
			return {
				url1: this.IMGURL.baseUrl,
				action1:this.IMGURL.baseUrl1,
				options: ['sss', '123', 'asd'],
				inputtext: '',
				productData: [],
				value: '',
				switchinput: true,
				tableLoading: false,
				title: '',
				centerDialogVisible: false,
				cascaderKey: 0,
				optionsList: [],
				goodsParams: [{
					id: null,
					goodsId: null,
					goodsParamName: '',
				}],
				goodsParamName:'',
				goodsParamName1:'',
				goodsSortId:'',
				params: {
					id: '',
					pid: '',
					sortName: '',
					// recommendTag:'',
					orderTag: '',
					file: '',
				},
				edit:-1,
				editname: '',
				// radio: '',
				imgone: false,
				showname: '',
				params1: {
					page_size: 10,
					page: 0
				},
				total: 0,
				httpheaders: {
					// 'Content-Type': 'multipart/form-data',
					"Authorization":'',
				},
				formData: {},
				file: '',
				tableimg: '',
				moduleDialogVisible:false,
			}
		},

		methods: {
			//页码
			handleSizeChange(val) {
				this.params.page_size = val
			},
			handleCurrentChange(val) {
				this.params.page = val
			},
			//删除商品
			deleteproduct(index,row) {
				delGoodsSort(row.id).then(res => {
				})
				this.selectAllmenu()
			},
			beforeAvatarUpload(file) {
				const isJPG = file.raw.type === 'image/jpeg';
				const isLt2M = file.size / 1024 / 1024 < 2;
				return isJPG && isLt2M;
			},
			//文件上传时执行
			changeSuccess(response, file) {
				for (let i = 0; i < file.length; i++) {
					if (i == file.length - 1) {
						console.log(this.beforeAvatarUpload(file[i]))
						if (this.beforeAvatarUpload(file[i])) {
							this.imgone = true
							this.params.file = file[i].url
							this.file = file[i].url
						} else {
							this.$message.error('上传头像图片只能是 JPG 格式且小于两兆');
						}
					}
				}
			},
			clearfiles() {
				this.$refs.upload.clearFiles();
			},
			closeDialog() {
				if (this.file.length != 0) {
					this.clearfiles()
					this.file = []
				}
				this.orderNum = 0
				this.id = ''
				this.sortName = ''
				this.editname = ''
			},
			//编辑商品分类
			editproduct(index, row) {
				this.imgone=true
				this.params.sortName = row.sortName
				this.params.orderTag = row.orderTag
				this.params.id = row.id
				this.params.pid = row.pid
				this.params.file=this.url1+row.sortImage
				this.file=this.url1+row.sortImage
				console.log(this.params.file)
				this.title = "编辑"
				this.centerDialogVisible = true
				console.log(index)
				console.log(row)
				if (row.pid == 0) {
					this.editname = ['0']
					this.showname = '顶级目录'
					console.log(this.editname)
				} else {
					for (let i = 0; i < this.productData.length; i++) {
						if (this.productData[i].id == row.pid) {
							this.showname = this.productData[i].sortName
							this.editname = [this.productData[i].id]
						}
					}
				}
			},
			moduleSets(index,row){
				console.log(row)
				this.goodsSortId=row.id
				getParamsTemplate(row.id).then(res => {
					console.log(res)
					this.goodsParams=res.data
				})
				this.edit=-1
				this.moduleDialogVisible=true
			},
			updatetypename(i){
				this.edit=i
				this.goodsParamName1=''
			},
			confirmUpdatetypename(i){
				this.goodsParams[i].goodsParamName=this.goodsParamName1
				// console.log(this.goodsParams[i])
				updateParamsTemplate(this.goodsParams[i]).then(res => {
					console.log(res)
					this.edit=-1
				})
			},
			addtypename() {
				if(this.goodsParamName!=''){
					addParamsTemplate({
						goodsSortId:this.goodsSortId,
						goodsParamName:this.goodsParamName
					}).then(res => {
						console.log(res)
						this.goodsParams.push({
							id: res.data,
							goodsId: this.goodsSortId,
							goodsParamName: this.goodsParamName,
						})
						this.goodsParamName=''
					})
				}else{
					this.$message.warning('属性名不能为空')
				}
				
				
			},
			deltypename(i) {
				if (this.goodsParams.length > 1) {
					console.log(this.goodsParams[i].id)
					delParamsTemplate(this.goodsParams[i].id).then(res => {
						this.goodsParams.splice(i, 1)
					})
				} else {
					this.$message.warning('至少需要一条属性')
				}
			},
			//修改确定按钮
			confirmEdit(type) {
				if(type=="编辑"){
					this.$refs.upload.submit();
					// updateGoodsSort(this.params).then(res => {
					// 	console.log(res)
					// })
					// this.centerDialogVisible = false
					// this.$message.success('修改成功');
					// this.selectAllmenu()
				} 
				else if(type=="添加分类"){
					if (this.editname.length > 0) {
						this.params.pid = this.editname[this.editname.length - 1]
					}
					if(this.params.file!=''){
						this.$refs.upload.submit();
					}else{
						this.$message.warning('请选择分类图标')
					}
					
				// 	console.log(this.valueString)
					
				// 	addGoodsSort(this.params).then(res => {
				// 		console.log(res)
				// 	})
				// 	this.centerDialogVisible = false
				// 	this.$message.success('添加成功');
				// 	this.selectAllmenu()
					
				}
				
			},
			successUpload(){
				this.centerDialogVisible = false
				this.selectAllmenu()
			},
			//添加商品分类
			addClassification() {
				this.imgone=false
				this.title = "添加分类"
				this.params.sortName = ''
				this.params.orderTag = ''
				this.params.id = ''
				this.params.pid = ''
				this.centerDialogVisible = true
			},
			confirm() {

			},
			//查询所有分类菜单
			selectAllmenu() {
				this.productData=[]
				this.optionsList=[]
				var arr = {
					sortName: '顶级目录',
					id: '0'
				}
				this.optionsList.push(arr)
				getClassification().then(res => {
					for (let i = 0; i < res.data.length; i++) {
						res.data[i].addTime = this.formatDate(res.data[i].addTime)
						if(res.data[i].children!=null){
							if(res.data[i].children.constructor===Array){
								for (var j = 0; j < res.data[i].children.length; j++) {
									res.data[i].children[j].addTime = this.formatDate(res.data[i].children[j].addTime)
								}
							}
						}
					}
					this.productData = res.data
					for (let i = 0; i < res.data.length; i++) {
						this.optionsList.push(res.data[i])
					}
				})
			},
			formatDate(date) {
				var date = new Date(date);
				var y = date.getFullYear();
				var m = date.getMonth() + 1;
				var d = date.getDate();
				var h = date.getHours();
				var mi = date.getMinutes();
				m = m > 9 ? m : '0' + m;
				return y + '-' + m + '-' + d + ' ' + h + ':' + mi;
			},
		},
		mounted() {
			this.selectAllmenu()
			console.log(getToken())
			this.httpheaders.Authorization=getToken()
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

	.father /deep/ .el-upload-list--picture-card .el-upload-list__item {
		width: 100px;
		height: 100px;
		line-height: 100px;
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
</style>
