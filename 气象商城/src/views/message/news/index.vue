<template>
	<div class="app-container">
		<div style="background: white;margin-bottom: 10px;padding: 10px;box-shadow: 0px 5px 10px rgba(0, 0, 0, 0.1);">
			<div style="border-bottom:1px solid #f6f6f6;padding: 10px;">
				搜索条件
			</div>
			<!-- <div style="display:flex;padding-left: 20px;margin: 10px 0;">
				<span style="height:30px;line-height: 30px;margin-right: 20px;">广告状态:</span>
				<el-button size="mini" @click="status(3)" :class="{'hover':typenum==3}">失效</el-button>
				<el-button size="mini" @click="status(0)" :class="{'hover':typenum==0}">有效</el-button>
				<el-button size="mini" @click="status(2)" :class="{'hover':typenum==2}">未通过</el-button>
				<el-button size="mini" @click="status(1)" :class="{'hover':typenum==1}">未审核</el-button>
				<el-button size="mini" @click="status(4)" :class="{'hover':typenum==4}">合同中止</el-button>
				<el-button size="mini" type="primary" icon="el-icon-search" style="margin-left: 10px;" @click="selectAdverTise">查询</el-button>
				<el-button size="mini" type="primary" style="margin-left: 10px;" @click="addnews">添加广告</el-button>
			</div> -->
			<div style="display:flex;padding-left: 20px;margin: 10px 0;">
			<el-button size="mini" type="primary" icon="el-icon-search" style="margin-left: 10px;" @click="selectAdverTise">查询</el-button>
			<el-button size="mini" type="primary" style="margin-left: 10px;" @click="addnews">添加广告</el-button>
			</div>
		</div>
		<el-table :data="newsData" border style="width: 100%;margin-bottom: 10px;" height="710" max-height="780" v-loading="tableLoading"
		 element-loading-text="正在拼命加载中。。。。">
			<el-table-column prop="id" label="广告编号" min-width="8%" align="center"></el-table-column>
			<el-table-column prop="advertiseTitle" label="广告标题" min-width="30%" align="center" :sortable="'custom'"></el-table-column>
			<el-table-column prop="isQzts" label="是否强制性广告" min-width="9%" align="center">
				<template slot-scope="scope">
					<span v-if="scope.row.isQzts=== 1">
						<el-tag type="success" disable-transitions>强制</el-tag>
					</span>
					<span v-else>
						<el-tag type="danger" disable-transitions>非强制</el-tag>
					</span>
				</template>
			</el-table-column>
			<!-- <el-table-column prop="advertiseStatus" label="广告状态" min-width="9%" align="center">
				<template slot-scope="scope">
					<span v-if="scope.row.advertiseStatus=== 0">有效</span>
					<span v-else-if="scope.row.advertiseStatus=== 1">未审核</span>
					<span v-else-if="scope.row.advertiseStatus=== 2">未通过</span>
					<span v-else-if="scope.row.advertiseStatus=== 3">失效</span>
					<span v-else="scope.row.advertiseStatus=== 4">合同中止</span>
				</template>
			</el-table-column> -->
			<el-table-column prop="advertiseAmount" label="广告金额(万)" min-width="10%" align="center"> </el-table-column>
			<el-table-column prop="advertiseuserName" label="广告商公司" min-width="20%" align="center"></el-table-column>
			<el-table-column prop="adPoints" label="积分" min-width="10%" align="center"></el-table-column>
			<el-table-column prop="clickNum" label="点击量" min-width="10%" align="center"></el-table-column>
			<el-table-column label="广告类型" min-width="10%" align="center">
				<template slot-scope="scope">
					<span v-if="scope.row.contenttype=== 0">其它</span>
					<span v-else-if="scope.row.contenttype=== 1">游戏</span>
					<span v-else="scope.row.contenttype=== 2">服装</span>
				</template>
			</el-table-column>
			<el-table-column label="操作" min-width="20%" align="center">
				<template slot-scope="scope">
					<el-button size="mini" type="primary" @click="editannounce(scope.$index, scope.row)">编辑</el-button>
					<el-button size="mini" type="primary" @click="calculus(scope.$index, scope.row)">积分设置</el-button>
					<!-- <el-button size="mini" type="primary" @click="auditing(scope.$index, scope.row)">审核</el-button> -->
					<el-button size="mini" type="primary" @click="delAdver(scope.$index, scope.row)">删除</el-button>
				</template>
			</el-table-column>
		</el-table>
		<el-container class="pagec">
			<el-pagination @current-change="handleCurrentChange" :current-page="selectParams.pageNo" :page-sizes="[20]" layout="total, sizes, prev, pager, next, jumper"
			 :total="total">
			</el-pagination>
		</el-container>
		<!-- 积分给定 -->
		<el-dialog title="积分设置" :visible.sync="calculusDialog" width="30%" center>
			<div style="display:flex;margin-top: 20px;">
				<span style="width: 100px;height:40px;line-height: 40px;">广告名称：</span>
				<el-input v-model="params.advertiseTitle" :disabled="true" placeholder="公司名称" style="width: 300px;height:40px;line-height: 40px;"></el-input>
			</div>
			<div style="display:flex;margin-top: 20px;">
				<span style="width: 100px;height:40px;line-height: 40px;">积分设置：</span>
				<el-input v-model="adPoints" placeholder="积分设置" style="width: 300px;height:40px;line-height: 40px;"></el-input>
			</div>
			
			<span slot="footer" class="dialog-footer">
				<el-button @click="calculusDialog = false">取 消</el-button>
				<el-button type="primary" @click="confirmCalculus">确 定</el-button>
			</span>
		</el-dialog>
		<!-- 广告审核 -->
		<!-- <el-dialog :visible.sync="autingDialogtype" width="30%" center>
			<div>
				<div style="text-align: center;margin-top: 20px;">
					<span style="width: 100px;">审核状态：</span>
					<el-radio v-model="state" :label="0">有效</el-radio>
					<el-radio v-model="state" :label="1">未审核</el-radio>
					<el-radio v-model="state" :label="2">未通过</el-radio>
					<el-radio v-model="state" :label="3">失效</el-radio>
					<el-radio v-model="state" :label="4">合同中止</el-radio>
				</div>
			</div>
			<span slot="footer" class="dialog-footer">
				<el-button @click="autingDialogtype = false">取 消</el-button>
				<el-button type="primary" @click="confirmauting">确 定</el-button>
			</span>
		</el-dialog> -->
		<!-- 选择广告类别 -->
		<el-dialog :visible.sync="centerDialogtype" width="30%" center>
			<div>
				<div style="text-align: center;"><span style="width: 100px;height:40px;line-height: 40px;font-weight: 800;font-size: 18px;">请选择广告类型</span></div>
				<div style="text-align: center;margin-top: 20px;">
					<el-radio v-model="params.advertiseType" :label="0">启动页广告</el-radio>
					<el-radio v-model="params.advertiseType" :label="1">弹窗广告</el-radio>
					<el-radio v-model="params.advertiseType" :label="2">信息广告</el-radio>
				</div>
			</div>
			<span slot="footer" class="dialog-footer">
				<el-button @click="centerDialogtype = false">取 消</el-button>
				<el-button type="primary" @click="choosetype">确 定</el-button>
			</span>
		</el-dialog>
		<!-- 新闻广告 -->
		<el-dialog :title="title" :visible.sync="centerDialogVisible" width="40%" center @close="closeDialog">
			<div style="display:flex;margin-top: 20px;" v-if="title=='编辑广告'">
				<span style="width: 100px;">广告类型：</span>
				<el-radio v-model="params.advertiseType" :label="0">启动页广告</el-radio>
				<el-radio v-model="params.advertiseType" :label="1">弹窗广告</el-radio>
				<el-radio v-model="params.advertiseType" :label="2">信息广告</el-radio>
			</div>
			<div style="display:flex;margin-top: 20px;">
				<span style="width: 100px;height:30px;line-height: 30px;">广告商公司：</span>
				<el-input v-model="params.advertiseuserName" placeholder="公司名称" style="width: 300px;"></el-input>
			</div>
			<div style="display:flex;margin-top: 20px;">
				<span style="width: 100px;height:30px;line-height: 30px;">广告标题：</span>
				<el-input v-model="params.advertiseTitle" placeholder="请输入内容" style="width: 300px;"></el-input>
			</div>
			<!-- <el-date-picker v-model="params.sxTime" type="datetime" size="small" value-format="yyyy-MM-dd HH:mm:ss"
			 placeholder="发布开始日期" class="input_search" clearable></el-date-picker>
			<div class="input_search" size="small" style="width: 10px; height: 0; border: 1px solid gray;margin-top: 15px;"></div>
			<el-date-picker v-model="params.overTime" type="datetime" size="small" value-format="yyyy-MM-dd HH:mm:ss"
			 placeholder="发布结束日期" class="input_search" clearable></el-date-picker> -->
			<div style="display:flex;margin-top: 20px;">
				<span style="width: 100px;height:40px;line-height: 40px;">生效时间：</span>
				<el-date-picker class="date" v-model="params.sxTime" type="datetime" value-format="yyyy-MM-dd HH:mm:ss" placeholder="生效时间"
				 clearable></el-date-picker>
				<span style="height:40px;line-height: 40px;margin:0 10px;">过期时间：</span>
				<el-date-picker class="date" v-model="params.overTime" type="datetime" value-format="yyyy-MM-dd HH:mm:ss"
				 placeholder="过期时间" clearable></el-date-picker>
			</div>
			<div style="display:flex;margin-top: 20px;">
				<span style="width: 100px;height:40px;line-height: 40px;">停止时间：</span>
				<el-date-picker class="date" v-model="params.stopTime" type="datetime" value-format="yyyy-MM-dd HH:mm:ss"
				 placeholder="停止时间" clearable></el-date-picker>
			</div>
			<div style="display:flex;margin-top: 20px;">
				<span style="width: 100px;height:40px;line-height: 40px;">投放开始时间：</span>
				<el-date-picker class="date" v-model="params.tfTimeBeg" type="datetime" value-format="yyyy-MM-dd HH:mm:ss" placeholder="开始时间"
				 clearable></el-date-picker>
				<span style="width: 100px;height:40px;line-height: 40px;margin:0 5px;">投放结束时间：</span>
				<el-date-picker class="date" v-model="params.tfTimeEnd" type="datetime" value-format="yyyy-MM-dd HH:mm:ss" placeholder="结束时间"
				 clearable></el-date-picker>
			</div>
			<div style="display:flex;margin-top: 20px;">
				<span style="width: 100px;height:30px;line-height: 30px;">至少观看时间：</span>
				<el-input v-model="params.leastTime" placeholder="观看时间(秒)" style="width: 300px;"></el-input>
			</div>
			<div style="display:flex;margin-top: 20px;">
				<span style="width: 100px;height:30px;line-height: 30px;">广告金额：</span>
				<el-input v-model="params.advertiseAmount" placeholder="金额" style="width: 300px;"></el-input>
			</div>
			<div style="display:flex;margin-top: 20px;" class="father">
				<span style="width: 100px;height:30px;line-height: 30px;letter-spacing: 2px;">广告图:</span>
				<el-upload :action="actionurl" list-type="picture-card" class="upload-demo" :auto-upload="false" ref="upload1"
				 :multiple="true" name="file" :on-remove="handleRemove" :http-request="uploadFile1" :headers="httpheaders"
				 :file-list="fileList1">
					<i class="el-icon-plus"></i>
				</el-upload>
			</div>
			<div style="display:flex;margin-top: 20px;" class="father">
				<span style="width: 100px;height:30px;line-height: 30px;letter-spacing: 2px;">logo图:</span>
				<el-upload :action="actionurl" list-type="picture-card" class="upload-demo" :auto-upload="false" ref="upload2"
				 :multiple="true" :limit="1" name="file" :on-remove="handleRemove1" :http-request="uploadFile2" :headers="httpheaders"
				 :file-list="fileList2">
					<i class="el-icon-plus"></i>
				</el-upload>
			</div>
			<div style="display:flex;margin-top: 10px;">
				<span style="width: 100px;height:30px;line-height: 30px;">广告类型：</span>
				<el-radio v-model="params.contenttype" :label="0" style="line-height:30px;">其它</el-radio>
				<el-radio v-model="params.contenttype" :label="1" style="line-height:30px;">游戏</el-radio>
				<el-radio v-model="params.contenttype" :label="2" style="line-height:30px;">服装</el-radio>
			</div>
			<div style="display:flex;margin-top: 10px;" v-if="title=='编辑广告'">
				<span style="width: 100px;height:30px;line-height: 30px;">是否强制广告：</span>
				<el-radio v-model="params.isQzts" :label="1" style="line-height:30px;">强制</el-radio>
				<el-radio v-model="params.isQzts" :label="0" style="line-height:30px;">非强制</el-radio>
			</div>
			<span slot="footer" class="dialog-footer">
				<el-button @click="centerDialogVisible = false">取 消</el-button>
				<el-button type="primary" @click="confirm('addnews')" v-if="title=='添加广告'">确 定</el-button>
				<el-button type="primary" @click="confirm('edit')" v-if="title=='编辑广告'">确 定</el-button>
			</span>
		</el-dialog>

	</div>
