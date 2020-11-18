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
			<el-table-column prop="nickname" label="员工昵称" min-width="15%" align="center" :sortable="'custom'"></el-table-column>
			<el-table-column label="用户头像" min-width="30%" align="center">
				<template slot-scope="scope">
					<viewer>
						<img :src="url+scope.row.userHeadImage" style="width: 50px;height: 50px;" alt="正面">
					</viewer>
					<!-- {{url+(scope.row.idcardImages.split(","))[0]}} -->
				</template>
			</el-table-column>
			<el-table-column prop="signature" label="用户签名" min-width="17%" align="center"></el-table-column>
			<el-table-column label="操作" min-width="15%" align="center">
				<template slot-scope="scope">
					<el-button size="mini" type="primary" @click="audit(scope.$index, scope.row)">审核</el-button>
				</template>
			</el-table-column>
		</el-table>
		<el-pagination @current-change="handleCurrentChange" :current-page="pageNo" :page-sizes="[20]" layout="total, sizes, prev, pager, next, jumper"
		 :total="total">
		</el-pagination>
		<el-dialog :title="title" :visible.sync="centerDialogVisible" width="40%" center>
			<div style="display:flex;padding-left: 20px;margin-bottom: 20px;">
				<span style="height:40px;line-height: 40px;letter-spacing: 4px;">员工名:</span>
				<el-input v-model="nickname" :disabled="true" placeholder="公司名称" style="width: 300px;margin-left: 5px;height:40px;line-height: 40px;"></el-input>
			</div>
			<div style="display:flex;padding-left: 20px;margin-bottom: 20px;">
				<span style="height:40px;line-height: 40px;">审核状态:</span>
				<el-radio v-model="params.res" :label="0" style="margin-left: 10px;height:40px;line-height: 40px;">未通过</el-radio>
				<el-radio v-model="params.res" :label="1" style="height:40px;line-height: 40px;">通过</el-radio>
			</div>
			<span slot="footer" class="dialog-footer">
				<el-button @click="centerDialogVisible = false">取 消</el-button>
				<el-button type="primary" @click="confirm">确 定</el-button>
			</span>
		</el-dialog>
	</div>
</template>

<script>
	import {
		getJoinCompanyInfo
	} from '@/api/enterprise'
	import {
		examineJoinCompanyInfo
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
					res: null,
					id: null,
				},
				nickname: '',
				centerDialogVisible: false,
				total: null,
			}
		},
		watch: {},
		mounted() {
			console.log(this.url)
		},
		methods: {
			//查询表格数据
			selectEnterprise() {
				this.announceData = []
				getJoinCompanyInfo(this.pageNo).then(res => {
					console.log(res)
					this.announceData=res.data.list
					// for (var i = 0; i < res.data.examines.length; i++) {
					// 	var image = res.data.examines[i].idcardImages.split(",")
					// 	console.log(image)
					// 	this.$set(res.data.examines[i], 'imagesPositive', image[0])
					// 	this.$set(res.data.examines[i], 'imagesReverse', image[1])
					// 	this.announceData.push(res.data.examines[i])
					// }
					this.total = res.data.recordNum
					console.log(this.announceData)
				})
			},
			audit(index,row) {
				this.title = "审核"
				this.params.id=row.id
				this.nickname=row.nickname
				this.centerDialogVisible = true
			},
			handleCurrentChange(val) {
				console.log(val)
				this.pageNo = val
				this.selectEnterprise()
			},
			confirm() {
				examineJoinCompanyInfo(this.params).then(res => {
					console.log(res)
					this.centerDialogVisible = false
					this.selectEnterprise()
				})
			}
		}
	}
</script>
