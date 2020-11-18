<template>
	<div>
		<el-container>
			<el-button size="small" @click="adduser" class="addmenu">添加角色</el-button>
		</el-container>
		<el-container>
			<el-table :data="roleData" style="width: 100%" border="" max-height="780" height="710">
				<el-table-column min-width="15%" prop="roleName" label="角色名" align="center"></el-table-column>
				<el-table-column min-width="35%" prop="description" label="权限名称" align="center"></el-table-column>
				<el-table-column label="状态" min-width="10%">
					<template slot-scope="scope">
						<span v-if="scope.row.status=== 1">
							<el-tag type="success" disable-transitions>正常</el-tag>
						</span>
						<span v-else>
							<el-tag type="danger" disable-transitions>禁用</el-tag>
						</span>
					</template>
				</el-table-column>
				<el-table-column min-width="35%" prop="createTime" label="创建时间" align="center"></el-table-column>
				<el-table-column label="操作" min-width="20%" align="center">
					<template slot-scope="scope">
						<el-button size="mini" @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
					</template>
				</el-table-column>
			</el-table>
		</el-container>
		<!-- <el-container class="pagec">
			<el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="params.page"
			 :page-sizes="[10]" :page-size="params.pageSize" layout="total, sizes, prev, pager, next, jumper" :total="total"
			 v-show="showpage">
			</el-pagination>
		</el-container> -->
		<el-dialog title="添加角色" :visible.sync="centerDialogVisible" width="30%" center @close="closeDialog">
			<div style="display:flex;margin-top: 20px;">
				<span style="width: 100px;height:40px;line-height: 40px;">角色名称</span>
				<el-input v-model="rolename" placeholder="请输入角色名称" style=""></el-input>
			</div>
			<div style="display:flex;margin-top: 20px;">
				<span style="width: 100px;height:40px;line-height: 40px;">权限</span>
				<el-tree :data="datadescriprion" show-checkbox node-key="id" 
				 :props="{label: 'name',value:'id'}" ref="tree">
				</el-tree>
			</div>
			<div style="display:flex;margin-top: 20px;">
				<span style="width: 100px;height:40px;line-height: 40px;">是否禁用</span>
				<el-radio v-model="status" :label="1" style="height:40px;line-height: 40px;">正常</el-radio>
				<el-radio v-model="status" :label="0" style="height:40px;line-height: 40px;">禁用</el-radio>
			</div>
			<!-- <div style="display:flex;margin-top: 20px;">
				<span style="width: 100px;height:40px;line-height: 40px;">是否为管理员</span>
				<el-radio v-model="isAdmin" label="1" style="height:40px;line-height: 40px;">是</el-radio>
				<el-radio v-model="isAdmin" label="0" style="height:40px;line-height: 40px;">否</el-radio>
			</div> -->
			<span slot="footer" class="dialog-footer">
				<el-button @click="cancel">取 消</el-button>
				<el-button type="primary" @click="confirm">确 定</el-button>
			</span>
		</el-dialog>
		
		<el-dialog title="编辑角色" :visible.sync="centerDialogVisible1" width="30%" center @close="closeDialog1">
			<div style="display:flex;margin-top: 20px;">
				<span style="width: 100px;height:40px;line-height: 40px;">角色名称</span>
				<el-input v-model="rolename" placeholder="请输入角色名称" style=""></el-input>
			</div>
			<div style="display:flex;margin-top: 20px;">
				<span style="width: 100px;height:40px;line-height: 40px;">权限</span>
				<el-tree :data="datadescriprion" show-checkbox node-key="id" 
				 :props="{label: 'name',value:'id'}" ref="tree1" :default-checked-keys="editList">
				</el-tree>
			</div>
			<div style="display:flex;margin-top: 20px;">
				<span style="width: 100px;height:40px;line-height: 40px;">是否禁用</span>
				<el-radio v-model="status" :label="1" style="height:40px;line-height: 40px;">正常</el-radio>
				<el-radio v-model="status" :label="0" style="height:40px;line-height: 40px;">禁用</el-radio>
			</div>
			<!-- <div style="display:flex;margin-top: 20px;">
				<span style="width: 100px;height:40px;line-height: 40px;">是否为管理员</span>
				<el-radio v-model="isAdmin" label="1" style="height:40px;line-height: 40px;">是</el-radio>
				<el-radio v-model="isAdmin" label="0" style="height:40px;line-height: 40px;">否</el-radio>
			</div> -->
			<span slot="footer" class="dialog-footer">
				<el-button @click="cancel">取 消</el-button>
				<el-button type="primary" @click="confirm1">确 定</el-button>
			</span>
		</el-dialog>
		
	</div>

</template>

