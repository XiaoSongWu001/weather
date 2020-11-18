<template>
	<div class="app-container">
		<el-button type="primary" @click="selectannounce">提交</el-button>
		<el-table :data="announceData" border style="width: 100%;margin-bottom: 10px;" height="710" max-height="780"
		 v-loading="tableLoading" element-loading-text="正在拼命加载中。。。。" @selection-change="handleSelectionChange">
			<el-table-column label="选择" min-width="10%" align="center" type="selection"></el-table-column>
			<el-table-column prop="time" label="序号" min-width="8%" align="center"></el-table-column>
			<el-table-column prop="time" label="时间" min-width="30%" align="center" :sortable="'custom'"></el-table-column>
			<el-table-column prop="time" label="标题" min-width="9%" align="center"></el-table-column>
			<el-table-column prop="time" label="作者" min-width="9%" align="center"></el-table-column>
			<el-table-column prop="time" label="阅读量" min-width="10%" align="center"> </el-table-column>
			<el-table-column prop="time" label="阅读量" min-width="25%" align="center"></el-table-column>
			<el-table-column prop="time" :sortable="'custom'" label="发布时间" min-width="17%" align="center"></el-table-column>
			<el-table-column prop="time" label="阅读量" :sortable="'custom'" min-width="17%" align="center"></el-table-column>
			<el-table-column prop="timetime" label="阅读量" :sortable="'custom'" min-width="15%" align="center"></el-table-column>
			<el-table-column prop="time" :sortable="'custom'" label="需求时间" min-width="15%" align="center"></el-table-column>
			<el-table-column label="操作" min-width="30%" align="center">
				<template slot-scope="scope">
					<el-button size="mini" type="primary" @click="editannounce(scope.$index, scope.row)" class="rowA4">编辑</el-button>
				</template>
			</el-table-column>
		</el-table>
		<el-dialog :title="title" :visible.sync="centerDialogVisible" width="40%" center>
			<div style="display:flex;padding-left: 20px;margin-bottom: 20px;">
				<span style="height:40px;line-height: 40px;letter-spacing: 4px;">标题:</span>
				<el-input v-model="params.orderNum" placeholder="请输入内容" style="width: 300px;margin-left: 5px;"></el-input>
			</div>
			<div style="display:flex;padding-left: 20px;margin-bottom: 20px;">
				<span style="height:40px;line-height: 40px;">重要性:</span>
				<el-input v-model="params.orderNum" placeholder="请输入内容" style="width: 300px;margin-left: 5px;"></el-input>
			</div>
			<div style="display:flex;padding-left: 20px;margin-bottom: 20px;">
				<span style="height:40px;line-height: 40px;letter-spacing: 4px;">时间:</span>
				<el-input v-model="params.orderNum" placeholder="请输入内容" style="width: 300px;margin-left: 5px;"></el-input>
			</div>
			<div style="display:flex;padding-left: 20px;margin-bottom: 20px;">
				<span style="height:40px;line-height: 40px;letter-spacing: 4px;">状态:</span>
				<el-input v-model="params.orderNum" placeholder="请输入内容" style="width: 300px;margin-left: 5px;"></el-input>
			</div>
			<div style="display:flex;padding-left: 20px;margin-bottom: 20px;">
				<span style="height:40px;line-height: 40px;letter-spacing: 4px;">作者:</span>
				<el-input v-model="params.orderNum" placeholder="请输入内容" style="width: 300px;margin-left: 5px;"></el-input>
			</div>
			<div style="display:flex;padding-left: 20px;margin-bottom: 20px;">
				<span style="height:40px;line-height: 40px;letter-spacing: 4px;letter-spacing: 4px;">内容:</span>
				<el-input
				  type="textarea"
				  :rows="3"
				  placeholder="请输入内容"
				  v-model="params.orderNum"
				  style="width: 500px;">
				</el-input>
			</div>
			<span slot="footer" class="dialog-footer">
				<el-button @click="centerDialogVisible = false">取 消</el-button>
				<el-button type="primary" @click="confirm">确 定</el-button>
			</span>
		</el-dialog>

	</div>
</template>

<script>
	import {AdminInfo} from '@/api/user'
	export default {

		data() {
			return {
				announceData: [{
					time:'555'
				}],
				tableLoading: false,
				title:'',
				params:{
					orderNum:''
				},
				centerDialogVisible:false
			}
		},
		watch: {},

		methods: {
			selectannounce() {
				getInfo("123").then(res =>{
					console.log("111")
				})
			},
			editannounce(){
				this.title="编辑"
				this.centerDialogVisible=true
			},
			handleSelectionChange(val) {
				
			},
			confirm(){
				
			}
		}
	}
</script>
