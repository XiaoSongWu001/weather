<template>
	<div>
		<div class="typetop">
			所有分类:
			<el-select v-model="value" filterable placeholder="请选择">
				<el-option v-for="item in options" :key="item" :label="item" :value="item">
				</el-option>
			</el-select>
			<el-input placeholder="请输入内容" clearable style="width: 200px;margin-left: 10px;" v-model="inputtext">
			</el-input>
			<el-button type="primary" icon="el-icon-search" style="margin-left: 10px;">搜索</el-button>
			<el-button size="small" style="margin-left: 10px;" @click="dealermanage">经销商管理</el-button>
			<el-button size="small" style="margin-left: 10px;" @click="profitcompare">利润配比</el-button>
			<el-button size="small" style="margin-left: 10px;" @click="adddealer">添加经销商</el-button>
		</div>
		<el-container>
			<el-table :data="dealerData" border style="width: 100%;margin-bottom: 10px;" height="710" max-height="780"
			 v-loading="tableLoading" element-loading-text="正在拼命加载中。。。。" v-if="changebutton==0">
				<el-table-column prop="id" label="序号" min-width="8%" align="center"></el-table-column>
				<el-table-column prop="orderNum" label="加入者" min-width="20%" align="center"></el-table-column>
				<el-table-column prop="orderNum" label="加入地区" min-width="20%" align="center"></el-table-column>
				<el-table-column prop="orderNum" label="是否通过" min-width="20%" align="center">
					<template slot-scope="scope">
						<el-switch v-model="switchinput" active-color="#13ce66" :active-value="1" :inactive-value="0" @change="changeswitch">
						</el-switch>
					</template>
				</el-table-column>
				<el-table-column prop="orderNum" label="经销商电话" min-width="20%" align="center"></el-table-column>
				<el-table-column prop="orderNum" label="代理等级" min-width="10%" align="center"></el-table-column>
				<el-table-column prop="orderNum" label="可提现金额" min-width="10%" align="center"> </el-table-column>
				<el-table-column prop="orderNum" label="分销配比" min-width="10%" align="center"></el-table-column>
				<el-table-column prop="orderNum" label="库存" min-width="10%" align="center"></el-table-column>
				<el-table-column prop="orderNum" label="上级代理" min-width="17%" align="center"></el-table-column>
				<el-table-column label="操作" min-width="25%" align="center">
					<template slot-scope="scope">
						<el-button size="mini" type="primary" class="rowA4" @click="editproduct">编辑</el-button>
						<el-button size="mini" type="success" class="rowA4" @click="editproduct">详细</el-button>
						<el-button size="mini" type="danger" class="rowA5">删除</el-button>
					</template>
				</el-table-column>
			</el-table>
		</el-container>
		<el-container>
			<el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="params.page"
			 :page-sizes="[10]" :page-size="params.page_size" layout="total, sizes, prev, pager, next, jumper" :total="total"
			 v-show="showpage" v-if="changebutton==0">
			</el-pagination>
		</el-container>
		<el-dialog :title="title" :visible.sync="centerDialogVisible" width="30%" center>
			<div style="display:flex;margin-top: 20px;">
				<span style="width: 100px;height:40px;line-height: 40px;">经销商姓名：</span>
				<el-input v-model="params.orderNum" placeholder="请输入内容" style="width: 400px;"></el-input>
			</div>
			<div style="display:flex;margin-top: 20px;">
				<span style="width: 100px;height:40px;line-height: 40px;">联系方式：</span>
				<el-input v-model="params.orderNum" placeholder="请输入内容" style="width: 400px;"></el-input>
			</div>
			<div style="display:flex;margin-top: 20px;">
				<span style="width: 100px;height:40px;line-height: 40px;">经销商等级：</span>
				<el-select v-model="params.level" filterable placeholder="请选择">
					<el-option v-for="item in levelList" :key="item" :label="item" :value="item">
					</el-option>
				</el-select>
			</div>
			<div style="display:flex;margin-top: 20px;">
				<span style="width: 100px;height:40px;line-height: 40px;">所在地区：</span>
				<el-select v-model="params.area" filterable placeholder="请选择">
					<el-option v-for="item in areaList" :key="item" :label="item" :value="item">
					</el-option>
				</el-select>
			</div>
			<div style="display:flex;margin-top: 20px;">
				<span style="width: 100px;height:40px;line-height: 40px;">父级经销商</span>
				<el-input v-model="params.orderNum" style="width: 400px;"></el-input>
			</div>
			<div style="display:flex;margin-top: 20px;">
				<span style="width: 100px;height:40px;line-height: 40px;">经销商利润比</span>
				<el-input v-model="params.orderNum" style="width: 400px;"></el-input>
			</div>
			<div style="display:flex;margin-top: 20px;">
				<span style="width: 100px;height:40px;line-height: 40px;">可提现金额</span>
				<el-input v-model="params.orderNum" style="width: 400px;"></el-input>
			</div>
			<div style="display:flex;margin-top: 20px;">
				<span style="width: 100px;height:40px;line-height: 40px;">可出售量</span>
				<el-input v-model="params.orderNum" style="width: 400px;"></el-input>
			</div>

			<span slot="footer" class="dialog-footer">
				<el-button @click="centerDialogVisible = false">取 消</el-button>
				<el-button type="primary" @click="confirm">确 定</el-button>
			</span>
		</el-dialog>
		<el-container>
			<div style="margin: 20px 10px;display: flex;" v-if="changebutton==1">
				<div style="width: 420px;">
					<div>
						<span>一级代理：</span>
						<el-input v-model="one" placeholder="请输入比例" style="width: 300px;"></el-input>
					</div>
					<div style="margin-top: 20px;">
						<span>二级代理：</span>
						<el-input v-model="one" placeholder="请输入比例" style="width: 300px;"></el-input>
					</div>
					<div style="margin-top: 20px;">
						<span>三级代理：</span>
						<el-input v-model="one" placeholder="请输入比例" style="width: 300px;"></el-input>
					</div>
				</div>
				<div style="width: 100px;">
					<img src="../../../assets/warning1.png" alt="" style="width: 64px;height: 64px;margin-left: 20px;margin-top:40px;">
				</div>
				<div style="width: 300px;">
					<div>
						<span>比例值说明：<br>
						<p style="text-indent:2em"> 为保证各代理利润和地区保护，仅提供三
								级代理，输入框中所输入的比例值为利润
								的%n，即输入框中输入n值即可(1-100)
								之间，这仅作为各级代理默认比例，您还
								可根据实际情况在经销商管理中对代理单
								独设置利润比例。</p>
						</span>
					</div>
				</div>
			</div>
			
		</el-container>
	</div>