<script>
	import {
		getPermission
	} from '@/api/permission'
	import {
		addRole
	} from '@/api/permission'
	import {
		getRole
	} from '@/api/permission'
	import {
		updateRole
	} from '@/api/permission'
	import {
		queryRole
	} from '@/api/permission'
	export default {
		mounted() {
			this.selectAllrole()
		},
		data() {
			return {
				roleData: [],
				menuData: [],
				centerDialogVisible: false,
				centerDialogVisible1:false,
				rolename: '',
				isValid: '',
				description: '',
				menuId: '',
				datadescriprion: '',
				roleId:null,
				status: null,
				values: '',
				treeList: [],
				editList:[],
				roleId:'',
				// isAdmin:'',
				selectStatus:{}
			}
		},
		methods: {
			//改变页数
			handleSizeChange(val) {
				this.params.pageSize = val
			},
			handleCurrentChange(val) {
				this.params.page = val
				this.selectAllrole()
			},
			//关闭弹出框
			closeDialog(){
				this.$refs.tree.setCheckedNodes([])
			},
			closeDialog1(){
				this.$refs.tree1.setCheckedNodes([])
			},
			//选中树形节点
			change(value) {
				console.log(this.values)
				console.log(value)
			},
			adduser() {
				this.rolename=''
				this.centerDialogVisible = true
			},
			cancel(){
				this.$refs.tree.setCheckedNodes([])
				this.centerDialogVisible1 = false
			},
			//添加角色
			confirm() {
				this.treeList = []
				this.description=''
				for (var i = 0; i < this.$refs.tree.getCheckedNodes().length; i++) {
					if(this.$refs.tree.getCheckedNodes().length-1 == i){
						this.treeList.push(this.$refs.tree.getCheckedNodes()[i].id)
						this.description += this.$refs.tree.getCheckedNodes()[i].name
					}else{
						this.treeList.push(this.$refs.tree.getCheckedNodes()[i].id)
						this.description += this.$refs.tree.getCheckedNodes()[i].name+','
					}
					
				}
				for (var i = 0; i < this.$refs.tree.getHalfCheckedNodes().length; i++) {
						this.treeList.push(this.$refs.tree.getHalfCheckedNodes()[i].id)
						this.description +=","+this.$refs.tree.getHalfCheckedNodes()[i].name
				}
				// console.log(this.treeList)
				// console.log(this.description)
				addRole({
					roleName: this.rolename,
					status: this.status,
					description: this.description,
					permissionIds: this.treeList,
				}).then(res => {
					console.log(res)
					this.centerDialogVisible=false
					this.selectAllrole()
					this.$refs.tree.setCheckedNodes([])
				})
			},
			
			//编辑角色
			confirm1() {
				this.treeList = []
				this.description=''
				for (var i = 0; i < this.$refs.tree1.getCheckedNodes().length; i++) {
					if(this.$refs.tree1.getCheckedNodes().length-1 == i){
						this.treeList.push(this.$refs.tree1.getCheckedNodes()[i].id)
						this.description += this.$refs.tree1.getCheckedNodes()[i].name
					}else{
						this.treeList.push(this.$refs.tree1.getCheckedNodes()[i].id)
						this.description += this.$refs.tree1.getCheckedNodes()[i].name+','
					}
					
				}
				for (var i = 0; i < this.$refs.tree1.getHalfCheckedNodes().length; i++) {
						this.treeList.push(this.$refs.tree1.getHalfCheckedNodes()[i].id)
						this.description +=","+this.$refs.tree1.getHalfCheckedNodes()[i].name
				}
				if(this.rolename!=''&&this.status!=null&&this.description!=''&&this.treeList.length!=0){
					updateRole({
						roleId:this.roleId,
						roleName: this.rolename,
						status: this.status,
						description: this.description,
						permissionIds: this.treeList,
					}).then(res => {
						console.log(res)
						this.centerDialogVisible1=false
						this.selectAllrole()
					})
				}else{
					this.$message.warning('修改信息不允许为空')
				}
				
			},
			
			handleEdit(index, row) {
				console.log(row)
				this.editList=[]
				this.roleId=row.roleId
				queryRole(row.roleId).then(res => {
					console.log(res)
					this.rolename=res.data.roleName
					this.description=res.data.description
					this.editList=res.data.permissionIds
					if(row.status==1){
						this.status = 1
					}else{
						this.status = 0
					}
				})
				this.centerDialogVisible1=true
				console.log(this.editList)
			},
			formatDate(date) {
				var date = new Date(date);
				var y = date.getFullYear();
				var m = date.getMonth() + 1;
				var d = date.getDate();
				var h = date.getHours();
				var mi = date.getMinutes();
				m = m > 9 ? m : '0' + m;
				d = d > 9 ? d : '0' + d;
				mi = mi > 9 ? mi : '0' + mi;
				return y + '-' + m + '-' + d + ' ' + h + ':' + mi;
			},
			selectAllrole() {
				this.roleData = []
				getRole({
					status:null,
					roleName:''
				}).then(res => {
					console.log(res)
					this.roleData = res.data
					for (var i = 0; i < res.data.length; i++) {
						res.data[i].createTime = this.formatDate(res.data[i].createTime)
					}
				})
				getPermission(this.selectStatus).then(res => {
					console.log(res)
					this.datadescriprion = res.data
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
</style>
