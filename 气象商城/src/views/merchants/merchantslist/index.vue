<template>
	<div class="app-container">
		<div class="typetop">
			商家搜索:
			<el-select size="medium" v-model="accounttype" filterable placeholder="账号状态">
				<el-option v-for="item in options" :key="item" :label="item" :value="item">
				</el-option>
			</el-select>
			<el-input size="medium" placeholder="请输入商家名" clearable style="width: 200px;margin-left: 10px;" v-model="merchantsname">
			</el-input>
			<el-button size="mini" type="primary" icon="el-icon-search" style="margin-left: 10px;">搜索</el-button>
		</div>
		<div style="display:flex;margin: 10px 0;">
			<span style="height:30px;line-height: 30px;margin-right: 20px;">审核状态:</span>
			<el-button size="small" @click="status(0)">全部</el-button>
			<el-button size="small" @click="status(1)">已通过</el-button>
			<el-button size="small" @click="status(2)">未通过</el-button>
			<el-button size="small" @click="status(3)">未审核</el-button>
			<el-button size="small" @click="status(4)">待审核</el-button>
		</div>
		<el-table :data="announceData" border style="width: 100%;margin-bottom: 10px;" height="710" max-height="780"
		 v-loading="tableLoading" element-loading-text="正在拼命加载中。。。。">
			<el-table-column prop="time" label="序号" min-width="8%" align="center"></el-table-column>
			<el-table-column prop="time" label="申请时间" min-width="30%" align="center" :sortable="'custom'"></el-table-column>
			<el-table-column prop="time" label="账号" min-width="9%" align="center"></el-table-column>
			<el-table-column prop="time" label="logo" min-width="9%" align="center"></el-table-column>
			<el-table-column prop="time" label="商家名" min-width="10%" align="center"> </el-table-column>
			<el-table-column prop="time" label="申请账号" min-width="25%" align="center"></el-table-column>
			<el-table-column prop="time" label="分配账号" min-width="17%" align="center"></el-table-column>
			<el-table-column prop="time" label="店铺名称" min-width="17%" align="center"></el-table-column>
			<el-table-column prop="timetime" label="审核状态" min-width="15%" align="center"></el-table-column>
			<el-table-column prop="time" label="开设地区" min-width="15%" align="center"></el-table-column>
			<el-table-column label="操作" min-width="30%" align="center">
				<template slot-scope="scope">
					<el-button size="mini" type="primary" @click="editlist(scope.$index, scope.row)">编辑</el-button>
					<el-button size="mini" type="success" @click="detailslist(scope.$index, scope.row)">详情</el-button>
					<el-button size="mini" type="danger" @click="auditlist(scope.$index, scope.row)">审核</el-button>
				</template>
			</el-table-column>
		</el-table>
		<el-dialog :title="title" :visible.sync="centerDialogVisible" width="40%" center @close='closeDialog'>
			<div style="display:flex;padding-left: 20px;margin-bottom: 10px;">
				<span style="height:30px;line-height: 30px;letter-spacing: 4px;">店铺名称:</span>
				<el-input v-model="params.orderNum" placeholder="请输入内容" style="width: 415px;margin-left: 5px;" size="mini"></el-input>
			</div>
			<div style="display:flex;padding-left: 20px;margin-bottom: 10px;">
				<span style="height:30px;line-height: 30px;letter-spacing: 4px;">店铺简介:</span>
				<el-input v-model="params.orderNum" placeholder="请输入内容" style="width: 415px;margin-left: 5px;" size="mini"></el-input>
			</div>
			<div style="display:flex;padding-left: 20px;margin-bottom: 10px;">
				<span style="height:30px;line-height: 30px;letter-spacing: 4px;">店铺介绍:</span>
				<el-input rows="3" type="textarea" v-model="params.orderNum" placeholder="请输入内容" style="width: 415px;margin-left: 5px;"
				 size="mini"></el-input>
			</div>
			<div style="display:flex;padding-left: 20px;margin-bottom: 5px;">
				<span style="height:30px;line-height: 30px;letter-spacing: 4px;">经营地址:</span>
				<el-select style="width: 100px;margin:0 5px;" size="mini" v-model="province" placeholder="省">
					<el-option v-for="item in provinceList" :key="item" :label="item" :value="item">
					</el-option>
				</el-select>
				<el-select style="width: 100px;margin-right: 5px;" size="mini" v-model="city" placeholder="市">
					<el-option v-for="item in cityList" :key="item" :label="item" :value="item">
					</el-option>
				</el-select>
				<el-select style="width: 100px;margin-right: 5px;" size="mini" v-model="area" placeholder="区">
					<el-option v-for="item in areaList" :key="item" :label="item" :value="item">
					</el-option>
				</el-select>
				<el-select style="width: 100px;margin-right: 5px;" size="mini" v-model="road" placeholder="街道">
					<el-option v-for="item in roadList" :key="item" :label="item" :value="item">
					</el-option>
				</el-select>
			</div>
			<div style="display:flex;padding-left: 20px;margin-bottom: 20px;">
				<el-input v-model="params.orderNum" placeholder="请输入内容" style="width: 415px;margin-left: 85px;" size="mini"></el-input>
			</div>
			<div style="display:flex;padding-left: 20px;margin-bottom: 10px;">
				<span style="height:30px;line-height: 30px;letter-spacing: 4px;">主要货源:</span>
				<el-radio-group v-if="details" v-model="radio" style="width: 415px;display: flex;flex-wrap:wrap;justify-content: space-between;">
					<el-radio :label="1" style="width: 25%;margin-bottom: 10px;">线下批发市场</el-radio>
					<el-radio :label="2" style="width: 25%;margin-bottom: 10px;">实体店拿货</el-radio>
					<el-radio :label="3" style="width: 25%;margin-bottom: 10px;">分销/代销</el-radio>
					<el-radio :label="4" style="width: 25%;margin-bottom: 10px;">自己生产</el-radio>
					<el-radio :label="5" style="width: 25%;margin-bottom: 10px;">工厂生产</el-radio>
					<el-radio :label="6" style="width: 25%;margin-bottom: 10px;">自由公司渠道</el-radio>
					<el-radio :label="7" style="width: 25%;">货源未定</el-radio>
				</el-radio-group>
				<span style="height:30px;line-height: 30px;" v-else>线下批发市场</span>
			</div>
			<div style="display:flex;padding-left: 20px;margin-bottom: 10px;">
				<span style="height:30px;line-height: 30px;letter-spacing: 4px;">联系方式:</span>
				<el-input v-if="details" v-model="params.orderNum" placeholder="请输入联系方式" style="width: 415px;margin-left: 5px;"
				 size="mini"></el-input>
				<span style="height:30px;line-height: 30px;" v-else>145451212544</span>
			</div>
			<div style="display:flex;padding-left: 20px;margin-bottom: 10px;">
				<span style="height:30px;line-height: 30px;letter-spacing: 4px;">经营内容:</span>
				<el-input v-if="details" v-model="params.orderNum" placeholder="请输入类型" style="width: 415px;margin-left: 5px;" size="mini"></el-input>
				<span style="height:30px;line-height: 30px;" v-else>鸡蛋猪皮卷</span>
			</div>
			<div style="display:flex;margin-top: 20px;" class="father">
				<span style="height:30px;line-height: 30px;margin-left: 20px;letter-spacing: 2px;">店铺LOGO:</span>
				<img :src="fileUrl" alt="" style="width: 100px;height: 100px;margin-right: 10px;">
				<!-- <img src="../../../assets/p10.jpg" alt="" style="width: 100px;height: 100px;margin-right: 10px;"> -->
				<el-upload v-if="details" action="#" :show-file-list="false" list-type="picture-card" class="upload-demo"
				 :on-remove="handleRemove" :auto-upload="false" :on-change="changeSuccess" ref="upload">
					<i class="el-icon-plus"></i>
				</el-upload>
			</div>
			<div style="display:flex;padding-left: 20px;margin-bottom: 10px;" v-if="!details1">
				<span style="height:30px;line-height: 30px;letter-spacing: 4px;">审核状态:</span>
				<span style="color: greenyellow;height:30px;line-height: 30px;">已通过</span>
			</div>
			<span slot="footer" class="dialog-footer" v-if="details">
				<el-button @click="centerDialogVisible = false">返 回</el-button>
				<el-button type="primary" @click="confirm">保 存</el-button>
			</span>
			<span slot="footer" class="dialog-footer" v-if="details2">
				<el-button type="primary" size="mini">审核通过</el-button>
				<el-button type="primary" size="mini" @click="auditFailed">审核失败</el-button>
				<el-button type="primary" size="mini">返回</el-button>
			</span>
		</el-dialog>
		<!-- 审核失败对话框 -->
		<el-dialog title="商家审核失败原因" :visible.sync="failedDialogVisible" width="40%" center @close='closeDialog'>
			<div style="margin:50px 0;display: flex;">
				<span>审核失败原因:</span>
				<el-input style="width: 80%;" type="textarea" v-model="params.orderNum" :rows="10" placeholder="请输入审核失败原因"></el-input>
			</div>
			<span slot="footer" class="dialog-footer">
				<el-button @click="failedDialogVisible = false">返 回</el-button>
				<el-button type="primary" @click="confirm">提 交</el-button>
			</span>
		</el-dialog>

	</div>
