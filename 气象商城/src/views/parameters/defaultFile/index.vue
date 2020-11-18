<template>
	<div class="app-container">
		<div style="display: flex;font-size: 16px;" class="father">
			<span style="height: 40px;line-height: 40px;">默认头像:</span>
			<img v-if="defaultHeadImg!=''" class="imgs" :src="url+defaultHeadImg" alt="头像">
			<el-upload :action="url+'admin/setDefaultImgs'" list-type="picture-card" :auto-upload="false" :on-change="change1" :http-request="uploadFile1"
			 :on-preview="handlePictureCardPreview" name="MultipartFile" class="upload-demo" :on-remove="handleRemove" :limit="1" ref="upload1" :headers="httpheaders">
				<i class="el-icon-plus"></i>
			</el-upload>
		</div>
		<div style="display: flex;font-size: 16px;margin-top: 20px;" class="father">
			<span style="height: 40px;line-height: 40px;">默认背景:</span>
			<img v-if="defaultBgImg!=''" class="imgs" :src="url+defaultBgImg" alt="背景">
			<el-upload :action="url+'admin/setDefaultImgs'" name="MultipartFile" list-type="picture-card" :auto-upload="false" :http-request="uploadFile2"
			 :on-preview="handlePictureCardPreview" class="upload-demo" :on-remove="handleRemove" :limit="1" ref="upload2" :headers="httpheaders" :on-change="change2">
				<i class="el-icon-plus"></i>
			</el-upload>
		</div>
		<div style="display: flex;font-size: 16px;margin-top: 20px;" class="father">
			<el-button size="mini" @click="submit">提交</el-button>
		</div>
		<el-dialog :visible.sync="dialogVisible">
		  <img width="100%" :src="dialogImageUrl" alt="">
		</el-dialog>
	</div>
</template>

<script>
	import {
		getToken
	} from '@/utils/auth'
	import {
		getDefaultImgs
	} from '@/api/parameters'
	import {
		setDefaultImgs
	} from '@/api/parameters'
	export default {

		data() {
			return {
				url: this.IMGURL.baseUrl,
				url1: this.IMGURL.baseUrl1,
				defaultBgImg:'',
				defaultHeadImg:'',
				dialogImageUrl: '',
				dialogVisible: false,
				files1:[],
				files2:[],
				httpheaders: {
					"Authorization": '',
				},
			}
		},
		watch: {},
		mounted() {
			this.getDefaultImgs()
			this.httpheaders.Authorization = getToken()
		},
		methods: {
			//查询默认图片数据
			getDefaultImgs(){
				getDefaultImgs().then(res => {
					console.log(res)
					this.defaultBgImg=res.data.defaultBgImg
					this.defaultHeadImg=res.data.defaultHeadImg
				})
			},
			uploadFile1(files) {
				console.log(files)
				this.files1.push(files.file);
			},
			uploadFile2(files) {
				console.log(files)
				this.files2.push(files.file);
			},
			change1(file, fileList){
				this.defaultHeadImg=''
				console.log(fileList)
			},
			change2(file, fileList){
				this.defaultBgImg=''
				console.log(fileList)
			},
			handleRemove(file, fileList) {
				console.log(file, fileList);
			},
			handlePictureCardPreview(file) {
				this.dialogImageUrl = file.url;
				this.dialogVisible = true;
			}, 
			submit() {
				this.$refs.upload1.submit();
				this.$refs.upload2.submit();
				let fd = new FormData();
				console.log(this.files1)
				this.files1.forEach(function(file) {
					fd.append('defaultHeadImg', file, file.name); // 因为要上传多个文件，所以需要遍历一下才行
					//不要直接使用我们的文件数组进行上传，你会发现传给后台的是两个Object
				})
				this.files2.forEach(function(file) {
					fd.append('defaultBgImg', file, file.name); // 因为要上传多个文件，所以需要遍历一下才行
					//不要直接使用我们的文件数组进行上传，你会发现传给后台的是两个Object
				})
				setDefaultImgs(fd).then(res => {
					console.log(res)
					this.files1=[]
					this.files2=[]
				})
			},
		}
	}
</script>
<style scoped="scoped">
	.upload-demo /deep/ .el-upload--picture-card {
		width: 100px;
		height: 100px;
		line-height: 100px;
	}
	.imgs{
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