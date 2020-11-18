<template>
	<div class="app-container">
		<div style="background: white;margin-bottom: 10px;padding: 10px;box-shadow: 0px 5px 10px rgba(0, 0, 0, 0.1);">
			<div style="border-bottom:1px solid #f6f6f6;padding: 10px;">
				搜索条件
			</div>
			<div style="display: flex;">
				<div style="margin: 10px 10px;">
					<el-input size="medium" placeholder="预警消息内容" clearable style="width: 200px;margin-left: 10px;" v-model="params.warningContent">
					</el-input>
				</div>
				<div style="margin: 10px 10px;">
					<el-select size="medium" v-model="params.warningType" placeholder="预警类型">
						<el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value">
						</el-option>
					</el-select>
				</div>
				<div style="margin: 10px 10px;">
					<el-select size="medium" v-model="params.warningLevel" placeholder="预警等级">
						<el-option v-for="item in optionsLevel" :key="item" :label="item" :value="item">
						</el-option>
					</el-select>
				</div>
			</div>
			<div style="display: flex;">
				<div style="margin: 10px 10px;">
					<el-input size="medium" placeholder="预警标题" clearable style="width: 200px;margin-left: 10px;" v-model="params.title">
					</el-input>
				</div>
				<div style="margin: 10px 10px;">
					<el-select size="medium" v-model="params.isPush" placeholder="是否推送">
						<el-option v-for="item in optionsPush" :key="item.value" :label="item.label" :value="item.value">
						</el-option>
					</el-select>
				</div>
			</div>
			<el-button type="primary" icon="el-icon-search" style="margin-left: 10px;" @click="selectDusaster" size="mini">搜索</el-button>
			<el-button type="primary" icon="el-icon-search" style="margin-left: 10px;" @click="addDusaster" size="mini">新增</el-button>
		</div>
		<!-- <div>
			<el-button type="primary" style="margin-left: 10px;" @click="abnormalmsg">异常消息</el-button>
			<el-button type="primary" style="margin-left: 10px;" @click="othermsg">其他消息</el-button>
		</div> -->
		<el-table :data="disasterData" border style="width: 100%;margin-bottom: 10px;" height="710" max-height="780"
		 v-loading="tableLoading" element-loading-text="正在拼命加载中。。。。">
			<el-table-column prop="id" label="序号" min-width="8%" align="center"></el-table-column>
			<el-table-column prop="title" label="标题" min-width="15%" align="center"></el-table-column>
			<el-table-column prop="adminUser" label="用户" min-width="10%" align="center"></el-table-column>
			<el-table-column prop="warningContent" label="预警信息" min-width="20%" align="center"></el-table-column>
			<el-table-column prop="messImage1" label="灾害图" min-width="20%" align="center"> </el-table-column>
			<el-table-column prop="warningLevel" label="预警等级" min-width="9%" align="center"></el-table-column>
			<el-table-column label="预警类型" min-width="9%" align="center">
				<template slot-scope="scope">
					<span v-if="scope.row.warningType=== 0">地址灾害</span>
					<span v-else="scope.row.warningType=== 1">天气灾害</span>
				</template>
			</el-table-column>
			<el-table-column label="是否推送" min-width="17%" align="center">
				<template slot-scope="scope">
					<span v-if="scope.row.warningType=== 0">未推送</span>
					<span v-else="scope.row.warningType=== 1">已推送</span>
				</template>
			</el-table-column>
			<el-table-column prop="createTime" label="创建时间" min-width="25%" align="center"></el-table-column>
			<el-table-column label="操作" min-width="30%" align="center">
				<template slot-scope="scope">
					<el-button size="mini" type="primary" @click="editinfo(scope.$index, scope.row)">编辑</el-button>
					<el-button size="mini" type="primary" @click="delinfo(scope.$index, scope.row)">删除</el-button>
				</template>
			</el-table-column>
		</el-table>
		<el-container class="pagec">
			<el-pagination @current-change="handleCurrentChange" :current-page="params.pageNo" :page-sizes="[20]" layout="total, sizes, prev, pager, next, jumper"
			 :total="total">
			</el-pagination>
		</el-container>
		<!-- 气象添加 编辑弹框 -->
		<el-dialog :title="title" :visible.sync="centerDialogVisible" width="45%" center @close="closeDialog">
			<div style="display:flex;">
				<span style="width: 100px;height:30px;line-height: 30px;">标题：</span>
				<el-input v-model="paramsAdd.title" placeholder="请输入标题" style="width: 300px;"></el-input>
			</div>
			<div style="display:flex;margin-top: 20px;">
				<span style="width: 100px;height:30px;line-height:30px;">预警内容：</span>
				<el-input v-model="paramsAdd.warningContent" type="textarea" :rows="4" placeholder="请输入类型" style="width: 300px;"></el-input>
			</div>
			<div style="display:flex;margin-top: 20px;">
				<span style="width: 100px;height:30px;line-height: 30px;">推送区域：</span>
				<el-button icon="el-icon-location" @click="openmap" size="mini">打开地图</el-button>
				<span style="height:30px;line-height: 30px;margin-left: 10px;">经度：</span>
				<el-input v-model="paramsAdd.longitude" style="width: 150px;" :disabled="true"></el-input>
				<span style="height:30px;line-height: 30px;">纬度：</span>
				<el-input v-model="paramsAdd.latitude" style="width: 150px;" :disabled="true"></el-input>
			</div>
			<div style="display:flex;margin-top: 20px;" class="father">
				<span style="width: 100px;height:40px;line-height: 40px;letter-spacing: 2px;">灾害图:</span>
				<el-upload :action="actionurl" list-type="picture-card" class="upload-demo" :auto-upload="false" ref="upload1"
				 :multiple="true" :on-remove="handleRemove" :http-request="uploadFile1" :headers="httpheaders" :file-list="fileList1">
					<i class="el-icon-plus"></i>
				</el-upload>
			</div>
			<div style="display:flex;margin-top: 20px;" class="father">
				<span style="width: 100px;height:40px;line-height: 40px;letter-spacing: 2px;">灾害视频:</span>
				<el-upload class="avatar-uploader" :action="url1+'/base/upload'" accept='.mp4,.qlv,.qsv,.ogg,.flv,.avi,.wmv,.rmvb'
				 :show-file-list="false" id='video' :on-change="handleChangeVideo" :on-progress="uploadVideoProcess"
				 :on-success="handleVideoSuccess" :headers="httpheaders">
					<video v-if="Video !=''" :src="Video" width="350" height="180" controls="controls">您的浏览器不支持视频播放
					</video>
					<el-button icon="el-icon-delete" @click="delvideo" v-if="Video !=''&&title=='编辑'"></el-button>
					<i v-else-if="Video ==''" class="el-icon-plus avatar-uploader-icon"></i>
					<!--没选择视频之前显示-->
				</el-upload>
			</div>
			<el-progress :percentage="percentLength" v-show="showpercent" style="width: 350px;margin-left: 100px;"></el-progress>
			<div style="display:flex;margin-top: 20px;">
				<span style="width: 100px;height:40px;line-height: 40px;">预警类型:</span>
				<el-select size="medium" v-model="paramsAdd.warningType" placeholder="预警类型">
					<el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value">
					</el-option>
				</el-select>
			</div>
			<div style="display:flex;margin-top: 20px;">
				<span style="width: 100px;height:40px;line-height: 40px;">灾害等级:</span>
				<el-select size="medium" v-model="paramsAdd.warningLevel" placeholder="灾害等级">
					<el-option v-for="item in optionsLevel" :key="item" :label="item" :value="item">
					</el-option>
				</el-select>
			</div>
			<span slot="footer" class="dialog-footer">
				<el-button type="primary" @click="addDusasterConfirm" v-if="title=='添加'">添加</el-button>
				<el-button type="primary" @click="addDusasterConfirm1" v-if="title=='编辑'">修改</el-button>
				<el-button @click="centerDialogVisible = false">取 消</el-button>
			</span>
		</el-dialog>
		<!-- 删除弹框 -->
		<el-dialog :visible.sync="delDialogVisible" width="30%" center>
			<div style="width: 60px;margin: 20px auto;">
				<img src="../../../assets/warning.png" style="width: 60px;height: 60px;" alt="">
			</div>
			<div style="width: 50%;margin: 20px auto;text-align: center;">
				<span v-show="false">{{deltitle}}</span>
				<span style="color: red;font-weight: 800;font-size: 15px;" v-if="deltitle=='删除记录'">确认删除该预警？</span>
				<span style="color: red;font-weight: 800;font-size: 15px;" v-else>确认删除该视频？</span>
			</div>
			<div style="height: 20px;">
				<el-button @click="delDialogVisible = false" style="float: right;">取 消</el-button>
				<el-button type="danger" v-if="deltitle=='删除记录'" @click="delconfirm" style="float: right;margin-right: 10px;">确认</el-button>
				<el-button type="danger" v-else @click="delconfirm1" style="float: right;margin-right: 10px;">确认</el-button>
			</div>
		</el-dialog>
		<!-- 地图对话框 -->
		<el-dialog :visible.sync="mapDialogVisible" width="80%" center>
			<div>
				<div id='container'></div>
				<div class='info'>操作说明：圆需要拖拽来绘制</div>
				<div class="input-card" style='width: 22rem;'>
					<!-- <div class="input-item">
			      <input type="radio" name='func' checked="" value='marker'><span class="input-text">画点</span>
			      <input type="radio" name='func' value='polyline'><span class="input-text">画折线</span>
			      <input type="radio" name='func' value='polygon'><span class="input-text" style='width:5rem;'>画多边形</span>
			    </div> -->
					<div class="input-item">
						<input type="radio" name='func' value='circle' @click="circle" :checked="checked"><span class="input-text">画圆</span>
					</div>
					<div class="input-item">
						当前位置的经纬度：
						<!-- <input type="text" readonly="true" id="lnglat"> -->
					</div>
					<div class="input-item">
						<input type="text" readonly="true" id="lnglat" placeholder="经度">
						<input type="text" readonly="true" id="lnglat1" placeholder="纬度">
					</div>

					<div class="input-item">
						<input id="clear" type="button" class="btn" value="关闭绘图" @click="close" />
						<input id="clear" type="button" class="btn" value="确定" @click="confirmchoose" />
						<!-- <input id="close" type="button" class="btn" value="关闭绘图" @click="close1"/> -->
					</div>
				</div>
			</div>
			<remote-script src="https://webapi.amap.com/maps?v=1.4.15&key=b76a8629bc4c28402cd84cb7a979246e&plugin=AMap.MouseTool"></remote-script>
		</el-dialog>

	</div>
