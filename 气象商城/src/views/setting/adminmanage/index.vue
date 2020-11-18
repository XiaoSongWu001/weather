<template>
	<div>
		<el-container>
			<el-button size="small" @click="addmenu('add')" class="addmenu">添加管理员</el-button>
		</el-container>
		<el-container>
			<el-table :data="packData" style="width: 100%" row-key="id" border lazy  height="710" max-height="780">
				<el-table-column prop="id" label="管理员id" min-width="15%">
				</el-table-column>
				<el-table-column prop="roleName" label="角色" min-width="20%">
				</el-table-column>
				<el-table-column prop="adminAccount" label="账号" min-width="20%">
				</el-table-column>
				<el-table-column prop="adminAccountName" label="昵称" min-width="20%">
				</el-table-column>
				<el-table-column label="是否可用" min-width="15%">
					<template slot-scope="scope">
						<span v-if="scope.row.status=== 1">
							<el-tag type="success" disable-transitions>是</el-tag>
						</span>
						<span v-else>
							<el-tag type="danger" disable-transitions>否</el-tag>
						</span>
					</template>
				</el-table-column>
				<el-table-column label="操作" min-width="20%" align="center">
					<template slot-scope="scope">
						<el-button size="mini" @click="handleEdit(scope.$index, scope.row,'select')">编辑</el-button>
					</template>
				</el-table-column>
			</el-table>
			
		</el-container>
		<el-dialog :title="title" :visible.sync="centerDialogVisible" width="30%" center>
			<div style="display:flex;margin-top: 20px;" v-if="title=='添加管理员'">
				<span style="width: 100px;height:40px;line-height: 40px;">账号：</span>
				<el-input v-model="params.adminAccount" placeholder="请输入账号" class="input1"></el-input>
			</div>
			<div style="display:flex;margin-top: 20px;" v-if="title=='添加管理员'">
				<span style="width: 100px;height:40px;line-height: 40px;">密码：</span>
				<el-input type="password" v-model="params.adminPassword" size="mini" class="input1" placeholder="请输入密码"></el-input>
			</div>
			<div style="display:flex;margin-top: 20px;">
				<span style="width: 100px;height:40px;line-height: 40px;">昵称：</span>
				<el-input v-model="params.adminAccountName" placeholder="请输入昵称" class="input1"></el-input>
			</div>
			<div style="display:flex;margin-top: 20px;">
				<span style="width: 84px;height:40px;line-height: 40px;">角色:</span>
				  <el-select class="input1" v-model="params.roleId" placeholder="请选择角色">
				    <el-option
				      v-for="item in options"
				      :key="item.roleId"
				      :label="item.roleName"
				      :value="item.roleId">
				    </el-option>
				  </el-select>
			</div>
			<div style="display:flex;margin-top: 20px;">
				<span style="width: 100px;height:40px;line-height: 40px;">电话：</span>
				<el-input v-model="params.phone" class="input1" placeholder="请输入电话"></el-input>
			</div>
			<div style="display:flex;margin-top: 20px;">
				<span style="width: 100px;height:40px;line-height: 40px;">是否可用</span>
				<el-radio v-model="params.status" :label="1" style="height:40px;line-height: 40px;">是</el-radio>
				<el-radio v-model="params.status" :label="0" style="height:40px;line-height: 40px;">否</el-radio>
			</div>
			<span slot="footer" class="dialog-footer">
				<el-button @click="centerDialogVisible = false">取 消</el-button>
				<el-button type="primary" @click="confirm">确 定</el-button>
			</span>
		</el-dialog>
		<el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="params.page"
		 :page-sizes="[10]" :page-size="params.pageSize" layout="total, sizes, prev, pager, next, jumper" :total="total">
		</el-pagination>
	</div>

</template>

