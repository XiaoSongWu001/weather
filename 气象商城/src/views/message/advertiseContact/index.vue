<template>
	<div class="app-container">
		<div style="background: white;margin-bottom: 10px;padding: 10px;box-shadow: 0px 5px 10px rgba(0, 0, 0, 0.1);">
			<div style="border-bottom:1px solid #f6f6f6;padding: 10px;">
				搜索条件
			</div>
			<div style="display: flex;margin: 0 10px;">
				<el-select clearable style="margin:0 10px;width: 200px;" size="mini" v-model="params.isContact" placeholder="是否过期">
					<el-option v-for="item in optionsPush" :key="item.value" :label="item.label" :value="item.value">
					</el-option>
				</el-select>
				<el-input size="mini" placeholder="广告名" clearable style="width: 200px;margin-left: 10px;" v-model="params.addressName">
				</el-input>
				<el-input size="mini" placeholder="联系电话" clearable style="width: 200px;margin-left: 10px;" v-model="params.addressPhone">
				</el-input>
				<el-input size="mini" placeholder="联系人" clearable style="width: 200px;margin-left: 10px;" v-model="params.nickname">
				</el-input>
				<el-button type="primary" icon="el-icon-search" style="margin-left: 20px;" @click="selectCircle" size="mini">搜索</el-button>
			</div>
			<!-- <div style="margin: 10px 10px;">
				
			</div> -->
			
		</div>
		<div>
			<el-table :data="tableData" style="width: 100%" border height="780">
				<el-table-column prop="addressName" label="广告名" min-width="15%"></el-table-column>
				<el-table-column prop="addressPhone" label="联系电话" min-width="20%"></el-table-column>
				<el-table-column label="是否联系" min-width="20%">
					<template slot-scope="scope">
						<span v-if="scope.row.isContact=== 1">已联系</span>
						<span v-else>未联系</span>
					</template>
				</el-table-column>
				<el-table-column prop="nickname" label="联系人" min-width="15%"></el-table-column>
				<el-table-column label="操作" min-width="30%" align="center">
					<template slot-scope="scope">
						<el-button size="mini" type="primary" @click="editinfo(scope.$index, scope.row)">联系</el-button>
					</template>
				</el-table-column>
			</el-table>
		</div>
		<el-pagination @current-change="handleCurrentChange" :current-page="params.pageNo"
		 :page-sizes="[20]" layout="total, sizes, prev, pager, next, jumper" :total="total">
		</el-pagination>
		<el-dialog :visible.sync="DialogVisible" width="30%" center @close="close">
			<div style="display:flex;">
				<span style="margin-right: 10px;line-height: 30px;width: 100px;">是否联系:</span>
				<el-radio v-model="isContact" :label="1" style="line-height:30px;">是</el-radio>
				<el-radio v-model="isContact" :label="0" style="line-height:30px;">否</el-radio>
			</div>
			<div style="height: 20px;">
				<el-button @click="DialogVisible = false" style="float: right;">取 消</el-button>
				<el-button  @click="confirm" style="float: right;margin-right: 10px;">确认</el-button>
			</div>
		</el-dialog>
	</div>
</template>

<script>
	import {
		addressContactList
	} from '@/api/message'
	import {
		addressContactIsContact
	} from '@/api/message'
	export default {

		data() {
			return {
				tableData:[],
				isContact: null,
				id:null,
				params: {
					pageNo: 1,
					addressName:'',
					addressPhone:'',
					nickname:'',
				},
				DialogVisible:false,
				total:0,
				optionsPush:[{
					label:'未联系',
					value:0
				},{
					label:'已联系',
					value:1
				}]
			}
		},
		watch: {},
		// mounted() {
		// 	this.selectCircle()
		// },
		methods: {
			//查询表格数据
			selectCircle() {
				this.announceData = []
				addressContactList(this.params).then(res => {
					console.log(res)
					this.tableData=res.data.list
					this.total=res.data.total
				})
			},
			handleCurrentChange(val) {
				this.pageNo = val
				this.getUserLevels()
			},
			close(){
			},
			editinfo(index,row){
				console.log(row)
				this.id=row.id
				this.isContact=row.isContact
				this.DialogVisible=true
			},
			confirm(){
				addressContactIsContact(this.id,this.isContact).then(res => {
					console.log(res)
					this.selectCircle()
					this.DialogVisible=false
				})
			}
		}
	}
</script>
