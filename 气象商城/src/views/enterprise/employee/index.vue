<template>
	<div class="app-container">
		<div style="background: white;margin-bottom: 10px;padding: 10px;box-shadow: 0px 5px 10px rgba(0, 0, 0, 0.1);">
			<div style="border-bottom:1px solid #f6f6f6;padding: 10px;">
				搜索条件
			</div>
			<div style="display:flex;padding-left: 20px;margin: 10px 0;">
				<el-button size="mini" type="primary" icon="el-icon-search" style="margin-left: 10px;" @click="selectEnterprise">查询</el-button>
				<!-- <el-button size="mini" type="primary" style="margin-left: 10px;" @click="addnews">添加广告</el-button> -->
			</div>
		</div>
		<el-table :data="announceData" border style="width: 100%;margin-bottom: 10px;" height="710" max-height="780"
		 v-loading="tableLoading" element-loading-text="正在拼命加载中。。。。">
			<el-table-column prop="nickname" label="员工昵称" min-width="15%" align="center"></el-table-column>
			<el-table-column label="员工头像" min-width="9%" align="center">
				<template slot-scope="scope">
					<viewer>
						<img :src="url+scope.row.userHeadImage" style="width: 50px;height: 50px;" alt="用户头像">
					</viewer>
				</template>
			</el-table-column>
			<el-table-column prop="signature" label="员工签名" min-width="30%" align="center"></el-table-column>
			<el-table-column prop="staffLevelId" label="员工等级" min-width="15%" align="center"></el-table-column>
			<el-table-column label="操作" min-width="15%" align="center">
				<template slot-scope="scope">
					<el-button size="mini" type="primary" @click="grade(scope.$index, scope.row)">等级设置</el-button>
					<el-button size="mini" type="primary" @click="expel(scope.$index, scope.row)">开除</el-button>
				</template>
			</el-table-column>
		</el-table>
		<el-pagination @current-change="handleCurrentChange" :current-page="pageNo" :page-sizes="[20]" layout="total, sizes, prev, pager, next, jumper"
		 :total="total">
		</el-pagination>
		<el-dialog :title="title" :visible.sync="centerDialogVisible" width="25%" center @close="closeDialog">
			<div style="display:flex;padding-left: 20px;margin-bottom: 20px;">
				<span style="height:40px;line-height: 40px;letter-spacing: 4px;">员工昵称:</span>
				<el-input v-model="nickname" :disabled="true" placeholder="员工昵称" style="width: 300px;margin-left: 5px;height:40px;line-height: 40px;"></el-input>
			</div>
			<div style="display:flex;padding-left: 20px;margin-bottom: 20px;">
				<span style="height:40px;line-height: 40px;letter-spacing: 4px;margin-right: 5px;">员工等级:</span>
				<el-select style="height:40px;line-height: 40px;" size="mini" v-model="params.staffLevelId" placeholder="员工等级">
					<el-option v-for="item in options" :key="item" :label="item" :value="item">
					</el-option>
				</el-select>
			</div>
			<div style="display:flex;margin: 10px 100px;">
				<el-button @click="centerDialogVisible = false">取 消</el-button>
				<el-button type="primary" @click="confirm()">确 定</el-button>
			</div>
		</el-dialog>
		<!-- 删除弹框 -->
		<el-dialog :visible.sync="delDialogVisible" width="30%" center>
			<div style="width: 60px;margin: 20px auto;">
				<img src="../../../assets/warning.png" style="width: 60px;height: 60px;" alt="">
			</div>
			<div style="width: 50%;margin: 20px auto;text-align: center;">
				<span style="color: red;font-weight: 800;font-size: 15px;">确认开除该员工？</span>
			</div>
			<div style="height: 20px;">
				<el-button @click="delDialogVisible = false" style="float: right;">取 消</el-button>
				<el-button type="danger" @click="delconfirm" style="float: right;margin-right: 10px;">确认</el-button>
			</div>
		</el-dialog>
	</div>
</template>

<script>
	import {
		getStaffs
	} from '@/api/enterprise'
	import {
		setStaffLevel
	} from '@/api/enterprise'
	
	import {
		expelStaff
	} from '@/api/enterprise'
	export default {

		data() {
			return {
				url: this.IMGURL.baseUrl,
				pageNo: 1,
				announceData: [],
				tableLoading: false,
				title: '',
				params: {
					id: null,
					staffLevelId: null
				},
				options: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25],
				nickname: '',
				centerDialogVisible: false,
				delDialogVisible: false,
				total: null,
				paramsExpel:{
					id:null,
					staffId:null,
				}
			}
		},
		watch: {},
		mounted() {
			console.log(this.url)
		},
		methods: {
			//查询表格数据
			selectEnterprise() {
				getStaffs(this.pageNo).then(res => {
					console.log(res)
					this.announceData = res.data.list
				})
			},
			//设置等级
			grade(index, row) {
				this.title = "审核"
				this.params.id = row.id
				this.nickname = row.nickname
				this.params.staffLevelId=row.staffLevelId
				this.centerDialogVisible = true
			},
			//开除员工
			expel(index, row){
				this.paramsExpel.id = row.id
				this.paramsExpel.staffId=row.staffId
				this.delDialogVisible = true
			},
			delconfirm(){
				expelStaff(this.paramsExpel).then(res => {
					console.log(res)
					this.delDialogVisible = false
					this.selectEnterprise()
				})
			},
			handleCurrentChange(val) {
				console.log(val)
				this.pageNo = val
				this.selectEnterprise()
			},
			closeDialog() {
				this.params.reviewStatus = null
			},
			confirm() {
					setStaffLevel(this.params).then(res => {
						console.log(res)
						this.centerDialogVisible = false
						this.selectEnterprise()
					})
			}
		}
	}
</script>