<script>
	import {
		getRole
	} from '@/api/permission'
	import {
		queryAdmin
	} from '@/api/permission'
	import {
		addAdmin
	} from '@/api/permission'
	import {
		updateAdmin
	} from '@/api/permission'
	export default {
		data() {
			return {
				packData: [],
				centerDialogVisible: false,
				params:{
					adminAccount:'',
					adminPassword: '',
					adminAccountName: '',
					roleId:null,
					status: null,
					phone:'',
					page:0,
					pageSize:20
				},
				options: [],
				value: [],
				cascaderKey: 0,
				title: '',
				showname:'',
				menuId:'',
				type:'',
				total:null,
				id:null,
				// selectStatus:{
				// 	adminAccount:'',
				// 	adminPassword:'',
				// 	adminAccountName:'',
				// 	roleId:null,
				// 	status:'',
				// 	phone:'',
				// 	page:0,
				// 	pageSize:20
				// }
			}
		},
		mounted() {
			this.selectAllmenu()
			this.getRole()
		},
		methods: {
			//添加菜单
			addmenu(type) {
				console.log(type)
				for(var key in this.params){
				    delete this.params[key];
				}
				console.log(this.params)
				this.title = "添加管理员"
				this.type=type
				// console.log(this.type)
				// this.params.id=null
				// this.params.orderNum=0,
				// this.params.name='',
				// this.params.url='',
				// this.params.parentId=null,
				// this.valueString=[]
				// this.params.status=null,
				// this.params.type=null
				this.centerDialogVisible = true
			},
			//编辑管理员
			handleEdit(index,row,select) {
				console.log(row)
				this.type=select
				this.title="修改信息"
				this.params.adminAccountName=row.adminAccountName
				this.params.roleId = row.roleId
				this.params.status = row.status
				this.params.phone=row.phone
				this.id=row.id
				this.centerDialogVisible = true
			},
			handleSizeChange(val) {
				this.params.pageSize = val
			},
			handleCurrentChange(val) {
				this.params.page = val
				this.selectAllmenu()
			},
			//确认添加菜单
			confirm() {
				if(this.type=='select'){
					console.log(this.params)
					if(this.params.adminAccountName!=''&&this.params.roleId!=''&&this.params.status!=null&&this.params.phone!=''){
						updateAdmin({
							id:this.id,
							adminAccountName:this.params.adminAccountName,
							roleId:this.params.roleId,
							status:this.params.status,
							phone:this.params.phone,
						}).then(res => {
							console.log(res)
							this.centerDialogVisible=false
							this.params.adminAccountName=''
							this.params.roleId=null
							this.params.status=null
							this.params.phone=''
							this.selectAllmenu()
						})
					}else{
						this.$message.warning("修改信息不能为空！");
					}
				}
				if(this.type=='add'){
					if(this.params.adminAccount!=''&&this.params.adminPassword!=''&&this.params.adminAccountName!=''&&this.params.roleId!=null&&this.params.status!=null&&this.params.phone!=''){
						queryAdmin({
							adminAccount:this.params.adminAccount,
							page:1,
							pageSize:30,
						}).then(res => {
							console.log(res)
							if(res.data.length==0){
								addAdmin(this.params).then(res => {
									console.log(res)
									this.centerDialogVisible=false
									this.selectAllmenu()
								})
							}else{
								this.$message.warning('账号已存在,请更换新账号！')
							}
						})
					}else{
						this.$message.warning("添加信息不能为空！");
					}
					
					console.log(this.params)
					// if(this.params.adminAccount!=''&&this.params.adminPassword!=''&&this.params.adminAccountName!=''&&this.params.roleId!=null&&this.params.status!=null&&this.params.phone!=''){
					// 	addAdmin(this.params).then(res => {
					// 		console.log(res)
					// 		this.centerDialogVisible=false
					// 		this.selectAllmenu()
					// 	})
					// }else{
					// 	this.$message.warning("添加信息不能为空！");
					// }
					
				}

			},
			//查询所有账号
			selectAllmenu() {
				this.packData = []
				queryAdmin(this.params).then(res => {
					console.log(res)
					this.packData=res.data
					this.total=res.total
				})
			},
			//查找角色信息
			getRole(){
				getRole({
					status:1,
				}).then(res => {
					console.log(res)
					this.options = res.data
				})
			}
		}
	}
</script>

<style scoped="scoped">
	.addmenu {
		color: #409eff;
		background: #ecf5ff;
		border-color: #b3d8ff;
		margin-bottom: 10px;
	}
	.input1{
		height:40px;line-height: 40px;
	}
</style>
