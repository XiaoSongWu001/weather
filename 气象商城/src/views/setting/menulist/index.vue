<template>
	<div>
		<el-container>
			<el-button size="small" @click="addmenu('add')" class="addmenu">添加菜单</el-button>
		</el-container>
		<el-container>
			<el-table :data="packData" style="width: 100%" row-key="id" border lazy>
				<el-table-column prop="name" label="菜单名称" min-width="15%">
				</el-table-column>
				<el-table-column prop="url" label="访问路径" min-width="20%">
				</el-table-column>
				<el-table-column prop="perms" label="权限标识" min-width="10%">
				</el-table-column>
				<el-table-column prop="status" label="是否可用" min-width="15%">
					<template slot-scope="scope">
						<span v-if="scope.row.status=== 1">
							<el-tag type="success" disable-transitions>是</el-tag>
						</span>
						<span v-else>
							<el-tag type="danger" disable-transitions>否</el-tag>
						</span>
					</template>
				</el-table-column>
				<el-table-column prop="orderNum" label="排序号" min-width="15%"></el-table-column>
				<el-table-column prop="createTime" label="创建时间" min-width="15%">
				</el-table-column>
				<el-table-column label="操作" min-width="20%" align="center">
					<template slot-scope="scope">
						<el-button size="mini" @click="handleEdit(scope.$index, scope.row,'select')">编辑</el-button>
					</template>
				</el-table-column>
			</el-table>
			
		</el-container>
		<el-dialog :title="title" :visible.sync="centerDialogVisible" width="30%" center>
			<div style="display:flex;margin-top: 20px;">
				<span style="width: 100px;height:40px;line-height: 40px;">菜单名称</span>
				<el-input v-model="params.name" placeholder="请输入内容" style=""></el-input>
			</div>
			<div style="display:flex;margin-top: 20px;">
				<span style="width: 100px;height:40px;line-height: 40px;">访问路径</span>
				<el-input v-model="params.url" placeholder="请输入内容" style=""></el-input>
			</div>
			<div style="display:flex;margin-top: 20px;">
				<span style="width: 100px;height:40px;line-height: 40px;">排序号</span>
				<el-input v-model="params.orderNum" style=""></el-input>
			</div>
			<div style="display:flex;margin-top: 20px;">
				<span style="width: 100px;height:40px;line-height: 40px;">图标设置</span>
				<el-input v-model="params.icon" placeholder="请输入内容" style=""></el-input>
			</div>
			<div style="display:flex;margin-top: 20px;">
				<span style="width: 100px;height:40px;line-height: 40px;">上级</span>
				<div style="width: 100%;">
					<el-cascader v-model="valueString" :placeholder="showname" :key="cascaderKey" :options="options" :props="{label: 'name',value:'id',checkStrictly: true}"></el-cascader>
				</div>
			</div>
			<div style="display:flex;margin-top: 20px;">
				<span style="width: 100px;height:40px;line-height: 40px;">是否可用</span>
				<el-radio v-model="params.status" :label="1" style="height:40px;line-height: 40px;">是</el-radio>
				<el-radio v-model="params.status" :label="0" style="height:40px;line-height: 40px;">否</el-radio>
			</div>
			<div style="display:flex;margin-top: 20px;">
				<span style="width: 100px;height:40px;line-height: 40px;">资源类型</span>
				<el-radio v-model="params.type" :label="1" style="height:40px;line-height: 40px;">接口</el-radio>
				<el-radio v-model="params.type" :label="0" style="height:40px;line-height: 40px;">菜单</el-radio>
			</div>
			<div style="display:flex;margin-top: 20px;" v-if="params.type==1">
				<span style="width: 100px;height:40px;line-height: 40px;">权限标识</span>
				<el-input v-model="params.perms" style=""></el-input>
			</div>
			<span slot="footer" class="dialog-footer">
				<el-button @click="centerDialogVisible = false">取 消</el-button>
				<el-button type="primary" @click="confirm">确 定</el-button>
			</span>
		</el-dialog>
	</div>

