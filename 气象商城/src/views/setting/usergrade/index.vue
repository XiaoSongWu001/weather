<template>
	<div class="app-container">
		<div>
			<el-container>
				<el-button type="primary" size="small" @click="adduser">添加用户等级</el-button>
			</el-container>
			<el-container>
				<el-table :data="gradeData" style="width: 100%" row-key="id" border lazy height="780">
					<el-table-column prop="level" label="等级" min-width="15%">
					</el-table-column>
					<el-table-column prop="levelName" label="等级名称" min-width="20%">
					</el-table-column>
					<el-table-column prop="remarks" label="说明" min-width="10%">
					</el-table-column>
					<el-table-column prop="requireScore" label="等级所需积分" min-width="15%"></el-table-column>
					<el-table-column label="操作" min-width="20%" align="center">
						<template slot-scope="scope">
							<el-button size="mini" @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
						</template>
					</el-table-column>
				</el-table>
				
			</el-container>
			<el-pagination @current-change="handleCurrentChange" :current-page="pageNo"
			 :page-sizes="[20]" layout="total, sizes, prev, pager, next, jumper" :total="total">
			</el-pagination>
			<el-dialog :title="title" :visible.sync="centerDialogVisible" width="30%" center>
				<div style="display:flex;margin-top: 20px;" v-if="title=='添加用户等级'">
					<span style="width: 80px;height:40px;line-height: 40px;">等级:</span>
					<el-input style="width: 200px;height:40px;line-height: 40px;" v-model="params.level" placeholder="等级名"></el-input>
				</div>
				<div style="display:flex;margin-top: 20px;">
					<span style="width: 80px;height:40px;line-height: 40px;">等级名:</span>
					<el-input style="width: 200px;height:40px;line-height: 40px;" v-model="params.levelName" placeholder="等级"></el-input>
				</div>
				<div style="display:flex;margin-top: 20px;">
					<span style="width: 80px;height:40px;line-height: 40px;">等级积分:</span>
					<el-input style="width: 200px;height:40px;line-height: 40px;" v-model="params.requireScore" placeholder="等级积分"></el-input>
					<img src="../../../assets/warning1.png" alt="" style="width: 16px;height: 16px;margin-top: 14px;">
					<span style="color: red;line-height: 40px;">高等级的积分需高于低等级积分</span>
				</div>
				<div style="display:flex;margin-top: 20px;">
					<span style="width: 80px;height:40px;line-height: 40px;">说明:</span>
					<el-input style="width: 200px;height:40px;line-height: 40px;" v-model="params.remarks" placeholder="说明"></el-input>
				</div>
				<span slot="footer" class="dialog-footer">
					<el-button @click="centerDialogVisible = false">取 消</el-button>
					<el-button v-if="title=='编辑'" type="primary" @click="confirm">确 定</el-button>
					<el-button v-else type="primary" @click="confirm1">确 定</el-button>
				</span>
			</el-dialog>
		</div>

	</div>
</template>

<script>
	import {getUserLevels} from '@/api/permission'
	import {updateUserLevel} from '@/api/permission'
	import {addUserLevel} from '@/api/permission'
	export default {

		data() {
			return {
				gradeData: [],
				title:'',
				params:{
					id:null,
					level:null,
					levelName:'',
					requireScore:null,
					remarks:'',
				},
				pageNo:1,
				total:null,
				centerDialogVisible:false
			}
		},
		watch: {},
		mounted() {
			this.getUserLevels()
		},
		methods: {
			getUserLevels(){
				getUserLevels(this.pageNo).then(res =>{
					console.log(res)
					this.gradeData=res.data.list
					this.total=res.data.recordNum
				})
			},
			handleCurrentChange(val) {
				this.pageNo = val
				this.getUserLevels()
			},
			adduser(){
				this.title="添加用户等级"
				this.params.levelName=''
				this.params.requireScore=null
				this.params.level=null
				this.params.remarks=''
				this.centerDialogVisible=true
			},
			handleEdit(index,row){
				this.title="编辑"
				this.params.level=row.level
				this.params.id=row.id
				this.params.levelName=row.levelName
				this.params.requireScore=row.requireScore+''
				this.params.remarks=row.remarks
				this.centerDialogVisible=true
			},
			confirm(){
				var reg = /^\+?[0-9]\d*$/;
				if(this.params.levelName!=''||this.params.remarks!=''){
					if(reg.test(this.params.requireScore)){
						updateUserLevel(this.params).then(res =>{
							console.log(res)
							this.centerDialogVisible=false
							this.getUserLevels()
						})
					}else{
						this.$message.warning('积分必须为正整数或0！！')
					}
				}else{
					this.$message.warning('修改信息不能全为空！')
				}
			},
			confirm1(){
				var reg = /^\+?[0-9]\d*$/;
				console.log(this.params.levelName)
				console.log(this.params.remarks)
				if(this.params.levelName!=''&&this.params.remarks!=''){
					if(reg.test(this.params.requireScore)&&reg.test(this.params.level)){
						addUserLevel(this.params).then(res =>{
							console.log(res)
							this.centerDialogVisible=false
							this.getUserLevels()
						})
					}else{
						this.$message.warning('积分和等级必须为正整数或0！！')
					}
				}else{
					this.$message.warning('修改信息不能全为空！')
				}
			}
		}
	}
</script>
