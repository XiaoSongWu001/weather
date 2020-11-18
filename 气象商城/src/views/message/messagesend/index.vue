<template>
	<div class="app-container">
		<div style="background: white;margin-bottom: 10px;padding: 10px;box-shadow: 0px 5px 10px rgba(0, 0, 0, 0.1);">
			<div style="border-bottom:1px solid #f6f6f6;padding: 10px;">
				搜索条件
			</div>
			<div style="display: flex;">
				<div style="margin: 10px 10px;">
					<el-input size="medium" placeholder="预警标题" clearable style="width: 200px;margin-left: 10px;" v-model="params.title">
					</el-input>
					<el-input size="medium" placeholder="预警内容" clearable style="width: 200px;margin-left: 10px;" v-model="params.messText">
					</el-input>
				</div>
			</div>
			<div style="display: flex;">
				<div style="margin: 10px 10px;">
					<el-select clearable style="margin:0 10px;width: 200px;" size="medium" v-model="params.overTimeType" placeholder="是否过期">
						<el-option v-for="item in optionsPush" :key="item.value" :label="item.label" :value="item.value">
						</el-option>
					</el-select>
					<el-date-picker value-format="yyyy-MM-dd HH:mm:ss" style="width: 200px;" clearable size="medium" v-model="params.overTime" type="datetime"
					 placeholder="过期时间">
					</el-date-picker>
				</div>
			</div>
			<el-button type="primary" icon="el-icon-search" style="margin-left: 10px;" @click="selectDusaster" size="mini">搜索</el-button>
			<el-button type="primary" icon="el-icon-search" style="margin-left: 10px;" @click="addDusaster" size="mini">新增</el-button>
		</div>
		<el-table :data="disasterData" border style="width: 100%;margin-bottom: 10px;" height="710" max-height="780"
		 v-loading="tableLoading" element-loading-text="正在拼命加载中。。。。">
			<el-table-column prop="id" label="序号" min-width="8%" align="center"></el-table-column>
			<el-table-column prop="title" label="标题" min-width="15%" align="center"></el-table-column>
			<el-table-column prop="messText" label="预警信息" min-width="25%" align="center"></el-table-column>
			<el-table-column label="信息类型" min-width="10%" align="center">
				<template slot-scope="scope">
					<span v-if="scope.row.messSortGrade=== 0">企业公告</span>
					<span v-else-if="scope.row.messSortGrade=== 1">普通信息</span>
					<span v-else="scope.row.messSortGrade=== 2">紧急信息</span>
				</template>
			</el-table-column>
			<el-table-column label="发布状态" min-width="20%" align="center">
				<template slot-scope="scope">
					<span v-if="scope.row.messState=== 1">已发布</span>
					<span v-else-if="scope.row.messState=== 0">草稿箱</span>
				</template>
			</el-table-column>
			<el-table-column label="浏览信息" min-width="25%" align="center">
				<template slot-scope="scope">
					<span>积分：{{scope.row.messLljf}}</span>
					<span>点赞：{{scope.row.messCount}}</span>
					<span>收藏：{{scope.row.messCollect}}</span>
				</template>
			</el-table-column>
			<el-table-column prop="messRefer" label="查阅人" min-width="10%" align="center"></el-table-column>
			<el-table-column prop="overTime" label="过期时间" min-width="20%" align="center"></el-table-column>
			<el-table-column label="操作" min-width="20%" align="center">
				<template slot-scope="scope">
					<el-button size="mini" type="primary" @click="editinfo(scope.$index, scope.row)">编辑</el-button>
					<el-button size="mini" type="primary" @click="delinfo(scope.$index, scope.row)">删除</el-button>
				</template>
			</el-table-column>
		</el-table>
		<!-- 平台消息添加 编辑弹框 -->
		<el-dialog :title="title" :visible.sync="centerDialogVisible" width="45%" center @close="closeDialog">
			<div style="display:flex;">
				<span style="width: 100px;height:30px;line-height: 30px;">标题：</span>
				<el-input v-model="paramsAdd.title" placeholder="标题" style="width: 300px;"></el-input>
			</div>
			<div style="display:flex;margin-top: 20px;">
				<span style="width: 100px;height:30px;line-height:30px;">信息内容：</span>
				<el-input v-model="paramsAdd.messText" type="textarea" :rows="4" placeholder="信息内容" style="width: 300px;"></el-input>
			</div>
			<div style="display:flex;margin-top: 20px;">
				<span style="width: 100px;height:30px;line-height: 30px;">推送区域：</span>
				<el-button icon="el-icon-location" @click="openmap" size="mini">打开地图</el-button>
				<span style="height:30px;line-height: 30px;margin-left: 10px;">经度：</span>
				<el-input v-model="paramsAdd.longitude" style="width: 150px;" :disabled="true"></el-input>
				<span style="height:30px;line-height: 30px;">纬度：</span>
				<el-input v-model="paramsAdd.latitude" style="width: 150px;" :disabled="true"></el-input>
				<span style="height:30px;line-height: 30px;">半径：</span>
				<el-input v-model="paramsAdd.radius" style="width: 150px;" :disabled="true"></el-input>
			</div>
			<div style="display:flex;margin-top: 20px;">
				<span style="width: 100px;height:40px;line-height: 40px;">过期时间:</span>
				<el-date-picker value-format="yyyy-MM-dd HH:mm:ss" style="width: 200px;" clearable size="medium" v-model="paramsAdd.overTime" type="datetime" placeholder="过期时间">
				</el-date-picker>
			</div>
			
			<div style="display:flex;margin-top: 20px;">
				<span style="width: 100px;height:40px;line-height: 40px;">信息类型:</span>
				<el-select size="medium" v-model="paramsAdd.messType" placeholder="信息类型">
					<el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value">
					</el-option>
				</el-select>
			</div>
			<div style="display:flex;margin-top: 20px;">
				<span style="width: 100px;height:40px;line-height: 40px;">企业信息:</span>
				<el-select size="medium" v-model="paramsAdd.messSortGrade" placeholder="企业信息">
					<el-option v-for="item in optionsLevel" :key="item.value" :label="item.label" :value="item.value">
					</el-option>
				</el-select>
			</div>
			<div style="display:flex;margin-top: 20px;" class="father" v-if="paramsAdd.messType==1">
				<span style="width: 100px;height:40px;line-height: 40px;letter-spacing: 2px;">平台消息图:</span>
				<el-upload :action="actionurl" list-type="picture-card" class="upload-demo" :auto-upload="false" ref="upload1"
				 :multiple="true" :on-remove="handleRemove" :http-request="uploadFile1" :headers="httpheaders" :file-list="fileList1">
					<i class="el-icon-plus"></i>
				</el-upload>
			</div>
			<div style="display:flex;margin-top: 20px;" class="father" v-if="paramsAdd.messType==0">
				<span style="width: 100px;height:40px;line-height: 40px;letter-spacing: 2px;">灾害视频:</span>
				<el-upload class="avatar-uploader" :action="url1+'/base/upload'" accept='.mp4,.qlv,.qsv,.ogg,.flv,.avi,.wmv,.rmvb'
				 :show-file-list="false" id='video' :on-change="handleChangeVideo" :on-progress="uploadVideoProcess"
				 :on-success="handleVideoSuccess" :headers="httpheaders">
					<video v-if="Video !=''" :src="Video" width="350" height="180" controls="controls">您的浏览器不支持视频播放
					</video>
					<el-button icon="el-icon-delete" @click="delvideo" v-if="Video !=''&&title=='编辑'"></el-button>
					<i v-else-if="Video ==''" class="el-icon-video-camera-solid"></i>
					<!--没选择视频之前显示-->
				</el-upload>
			</div>
			<el-progress :percentage="percentLength" v-show="showpercent" style="width: 350px;margin-left: 100px;"></el-progress>
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
		<el-pagination @current-change="handleCurrentChange" :current-page="params.pageNo" :page-sizes="[20]" layout="total, sizes, prev, pager, next, jumper"
		 :total="total">
		</el-pagination>
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
						<input type="radio" name='func' value='circle' @click="draw" :checked="checked"><span class="input-text">画圆</span>
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
		publicSelect
	} from '@/api/message'
	import {
		publicAdd
	} from '@/api/message'
	import {
		publicUpdate
	} from '@/api/message'
	import {
		publicDel
	} from '@/api/message'
	export default {
		data() {
			return {
				disasterData: [],
				tableLoading: false,
				title: '',
				warningContent: '',
				optionsLevel:[{
						label: '普通信息',
						value: 1,
					},{
						label: '紧急信息',
						value: 2,
					},],
				options: [{
						label: '视频',
						value: 0,
					},
					{
						label: '图文',
						value: 1,
					}
				],
				optionsPush: [{
					label: '未过期',
					value: 1
				}, {
					label: '已过期',
					value: 0
				}],
				params: {
					messText: '',
					title: '',
					overTimeType: null, //过期状态
					overTime: '', //过期时间
					pageNo: 1
				},
				paramsAdd: {
					id: null,
					goodsId: null,
					messText: '',
					messSortGrade: null,
					title: '',
					messType: null,
					overTime:'',
					radius:null,
					longitude: '', //经度,
					latitude: '', //纬度,
					files: [], //灾害图片
					file: '', //视频
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
				httpheaders: {
					"Authorization": getToken(),
					// 'Content-Type':'multipart/form-data'
				},
				files1: [],
				Video: '',
				url1: this.IMGURL.baseUrl1,
				url: this.IMGURL.baseUrl,
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

		methods: {
			handleChangeVideo(file) {
				this.Video = URL.createObjectURL(file.raw)
				console.log(file)
				this.paramsAdd.file = file.raw
			},
			uploadVideoProcess(event, file, fileList){
			    this.showpercent = true;
			    this.percentLength =parseFloat(file.percentage.toFixed(0));
			}, 
			//关闭地图上绘图功能
			close() {
				this.mouseTool.close(true)
				this.checked = false
				var overlays = [];
				document.getElementById("lnglat").value = ''
				document.getElementById("lnglat1").value = ''
			},
			draw() {
				this.checked = true
				this.mouseTool.circle({
					fillColor: '#00b0ff',
					strokeColor: '#80d8ff'
					//同Circle的Option设置
				});
			},
			handleCurrentChange(val) {
				this.params.pageNo = val
				this.selectAdverTise()
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
				//监听draw事件可获取画好的覆盖物
				this.mouseTool.on('draw', function(e) {
					overlays.push(e.obj.Ce.radius);
				})
				var self=this
				// var circle = new AMap.Circle({
				//     // center: new AMap.LngLat('116.273707','39.896989'), // 圆心位置
				//     // radius: 1000,  //半径
				//     strokeColor: "#76D5C2",  //线颜色
				//     strokeOpacity: 1,  //线透明度
				//     strokeWeight: 1,  //线粗细度
				//     fillColor: "#76D5C2",  //填充颜色
				//     fillOpacity: 0.35 //填充透明度
				// });
				map.on('mouseup', function(e) {
					setTimeout(()=>{
						console.log(overlays)
						for(var i=0;i<overlays.length;i++){
							if(i==overlays.length-1){
								self.paramsAdd.radius=overlays[i]
							}
						}
					},100)
					// console.log(circle.getRadius())
				});
			},
			delvideo(){
				console.log(this.videoData)
				this.deltitle='删除视频'
				this.delDialogVisible=true
			},
			closeDialog(){
				this.files1=[]
				this.fileList1=[]
				if(this.videoData!=''){
					delFile(this.videoData).then(res => {
						console.log(res)
						this.videoData=''
					})
				}
				for(let key in this.paramsAdd){
					 this.paramsAdd[key]  = ''
				}
				this.paramsAdd.messType=null
			},
			//视频上传成功后
			handleVideoSuccess(res, file) {
			    this.showpercent = false;
			    this.percentLength = 0;
			    if(res.code == 200){
					this.videoData=res.data
					this.delVideo1=res.data
					this.paramsAdd.file=this.videoData
					console.log(this.paramsAdd.file)
			    }else{
			        this.$message.error(res.msg);
			    }
			},
			//确定添加灾害信息
			addDusasterConfirm() {
				console.log(this.videoData)
				console.log(this.files1)
				if (this.paramsAdd.title != '' && this.paramsAdd.longitude != '' && this.paramsAdd.latitude != '' && this.paramsAdd
					.overTime != ''&&this.paramsAdd.overTime!=null&&this.paramsAdd.radius!=null) {
						if(this.paramsAdd.messType==1){
							this.$refs.upload1.submit();
						}
					let fd = new FormData();
					fd.append('title', this.paramsAdd.title)
					fd.append('messText', this.paramsAdd.messText)
					fd.append('messSortGrade', this.paramsAdd.messSortGrade)
					fd.append('messType', this.paramsAdd.messType)
					fd.append('overTime', this.paramsAdd.overTime)
					fd.append('radius', this.paramsAdd.radius)
					fd.append('longitude', this.paramsAdd.longitude)
					fd.append('latitude', this.paramsAdd.latitude)
					if(this.videoData!=''&&this.paramsAdd.messType==0){
						fd.append('messVidio', this.videoData)
					}
					if(this.files1.length!=0&&this.paramsAdd.messType==1){
						if(this.videoData!=''){
							delFile(this.videoData).then(res => {
								console.log(res)
								this.videoData=''
							})
						}
						this.files1.forEach(function(file) {
						fd.append('files', file, file.name); // 因为要上传多个文件，所以需要遍历一下才行
						//不要直接使用我们的文件数组进行上传，你会发现传给后台的是两个Object
						})
					}
					publicAdd(fd).then(res => {
						console.log(res)
						for (let key in this.paramsAdd) {
							this.paramsAdd[key] = ''
						}
						this.videoData=''
						this.centerDialogVisible = false
						this.selectDusaster()
					})
				} else {
					this.$message.warning('信息内容、经纬度、半径、标题不能为空！')
				}

			},
			//修改
			addDusasterConfirm1() {
				if (this.paramsAdd.title != '' && this.paramsAdd.longitude != '' && this.paramsAdd.latitude != '' && this.paramsAdd
					.overTime != ''&&this.paramsAdd.overTime!=null&&this.paramsAdd.radius!=null) {
						if(this.paramsAdd.messType==1){
							this.$refs.upload1.submit();
						}
					let fd = new FormData();
					fd.append('id', this.paramsAdd.id)
					fd.append('title', this.paramsAdd.title)
					fd.append('messText', this.paramsAdd.messText)
					fd.append('messSortGrade', this.paramsAdd.messSortGrade)
					fd.append('messType', this.paramsAdd.messType)
					fd.append('overTime', this.paramsAdd.overTime)
					fd.append('radius', this.paramsAdd.radius)
					fd.append('longitude', this.paramsAdd.longitude)
					fd.append('latitude', this.paramsAdd.latitude)
					if(this.delImage!=''&&this.paramsAdd.messType==1){
						fd.append('messImage', this.delImage)
					}
					if(this.videoData!=''&&this.paramsAdd.messType==0){
						fd.append('messVidio', this.videoData)
					}
					if(this.files1.length!=0&&this.paramsAdd.messType==1){
						if(this.videoData!=''){
							delFile(this.videoData).then(res => {
								console.log(res)
								this.videoData=''
							})
						}
						this.files1.forEach(function(file) {
						fd.append('files', file, file.name); // 因为要上传多个文件，所以需要遍历一下才行
						//不要直接使用我们的文件数组进行上传，你会发现传给后台的是两个Object
						})
					}
					publicUpdate(fd).then(res => {
						console.log(res)
						for (let key in this.paramsAdd) {
							this.paramsAdd[key] = ''
						}
						this.videoData=''
						this.centerDialogVisible = false
						this.selectDusaster()
					})
				} else {
					this.$message.warning('信息内容、经纬度、半径、标题不能为空！')
				}
			},
			delscuuess(){
				let fd = new FormData();
				fd.append('id', this.paramsAdd.id)
				fd.append('title', this.paramsAdd.title)
				fd.append('messText', this.paramsAdd.messText)
				fd.append('messSortGrade', this.paramsAdd.messSortGrade)
				fd.append('messType', this.paramsAdd.messType)
				fd.append('overTime', this.paramsAdd.overTime)
				fd.append('radius', this.paramsAdd.radius)
				fd.append('longitude', this.paramsAdd.longitude)
				fd.append('latitude', this.paramsAdd.latitude)
				fd.append('messVidio', this.paramsAdd.file)
				publicUpdate(fd).then(res => {
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
				publicSelect(this.params).then(res => {
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
			editinfo(index, row) {
				this.delImage=''
				this.title = "编辑"
				console.log(row)
				this.paramsAdd.id=row.id
				this.paramsAdd.title=row.title
				this.paramsAdd.messText=row.messText
				this.paramsAdd.longitude=row.longitude
				this.paramsAdd.latitude=row.latitude
				this.paramsAdd.messSortGrade=row.messSortGrade
				this.paramsAdd.messType=row.messType
				this.paramsAdd.overTime=row.overTime
				this.paramsAdd.radius=row.radius
				if (row.messImage != ''&&row.messImage!=null) {
					var files = row.messImage.split(",");
					console.log(files)
					for (var i = 0; i < files.length; i++) {
						if(files[i]!='null'&&files[i]!=''){
							this.fileList1.push({
							url:this.url + files[i]
						})
						}
					}
				}
				this.delVideo1=row.messVidio
				if(row.messVidio!=null&&row.messVidio!=''){
					this.Video=this.url + row.messVidio
				}else{
					this.Video=''
				}
				this.centerDialogVisible = true
			},
			// 打开删除弹框
			delinfo(inde, row) {
				this.paramsAdd.id = row.id
				this.deltitle='删除记录'
				this.delDialogVisible = true
			},
			delconfirm1(){
				delFile(this.delVideo1).then(res => {
					console.log(res)
					this.videoData=''
					this.paramsAdd.file=''
					this.Video=''
					console.log(this.paramsAdd.id)
					this.delscuuess()
					this.delDialogVisible=false
				})
			},
			delconfirm() {
				publicDel(this.paramsAdd.id).then(res => {
					console.log(res)
					this.delDialogVisible = false
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
	.icon-wrap{
		/* width:40px;
		height: 40px; */
		font-size: 24px;
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