</template>

<script>
	import {
		getToken
	} from '@/utils/auth'
	import {
		select
	} from '@/api/message'
	import {
		add
	} from '@/api/message'
	import {
		del
	} from '@/api/message'
	import {
		update
	} from '@/api/message'
	import {
		updateState
	} from '@/api/message'
	import {
		updateADpoints
	} from '@/api/message'
	export default {
		data() {
			return {
				url: this.IMGURL.baseUrl,
				newsData: [],
				value: '',
				tableLoading: false,
				title: '',
				httpheaders: {
					"Authorization": '',
					// 'Content-Type':'multipart/form-data'
				},
				fileList1: [],
				fileList2: [],
				state: null,
				params: {
					id: '',
					advertiseType: null,
					advertiseTitle: '',
					sxTime: '',
					overTime: '',
					stopTime: '',
					tfTimeBeg: '',
					tfTimeEnd: '',
					leastTime: null,
					advertiseAmount: '',
					advertiseuserName: '',
					contenttype: null,
					isQzts: null,
					// imageNamePartFile:[],
					// multipartFile:[]
				},
				selectParams: {
					// advertiseStatus: '',
					advertiseTitle: '',
					isQzts: null,
					advertiseAmount: null,
					advertiseuserName: '',
					contenttype: null,
					pageNo: 1,
				},
				adPoints:null,//广告积分
				typenum: null,
				centerDialogVisible: false,
				calculusDialog:false,
				centerDialogtype: false,
				// autingDialogtype: false,
				total: 0,
				actionurl: '',
				files1: [],
				files2: [],
				delImage: '',
			}
		},
		watch: {},
		mounted() {
			// this.selectAdverTise()
			console.log(this.url)
		},
		methods: {
			// handleSizeChange(val) {
			// 	this.selectParams.page_size = val
			// },
			handleCurrentChange(val) {
				console.log(val)
				this.selectParams.pageNo = val
				this.selectAdverTise()
			},
			//广告图
			handleRemove(file, fileList) {
				if (file.status == 'success') {
					console.log(file.url)
					var arr = file.url.split("/file/");
					this.delImage += arr[1] + ','
					console.log(this.delImage)
				}
			},
			//logo图
			handleRemove1(file, fileList) {
				if (file.status == 'success') {
					console.log(file.url)

				}
			},
			// status(num) {
			// 	this.typenum = num
			// 	this.selectParams.advertiseStatus = num
			// },
			closeDialog() {
				this.fileList1 = []
				this.fileList2 = []
				this.delImage = ''
			},
			//查询表格数据
			selectAdverTise() {
				select(this.selectParams).then(res => {
					console.log(res)
					this.newsData = res.data.list
					this.total = res.data.total
				})
			},
			delAdver(index, row) {
				del(row.id).then(res => {
					console.log(res)
					this.selectParams.pageNo = 1
					this.selectAdverTise()
				})
			},
			// auditing(index, row) {
			// 	this.params.id = row.id
			// 	this.autingDialogtype = true
			// },
			// confirmauting() {
			// 	console.log(this.state)
			// 	updateState(this.params.id, this.state).then(res => {
			// 		console.log(res)
			// 		this.autingDialogtype = false
			// 		this.selectParams.pageNo = 1
			// 		this.selectAdverTise()
			// 	})
			// },
			//广告积分设置
			calculus(index, row){
				this.params.advertiseTitle = row.advertiseTitle
				this.params.id = row.id
				this.adPoints=row.adPoints//广告积分给定
				this.calculusDialog=true
				console.log(row)
			},
			//广告积分确定
			confirmCalculus(){
				var reg = /^\+?[1-9]\d*$/;
				if(reg.test(this.adPoints)){
					updateADpoints(this.params.id,this.adPoints).then(res => {
					console.log(res)
					this.calculusDialog=false
					this.selectAdverTise()
				})
				}else{
					this.$message.warning('积分必须为正整数！')
				}
				
			},
			editannounce(index, row) {
				console.log(row)
				this.title = "编辑广告"
				this.params.id = row.id
				this.params.advertiseType = row.advertiseType
				this.params.advertiseTitle = row.advertiseTitle
				this.params.sxTime = row.sxTime
				this.params.overTime = row.overTime
				this.params.stopTime = row.stopTime
				this.params.tfTimeBeg = row.tfTimeBeg
				this.params.tfTimeEnd = row.tfTimeEnd
				this.params.leastTime = row.leastTime
				this.params.isQzts = row.isQzts
				this.params.advertiseAmount = row.advertiseAmount
				this.params.advertiseuserName = row.advertiseuserName
				this.params.contenttype = row.contenttype
				if (row.icon != '' && row.icon != null) {
					var icon = row.icon.split(",");
					for (var i = 0; i < icon.length; i++) {
						this.fileList2.push({
							url: this.url + icon[i]
						})
					}
				}
				if (row.imageName != '' && row.imageName != null) {
					var imageName = row.imageName.split(",");
					console.log(imageName)
					for (var i = 0; i < imageName.length; i++) {
						if (imageName[i] != "null" && imageName[i] != '') {
							this.fileList1.push({
								url: this.url + imageName[i]
							})
						}
					}
					console.log(this.fileList1)
				}
				this.centerDialogVisible = true
			},
			confirm(type) {
				if (type == 'addnews') {
					// console.log(this.isParamsNull(this.params))
					if (this.params.advertiseTitle != '' && this.params.sxTime != '' && this.params.overTime != '' && this.params.stopTime !=
						'' && this.params.tfTimeBeg != '' && this.params.tfTimeEnd != '' && this.params.leastTime != null && this.params.advertiseAmount !=
						'' && this.params.advertiseuserName != '' && this.params.contenttype != null) {
						this.$refs.upload1.submit();
						this.$refs.upload2.submit();
						let fd = new FormData();
						fd.append('advertiseType', this.params.advertiseType)
						fd.append('advertiseTitle', this.params.advertiseTitle)
						fd.append('sxTime', this.params.sxTime)
						fd.append('overTime', this.params.overTime)
						fd.append('stopTime', this.params.stopTime)
						fd.append('tfTimeBeg', this.params.tfTimeBeg)
						fd.append('tfTimeEnd', this.params.tfTimeEnd)
						fd.append('leastTime', this.params.leastTime)
						fd.append('advertiseAmount', this.params.advertiseAmount)
						fd.append('advertiseuserName', this.params.advertiseuserName)
						fd.append('contenttype', this.params.contenttype)
						this.files1.forEach(function(file) {
							fd.append('imageNamePartFile', file, file.name); // 因为要上传多个文件，所以需要遍历一下才行
							//不要直接使用我们的文件数组进行上传，你会发现传给后台的是两个Object
						})
						this.files2.forEach(function(file) {
							fd.append('multipartFile', file, file.name); // 因为要上传多个文件，所以需要遍历一下才行
							//不要直接使用我们的文件数组进行上传，你会发现传给后台的是两个Object
						})
						add(fd).then(res => {
							console.log(res)
							this.files1 = []
							this.files2 = []
							this.clearfiles()
							this.centerDialogVisible = false
							this.centerDialogtype = false
							this.selectAdverTise()
						})
					} else {
						this.$message.warning('除了图片其它不能为空！')
					}

				} else if (type == 'edit') {
					if (this.params.advertiseTitle != '' && this.params.sxTime != '' && this.params.overTime != '' && this.params.stopTime !=
						'' && this.params.tfTimeBeg != '' && this.params.tfTimeEnd != '' && this.params.leastTime != null && this.params.advertiseAmount !=
						'' && this.params.advertiseuserName != '' && this.params.contenttype != null) {
						this.$refs.upload1.submit();
						this.$refs.upload2.submit();
						let fd = new FormData();
						fd.append('id', this.params.id)
						fd.append('advertiseType', this.params.advertiseType)
						fd.append('advertiseTitle', this.params.advertiseTitle)
						fd.append('sxTime', this.params.sxTime)
						fd.append('overTime', this.params.overTime)
						fd.append('stopTime', this.params.stopTime)
						fd.append('tfTimeBeg', this.params.tfTimeBeg)
						fd.append('tfTimeEnd', this.params.tfTimeEnd)
						fd.append('leastTime', this.params.leastTime)
						fd.append('advertiseAmount', this.params.advertiseAmount)
						fd.append('advertiseuserName', this.params.advertiseuserName)
						fd.append('contenttype', this.params.contenttype)
						fd.append('isQzts', this.params.isQzts)
						fd.append('imageName', this.delImage)
						this.files1.forEach(function(file) {
							fd.append('imageNamePartFile', file, file.name); // 因为要上传多个文件，所以需要遍历一下才行
							//不要直接使用我们的文件数组进行上传，你会发现传给后台的是两个Object
						})
						this.files2.forEach(function(file) {
							fd.append('multipartFile', file, file.name); // 因为要上传多个文件，所以需要遍历一下才行
							//不要直接使用我们的文件数组进行上传，你会发现传给后台的是两个Object
						})
						update(fd).then(res => {
							console.log(res)
							this.files1 = []
							this.files2 = []
							this.delImage = ''
							this.clearfiles()
							this.centerDialogVisible = false
							this.selectAdverTise()
						})
					} else {
						this.$message.warning('除了图片其它不能为空！')
					}
				}
			},
			clearfiles() {
				this.$refs.upload1.clearFiles();
				this.$refs.upload2.clearFiles();
			},
			// isParamsNull(params) {
			// 	let flag = true;
			// 	for (var key in params) {
			// 		console.log(params[key])
			// 		if (params[key] != null && !params[key]) {
			// 			return false; // 终止程序
			// 		}
			// 	}

			// 	return flag;
			// },
			addnews() {
				this.params.advertiseTitle=''
				this.params.sxTime=''
				this.params.overTime=''
				this.params.stopTime=''
				this.params.tfTimeBeg=''
				this.params.tfTimeEnd=''
				this.params.stopTime=''
				this.params.advertiseAmount=null
				this.params.leastTime=null
				this.params.contenttype=null
				this.params.advertiseType=null
				this.centerDialogtype = true
			},
			uploadFile1(files) {
				console.log(files)
				this.files1.push(files.file);
			},
			uploadFile2(files) {
				console.log(files)
				this.files2.push(files.file);
			},
			choosetype() {
				if (this.params.advertiseType != null) {
					this.title = "添加广告"
					this.centerDialogVisible = true
				} else {
					this.$message.warning('请选择广告类型')
				}

			}
		},
		mounted() {
			this.httpheaders.Authorization = getToken()
		}
	}
</script>
<style scoped="scoped">
	.hover {
		background: #ecf5ff;
		color: #409eff;
		border: 1px solid #c6e2ff;
	}

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

	.date {
		height: 40px;
		line-height: 40px;
	}
</style>
