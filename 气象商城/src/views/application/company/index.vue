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
			<el-table-column label="公司性质" min-width="10%" align="center">
				<template slot-scope="scope">
					<span v-if="scope.row.companyNature==0">普通企业</span>
					<span v-else-if="scope.row.companyNature==1">政府企业</span>
					<span v-else>求助中心</span>
				</template>
			</el-table-column>
			<el-table-column prop="companyName" label="公司名称" min-width="15%" align="center" :sortable="'custom'"></el-table-column>
			<el-table-column prop="businessNum" label="营业执照号" min-width="9%" align="center">
				<template slot-scope="scope">
				<viewer>
					<img :src="url+scope.row.businessLicense" style="width: 50px;height: 50px;" alt="正面">
				</viewer>
				</template>
			</el-table-column>
			<el-table-column prop="idcardName" label="申请人姓名" min-width="9%" align="center"></el-table-column>
			<el-table-column prop="idcardNum" label="申请人证件号" min-width="15%" align="center"> </el-table-column>
			<el-table-column prop="idcardImages" label="身份证照" min-width="30%" align="center">
				<template slot-scope="scope">
					<viewer>
						<img :src="url+scope.row.imagesPositive" style="width: 50px;height: 50px;" alt="正面">
						<img :src="url+scope.row.imagesReverse" style="width: 50px;height: 50px;" alt="反面">
					</viewer>
					<!-- {{url+(scope.row.idcardImages.split(","))[0]}} -->
				</template>
			</el-table-column>
			<el-table-column prop="companyAddr" label="公司地址" min-width="17%" align="center"></el-table-column>
			<el-table-column label="操作" min-width="15%" align="center">
				<template slot-scope="scope">
					<el-button size="mini" type="primary" @click="audit(scope.$index, scope.row)">审核</el-button>
				</template>
			</el-table-column>
		</el-table>
		<el-pagination @current-change="handleCurrentChange" :current-page="pageNo" :page-sizes="[20]" layout="total, sizes, prev, pager, next, jumper"
		 :total="total">
		</el-pagination>
		<el-dialog :title="title" :visible.sync="centerDialogVisible" width="25%" center @close="closeDialog">
			<div style="display:flex;padding-left: 20px;margin-bottom: 20px;">
				<span style="height:40px;line-height: 40px;letter-spacing: 4px;">公司名:</span>
				<el-input v-model="companyName" :disabled="true" placeholder="公司名称" style="width: 300px;margin-left: 5px;height:40px;line-height: 40px;"></el-input>
			</div>
			<div style="display:flex;padding-left: 20px;margin-bottom: 20px;">
				<span style="height:40px;line-height: 40px;">审核状态:</span>
				<el-radio v-model="params.reviewStatus" :label="0" style="margin-left: 10px;height:40px;line-height: 40px;">未通过</el-radio>
				<el-radio v-model="params.reviewStatus" :label="1" style="height:40px;line-height: 40px;">通过</el-radio>
			</div>
			<div style="display:flex;margin: 10px 100px;">
				<el-button @click="centerDialogVisible = false">取 消</el-button>
				<el-button type="primary" @click="confirm('success')">确 定</el-button>
			</div>
			<!-- <span slot="footer" class="dialog-footer">
				<el-button @click="centerDialogVisible = false">取 消</el-button>
				<el-button type="primary" @click="confirm('success')">确 定</el-button>
			</span> -->
		</el-dialog>
		<!-- 审核失败对话框 -->
		<el-dialog :visible.sync="failedDialogVisible" width="40%" center>
			<div style="display: flex;">
				<span>原因:</span>
				<el-input style="width: 80%;" type="textarea" v-model="params.failReason" :rows="10" placeholder="请输入审核失败原因"></el-input>
			</div>
			<span slot="footer" class="dialog-footer">
				<el-button @click="failedDialogVisible = false">返 回</el-button>
				<el-button type="primary" @click="confirm('failed')">提 交</el-button>
			</span>
		</el-dialog>
	</div>
</template>

<script>
	import {
		getExamineCompanyInfo
	} from '@/api/enterprise'
	import {
		examineCompanyInfo
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
					reviewStatus: null,
					failReason: '',
					examineId: null,
				},
				companyName: '',
				centerDialogVisible: false,
				failedDialogVisible: false,
				total: 0,
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
				getExamineCompanyInfo(this.pageNo).then(res => {
					console.log(res)
					for (var i = 0; i < res.data.examines.length; i++) {
						var image = res.data.examines[i].idcardImages.split(",")
						console.log(image)
						this.$set(res.data.examines[i], 'imagesPositive', image[0])
						this.$set(res.data.examines[i], 'imagesReverse', image[1])
						this.announceData.push(res.data.examines[i])
					}
					this.total = res.data.total
					console.log(this.announceData)
				})
			},
			audit(index,row) {
				this.title = "审核"
				this.params.examineId=row.id
				this.companyName=row.companyName
				this.centerDialogVisible = true
			},
			handleCurrentChange(val) {
				console.log(val)
				this.pageNo = val
				this.selectEnterprise()
			},
			closeDialog(){
				this.params.reviewStatus=null
			},
			confirm(type) {
				if(this.params.reviewStatus!=null){
					if (type == 'success') {
						if (this.params.reviewStatus == 0) {
							this.failedDialogVisible = true
						} else {
							examineCompanyInfo({
								reviewStatus:this.params.reviewStatus,
								examineId:this.params.examineId
							}).then(res => {
								console.log(res)
								this.centerDialogVisible = false
								this.selectEnterprise()
							})
						}
					}else {
						if(this.params.failReason!=''){
							examineCompanyInfo(this.params).then(res => {
							console.log(res)
							this.centerDialogVisible = false
							this.failedDialogVisible = false
							this.selectEnterprise()
						})
						}else{
							this.$message.warning('请输入审核失败原因！')
						}
						
					}
				}else{
					this.$message.warning('请选择审核状态！')
				}
				
			}
		}
	}
</script>
