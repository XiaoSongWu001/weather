<template>
	<div class="app-container">
		<div style="background: white;margin-bottom: 10px;padding: 10px;box-shadow: 0px 5px 10px rgba(0, 0, 0, 0.1);">
			<div style="border-bottom:1px solid #f6f6f6;padding: 10px;">
				搜索条件
			</div>
			<el-button type="primary" icon="el-icon-search" style="margin-left: 10px;" @click="selectCircle" size="mini">搜索</el-button>
			<el-button type="primary" icon="el-icon-search" style="margin-left: 10px;" @click="addCircle" size="mini">新增</el-button>
		</div>
		<div>
			<el-table :data="tableData" style="width: 100%" border>
				<el-table-column prop="messTypeName" label="圈子名" min-width="20%"></el-table-column>
				<el-table-column prop="createTime" label="创建时间" min-width="50%"></el-table-column>
				<el-table-column label="操作" min-width="30%" align="center">
					<template slot-scope="scope">
						<el-button size="mini" type="primary" @click="editinfo(scope.$index, scope.row)">编辑</el-button>
						<el-button size="mini" type="primary" @click="delinfo(scope.$index, scope.row)">删除</el-button>
					</template>
				</el-table-column>
			</el-table>
		</div>
		<el-dialog :visible.sync="DialogVisible" :title="title" width="30%" center>
			<div style="display:flex;">
				<span style="width: 100px;height:30px;line-height: 30px;">圈名：</span>
				<el-input v-model="messTypeName" placeholder="请输入圈名" style="width: 300px;"></el-input>
			</div>
			<div style="height: 20px;">
				<el-button @click="DialogVisible = false" style="float: right;">取 消</el-button>
				<el-button v-if="title=='添加圈子'"  @click="confirm('add')" style="float: right;margin-right: 10px;">确认</el-button>
				<el-button v-else  @click="confirm('update')" style="float: right;margin-right: 10px;">确认</el-button>
			</div>
		</el-dialog>
	</div>
</template>

<script>
	import {
		circleSelect
	} from '@/api/message'
	import {
		circleAdd
	} from '@/api/message'
	import {
		circleUpdate
	} from '@/api/message'
	import {
		circleDel
	} from '@/api/message'
	export default {

		data() {
			return {
				tableData:[],
				param: {
					pageNo: 1,
					messTypeName: '',
				},
				title:'',
				DialogVisible:false,
				messTypeName:'',
				id:null,
			}
		},
		watch: {},
		mounted() {
			this.selectCircle()
		},
		methods: {
			//查询表格数据
			selectCircle() {
				this.announceData = []
				circleSelect(this.param).then(res => {
					console.log(res)
					this.tableData=res.data.list
				})
			},
			editinfo(index,row){
				this.title='编辑圈子'
				this.id=row.id
				this.messTypeName=row.messTypeName
				this.DialogVisible=true
			},
			delinfo(index,row){
				circleDel(row.id).then(res => {
					console.log(res)
					this.selectCircle()
				})
			},
			confirm(type){
				if(type=='add'){
					circleAdd({
						messTypeName:this.messTypeName
					}).then(res => {
						console.log(res)
						this.DialogVisible=false
						this.selectCircle()
					})
				}else{
					circleUpdate({
						id:this.id,
						messTypeName:this.messTypeName
					}).then(res => {
						console.log(res)
						this.DialogVisible=false
						this.selectCircle()
					})
				}
			},
			addCircle() {
				this.title='添加圈子'
				this.messTypeName=''
				this.DialogVisible=true
			},
		}
	}
</script>