</template>

<script>
	import {
		AdminInfo
	} from '@/api/user'
	export default {

		data() {
			return {
				merchantsname: '',
				accounttype: '',
				options: ['已通过', '未通过', '已审核'],
				announceData: [{
					time: '555'
				}],
				tableLoading: false,
				title: '',
				params: {
					orderNum: ''
				},
				centerDialogVisible: false,
				failedDialogVisible: false,
				// 地区选择
				province: '',
				provinceList: '',
				city: '',
				cityList: '',
				area: '',
				areaList: '',
				road: '',
				roadList: '',
				radio: 1,
				fileUrl: '../../../assets/p10.jpg',
				details: false,
				details1: false,
				details2: false,
				file: []
			}
		},
		watch: {},
		// mounted() {
		// 	console.log(this.fileUrl)
		// },
		methods: {
			selectannounce() {
				getInfo("123").then(res => {
					console.log("111")
				})
			},
			handleRemove(file, fileList) {
				console.log(file, fileList);
			},
			//文件上传时执行
			changeSuccess(response, file) {
				this.file = file
				for (var i = 0; i < file.length; i++) {
					if (i == file.length - 1) {
						this.fileUrl = file[i].url
					}
				}
				console.log(file)
			},
			// 
			clearfiles() {
				this.$refs.upload.clearFiles();
			},
			confirm() {

			},
			closeDialog() {
				if (this.file.length != 0) {
					this.clearfiles()
					this.file = []
				}
			},
			detailslist(index, row) {
				this.details = false
				this.details1 = false
				this.details2 = false
				this.title = "商家详细信息"
				this.centerDialogVisible = true
			},
			editlist(index, row) {
				this.details = true
				this.details1 = true
				this.details2 = false
				this.title = "编辑"
				this.centerDialogVisible = true
			},
			auditlist(index, row) {
				this.details = false
				this.details1 = true
				this.details2 = true
				this.title = "审核商家"
				this.centerDialogVisible = true
			},
			// 审核失败
			auditFailed() {
				this.centerDialogVisible=false
				this.failedDialogVisible = true
			}

		}
	}
</script>
<style scoped="scoped">
	.el-dialog__header {
		border-bottom: 1px solid black;
		text-align: left;
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
</style>