</template>

<script>
	export default {
		data() {
			return {
				options: ['sss', '123', 'asd'],
				areaList:['渝中','渝西','渝北'],
				levelList:['一级','二级','三级'],
				inputtext: '',
				dealerData: [{
					orderNum: '123'
				}],
				changebutton:0,
				value: '',
				switchinput: true,
				tableLoading: false,
				centerDialogVisible: false,
				title: '',
				showpage: true,
				total: 0,
				//对话框中的添加字段
				params: {
					level:'',
					area:'',
					orderNum: '',
					radio: '',
					page_size: 10,
					page: 1,
				},
				one:'',
				two:'',
				three:''
			}
		},
		methods: {
			adddealer() {
				this.changebutton=2
				this.centerDialogVisible = true
				this.title = "添加经销商"
			},
			//利润配比
			profitcompare(){
				this.changebutton=1
			},
			//经销商管理
			dealermanage(){
				this.changebutton=0
			},
			editproduct() {
				this.centerDialogVisible = true
				this.title = "编辑商品"
			},
			confirm() {
				this.$message.success("点了确定")
			},
			//对话框中上传图片的方法
			handleRemove(file, fileList) {
				console.log(file, fileList);
			},
			//页码
			handleSizeChange(val) {
				this.params.page_size = val
			},
			handleCurrentChange(val) {
				this.params.page = val
				this.selectorder()
			},
			changeswitch(value) {
				console.log(value)
				if(value==1){
					this.$message.success("上架成功！")
				}else{
					this.$message.success("下架成功！")
				}
			}
		}

	}
</script>

<style>
	.typetop {
		margin: 20px 20px;
	}
</style>