</template>

<script>
	import {
		delFile
	} from '@/api/product'
	import {
		getToken
	} from '@/utils/auth'
	import {
		AdminInfo
	} from '@/api/user'
	import {
		warningmsg
	} from '@/api/message'
	import {
		warningmsgAdd
	} from '@/api/message'
	import {
		warningmsgUpdate
	} from '@/api/message'
	import {
		warningmsgDel
	} from '@/api/message'
	export default {
		data() {
			return {
				disasterData: [],
				tableLoading: false,
				title: '',
				warningContent: '',
				options: [{
						label: '地质灾害',
						value: 0,
					},
					{
						label: '天气灾害',
						value: 1,
					}
				],
				optionsLevel: [1, 2, 3, 4, 5],
				optionsPush: [{
					label: '未推送',
					value: 0
				}, {
					label: '已推送',
					value: 1
				}],
				params: {
					warningContent: '',
					warningType: null,
					warningLevel: null,
					title: '',
					isPush: null,
					pageNo: 1
				},
				paramsAdd: {
					id:null,
					warningContent: '',
					warningType: null,
					warningLevel: null,
					title: '',
					isPush: null,
					longitude: '', //经度,
					latitude: '', //纬度,
					messImageMultipartFile: [], //灾害图片
					messVidio: '', //视频
				},
				centerDialogVisible: false,
				delDialogVisible: false,
				mapDialogVisible: false, //地图对话框
				activities: [{
						content: '包裹正在揽收',
						timestamp: '2020-9-10 15:32:31'
					},
					{
						content: '派送中',
						timestamp: '2020-9-10 15:32:31'
					},
					{
						content: '已送达',
						timestamp: '2020-9-10 15:32:31'
					}
				],
				area: true,
				customer: false,
				mouseTool: {},
				checked: false,
				actionurl: '',
				url1: this.IMGURL.baseUrl1,
				url: this.IMGURL.baseUrl,
				httpheaders: {
					"Authorization": getToken(),
					// 'Content-Type':'multipart/form-data'
				},
				files1: [],
				files2: [],
				Video: '',
				showpercent:false,
				percentLength:0,
				videoData:'',
				fileList1:[],
				delImage:'',
				total:0,
				delVideo1:'',
				deltitle:'',
			}
		},
		watch: {},
		mounted() {
			console.log(this.url1+'/base/upload')
		},
		methods: {
			handleCurrentChange(val) {
				console.log(val)
				this.params.pageNo = val
				this.selectDusaster()
			},
			handleChangeVideo(file) {
				this.Video = URL.createObjectURL(file.raw)
				console.log(file)
				this.paramsAdd.messVidioMultipartFile = file.raw
			},
			uploadVideoProcess(event, file, fileList){
			    this.showpercent = true;
			    this.percentLength =parseFloat(file.percentage.toFixed(0));
			}, 
			//获取视频上传成功后的地址
			handleVideoSuccess(res, file) { 
			    this.showpercent = false;
			    this.percentLength = 0;
			    if(res.code == 200){
					console.log(res)
					this.videoData=res.data
					this.delVideo1=res.data
					this.paramsAdd.messVidio=this.videoData
			    }else{
			        this.$message.error(res.msg);
			    }
			},
			delvideo(){
				console.log(this.videoData)
				this.deltitle='删除视频'
				this.delDialogVisible=true
			},
			//添加编辑弹窗关闭事件删除视频文件
			closeDialog(){
				this.fileList1=[]
				if(this.videoData!=''){
					delFile(this.videoData).then(res => {
						console.log(res)
						this.videoData=''
					})
				}
			},
			//关闭地图上绘图功能
			close() {
				this.mouseTool.close(true)
				this.checked = false
				document.getElementById("lnglat").value = ''
				document.getElementById("lnglat1").value = ''
			},
			circle() {
				this.checked = true
				this.mouseTool.circle({
					fillColor: '#00b0ff',
					strokeColor: '#80d8ff'
					//同Circle的Option设置
				});
			},
			confirmchoose() {
				this.mapDialogVisible = false
				this.paramsAdd.longitude = document.getElementById("lnglat").value
				this.paramsAdd.latitude = document.getElementById("lnglat1").value
			},
			show() {
				var map = new AMap.Map('container', {
					zoom: 14
				});
				console.log(map)
				this.mouseTool = new AMap.MouseTool(map);
				map.on('mousedown', function(e) {
					document.getElementById("lnglat").value = e.lnglat.getLng()
					document.getElementById("lnglat1").value = e.lnglat.getLat()
				});
				var overlays = [];
				this.mouseTool.on('draw', function(e) {
					overlays.push(e.obj);
				})
			},
			//确定添加灾害信息
			addDusasterConfirm() {
				if (this.paramsAdd.warningContent != '' && this.paramsAdd.longitude != '' && this.paramsAdd.latitude != '' && this.paramsAdd
					.title != ''&& this.paramsAdd.warningType != null && this.paramsAdd.warningLevel != null) {
					this.$refs.upload1.submit();
					let fd = new FormData();
					fd.append('warningContent', this.paramsAdd.warningContent)
					fd.append('longitude', this.paramsAdd.longitude)
					fd.append('latitude', this.paramsAdd.latitude)
					fd.append('title', this.paramsAdd.title)
					fd.append('warningType', this.paramsAdd.warningType)
					fd.append('warningLevel', this.paramsAdd.warningLevel)
					if(this.paramsAdd.messVidio!=''){
						fd.append('messVidio', this.paramsAdd.messVidio)
					}
					this.files1.forEach(function(file) {
						fd.append('messImageMultipartFile', file, file.name); // 因为要上传多个文件，所以需要遍历一下才行
						//不要直接使用我们的文件数组进行上传，你会发现传给后台的是两个Object
					})
					// this.files2.forEach(function(file) {
					// 	fd.append('messVidioMultipartFile', file, file.name); // 因为要上传多个文件，所以需要遍历一下才行
					// 	//不要直接使用我们的文件数组进行上传，你会发现传给后台的是两个Object
					// })
					this.files1 = []
					this.files2 = []
					warningmsgAdd(fd).then(res => {
						console.log(res)
						for(let key in this.paramsAdd){
							 this.paramsAdd[key]  = ''
						}
						this.videoData=''
						this.centerDialogVisible = false
						this.selectDusaster()
					})
				} else {
					this.$message.warning('文件可以为空，其它信息不能为空！')
				}

			},
			//修改
			addDusasterConfirm1() {
				if (this.paramsAdd.warningContent != '' && this.paramsAdd.longitude != '' && this.paramsAdd.latitude != '' && this.paramsAdd
					.title != ''&& this.paramsAdd.warningType != null && this.paramsAdd.warningLevel != null) {
					this.$refs.upload1.submit();
					let fd = new FormData();
					fd.append('id', this.paramsAdd.id)
					fd.append('warningContent', this.paramsAdd.warningContent)
					fd.append('longitude', this.paramsAdd.longitude)
					fd.append('latitude', this.paramsAdd.latitude)
					fd.append('title', this.paramsAdd.title)
					fd.append('warningType', this.paramsAdd.warningType)
					fd.append('warningLevel', this.paramsAdd.warningLevel)
					fd.append('messImage', this.delImage)
					if(this.paramsAdd.messVidio!=''&&this.paramsAdd.messVidio!=null){
						fd.append('messVidio', this.paramsAdd.messVidio)
					}
					this.files1.forEach(function(file) {
						fd.append('messImageMultipartFile', file, file.name); // 因为要上传多个文件，所以需要遍历一下才行
						//不要直接使用我们的文件数组进行上传，你会发现传给后台的是两个Object
					})
					console.log(this.paramsAdd.id)
					// this.files2.forEach(function(file) {
					// 	fd.append('messVidioMultipartFile', file, file.name); // 因为要上传多个文件，所以需要遍历一下才行
					// 	//不要直接使用我们的文件数组进行上传，你会发现传给后台的是两个Object
					// })
					this.files1 = []
					this.files2 = []
					warningmsgUpdate(fd).then(res => {
						console.log(res)
						for(let key in this.paramsAdd){
							 this.paramsAdd[key]  = ''
						}
						this.videoData=''
						this.centerDialogVisible = false
						this.selectDusaster()
					})
				} else {
					this.$message.warning('文件可以为空，其它信息不能为空！')
				}
			
			},
			//视频删除后再次执行删除操作
			delscuuess(){
				let fd = new FormData();
				fd.append('id', this.paramsAdd.id)
				fd.append('warningContent', this.paramsAdd.warningContent)
				fd.append('longitude', this.paramsAdd.longitude)
				fd.append('latitude', this.paramsAdd.latitude)
				fd.append('title', this.paramsAdd.title)
				fd.append('warningType', this.paramsAdd.warningType)
				fd.append('warningLevel', this.paramsAdd.warningLevel)
				fd.append('messImage', this.delImage)
				if(this.paramsAdd.messVidio!=''){
					fd.append('messVidio', this.paramsAdd.messVidio)
				}
				this.files1.forEach(function(file) {
					fd.append('messImageMultipartFile', file, file.name); // 因为要上传多个文件，所以需要遍历一下才行
					//不要直接使用我们的文件数组进行上传，你会发现传给后台的是两个Object
				})
				// this.files2.forEach(function(file) {
				// 	fd.append('messVidioMultipartFile', file, file.name); // 因为要上传多个文件，所以需要遍历一下才行
				// 	//不要直接使用我们的文件数组进行上传，你会发现传给后台的是两个Object
				// })
				this.files1 = []
				this.files2 = []
				warningmsgUpdate(fd).then(res => {
					console.log(res)
					this.videoData=''
					this.selectDusaster()
				})
			},
			//按钮点击打开对话框显示地图
			openmap() {
				setTimeout(() => {
					this.show()
				}, 1000)
				this.mapDialogVisible = true
			},
			//查询灾害信息
			selectDusaster() {
				warningmsg(this.params).then(res => {
					console.log(res)
					this.disasterData = res.data.list
					this.total=res.data.total
				})
			},
			//新增灾害信息
			addDusaster() {
				this.title = '添加'
				this.Video=''
				this.centerDialogVisible = true
			},
			uploadFile1(files) {
				console.log(files)
				this.files1.push(files.file);
			},
			//对话框中移除图片的方法
			handleRemove(file, fileList) {
				if(file.status=='success'){
					console.log(file.url)
					var arr = file.url.split("/file/");
					this.delImage+=arr[1]+','
					console.log(this.delImage)
				}
				// console.log(file)
				// console.log(file.url)
				// console.log(file, fileList);
			},
			othermsg() {
				this.customer = true
				this.area = false
			},
			abnormalmsg() {
				this.customer = false
				this.area = true
			},
			confirm() {

			},
			editinfo(index,row) {
				this.delImage=''
				this.title = "编辑"
				console.log(row)
				this.paramsAdd.title=row.title
				this.paramsAdd.warningContent=row.warningContent
				this.paramsAdd.longitude=row.longitude
				this.paramsAdd.latitude=row.latitude
				this.paramsAdd.warningType=row.warningType
				this.paramsAdd.warningLevel=row.warningLevel
				this.paramsAdd.messVidio=row.messVidio
				if (row.messImage != ''&&row.messImage!=null) {
					var messImage = row.messImage.split(",");
					console.log(messImage)
					for (var i = 0; i < messImage.length; i++) {
						if(messImage[i]!=''){
							this.fileList1.push({
							url:this.url + messImage[i]
						})
						}
					}
				}
				this.paramsAdd.id=row.id
				this.delVideo1=row.messVidio
				if(row.messVidio!=null){
					this.Video=this.url + row.messVidio
				}else{
					this.Video=''
				}
				
				console.log(this.delVideo1)
				// this.paramsAdd.id=row.id
				// this.paramsAdd.warningContent=row.warningContent
				// this.paramsAdd.id=row.id
				// this.paramsAdd.id=row.id
				// this.paramsAdd.id=row.id
				// this.paramsAdd.id=row.id
				// this.paramsAdd.id=row.id
				// this.paramsAdd.id=row.id
				this.centerDialogVisible = true
			},
			// 打开删除弹框
			delinfo(inde,row) {
				this.paramsAdd.id=row.id
				this.deltitle='删除记录'
				this.delDialogVisible = true
			},
			delconfirm1(){
				delFile(this.delVideo1).then(res => {
					console.log(res)
					this.videoData=''
					this.paramsAdd.messVidio=''
					this.Video=''
					console.log(this.paramsAdd.id)
					this.delscuuess()
					this.delDialogVisible=false
				})
			},
			delconfirm(){
				warningmsgDel(this.paramsAdd.id).then(res => {
					console.log(res)
					this.delDialogVisible=false
					this.selectDusaster()
				})
			}
		}
	}
</script>
<style scoped="scoped">
	.typetop {
		margin: 20px 20px;
	}

	.el-dialog__header {
		border-bottom: 0;
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

	#container {
		/* margin-top: 200px; */
		/* height: calc(100vh - 240px); */
		height: 780px;
	}

	.input-item {
		height: 2.2rem;
	}

	.btn {
		width: 6rem;
		margin: 0 1rem 0 2rem;
	}

	.input-text {
		width: 4rem;
		margin-right: 1rem;
	}
</style>