</template>

<script>
	import {
		getPermission
	} from '@/api/permission'
	import {
		addPermission
	} from '@/api/permission'
	import {
		updatePermission
	} from '@/api/permission'
	export default {
		data() {
			return {
				packData: [],
				centerDialogVisible: false,
				params:{
					id:null,
					name:'',
					url: '',
					orderNum: 0,
					parentId:null,
					type:null,
					status: null,
					perms:'',
					icon:'',
				},
				options: [],
				value: [],
				valueString: [],
				cascaderKey: 0,
				title: '',
				showname:'',
				menuId:'',
				type:'',
				selectStatus:{}
			}
		},
		mounted() {
			this.selectAllmenu()
		},
		methods: {
			//添加菜单
			addmenu(type) {
				console.log(type)
				this.title = "菜单添加"
				this.type=type
				console.log(this.type)
				this.params.id=null
				this.params.orderNum=0,
				this.params.name='',
				this.params.url='',
				this.params.parentId=null,
				this.valueString=[]
				this.params.status=null,
				this.params.type=null,
				this.params.icon=''
				this.centerDialogVisible = true
			},
			//编辑菜单
			handleEdit(index,row,select) {
				console.log(row)
				this.type=select
				this.title="编辑菜单"
				this.params.id=row.id
				this.params.name = row.name
				this.params.url = row.url
				this.params.perms=row.perms
				this.params.icon=row.icon
				if(row.status==1){
					this.params.status = 1
				}else{
					this.params.status = 0
				}
				if(row.type==1){
					this.params.type = 1
				}else{
					this.params.type = 0
				}
				this.params.orderNum = row.orderNum
				if(row.parentId==0){
					this.valueString=['0']
					this.showname='顶级目录'
					console.log(this.valueString)
				}else{
					for(var i=0;i<this.packData.length;i++){
						if(this.packData[i].id==row.parentId){
							this.showname=this.packData[i].name
							this.valueString=[this.packData[i].id]
						}
					}
				}
				this.centerDialogVisible = true
			},
			//确认添加菜单
			confirm() {
				if(this.type=='select'){
					if (this.valueString.length > 0) {
						this.params.parentId = this.valueString[this.valueString.length - 1]
					}
					console.log(this.params)
					if(this.params.name!=''&&this.valueString.length!=0&&this.type!=null){
						updatePermission(this.params).then(res => {
							console.log(res)
							this.centerDialogVisible=false
							++this.cascaderKey
							this.selectAllmenu()
						})
					}else{
						this.$message.warning("修改菜单不能为空！");
					}
				}
				if(this.type=='add'){
					console.log(this.valueString)
					if (this.valueString.length > 0) {
						this.params.parentId = this.valueString[this.valueString.length - 1]
					}
					console.log(this.params)
					if(this.params.name!=''&&this.valueString.length!=0&&this.type!=null){
						addPermission(this.params).then(res => {
							console.log(res)
							this.centerDialogVisible=false
							++this.cascaderKey
							this.selectAllmenu()
						})
					}else{
						this.$message.warning("添加菜单不能为空！");
					}
					
				}

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
			//查询所有菜单
			selectAllmenu() {
				this.options = []
				this.packData = []
				getPermission(this.selectStatus).then(res => {
					console.log(res)
					var arr = {
						name: '顶级目录',
						id: '0'
					}
					this.options.push(arr)
					for (var i = 0; i < res.data.length; i++) {
						if(res.data[i].children){
							for(var j=0;j<res.data[i].children.length;j++){
								res.data[i].children[j].createTime = this.formatDate(res.data[i].children[j].createTime)
								if(res.data[i].children[j].children){
									for(var k=0;k<res.data[i].children[j].children.length;k++){
										res.data[i].children[j].children[k].createTime = this.formatDate(res.data[i].children[j].children[k].createTime)
									}
								}
							}
						}
						res.data[i].createTime = this.formatDate(res.data[i].createTime)
						this.options.push(res.data[i])
					}
					this.packData=res.data
				})
			},
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
