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
			<el-button type="primary" style="margin-left: 10px;" @click="addproduct">添加</el-button>
		</div>
		<el-container>
			<el-table :data="announceData" border style="width: 100%;margin-bottom: 10px;" height="710" max-height="780"
			 v-loading="tableLoading" element-loading-text="正在拼命加载中。。。。" @selection-change="handleSelectionChange">
				<el-table-column label="选择" min-width="10%" align="center" type="selection"></el-table-column>
				<el-table-column prop="id" label="序号" min-width="8%" align="center"></el-table-column>
				<el-table-column prop="orderNum" label="加入者" min-width="20%" align="center" :sortable="'custom'">
					<template slot-scope="scope">
						<el-link @click="showasndata1(scope.row)" type="primary">
							{{scope.row.asn}}
						</el-link>
					</template>
				</el-table-column>
				<el-table-column prop="orderNum" label="加入地区" min-width="20%" align="center"></el-table-column>
				<el-table-column prop="orderNum" label="代理等级" min-width="10%" align="center"></el-table-column>
				<el-table-column prop="orderNum" label="可提现金额" min-width="10%" align="center"> </el-table-column>
				<el-table-column prop="orderNum" label="分销配比" min-width="10%" align="center"></el-table-column>
				<el-table-column prop="orderNum" label="库存" min-width="10%" align="center"></el-table-column>
				<el-table-column prop="orderNum" label="上级代理" min-width="17%" align="center">
					<template slot-scope="scope">
						<el-switch v-model="switchinput" active-color="#13ce66" :active-value="1" :inactive-value="0" @change="changeswitch">
						</el-switch>
					</template>
				</el-table-column>
				<el-table-column label="操作" min-width="17%" align="center">
					<template slot-scope="scope">
						<el-button size="mini" type="primary" class="rowA4" @click="editproduct">编辑</el-button>
						<el-button size="mini" type="primary" class="rowA5">删除</el-button>
					</template>
				</el-table-column>
			</el-table>
		</el-container>

		<el-dialog :title="title" :visible.sync="centerDialogVisible" width="60%" center>
			<div style="display:flex;padding-left: 20px;">
				<span style="height:40px;line-height: 40px;">当前活动:</span>
				<el-input v-model="params.orderNum" placeholder="请输入内容" style="width: 300px;margin-left: 5px;"></el-input>
				<el-button type="primary" style="margin-left: 20px;">删除</el-button>
			</div>
			<div style="display: flex;border-bottom: 1px solid #B3C0D1;padding: 20px;justify-content: space-between;">
				<div style="display: flex;">
					<span style="height:40px;line-height: 40px;letter-spacing: 3px;">起始量:</span>
					<el-input v-model="params.orderNum" placeholder="请输入内容" style="width: 200px;margin-left: 5px;"></el-input>
				</div>
				<div style="display: flex;">
					<span style="height:40px;line-height: 40px;letter-spacing: 3px;">结束量:</span>:
					<el-input v-model="params.orderNum" placeholder="请输入内容" style="width: 200px;margin-left: 5px;"></el-input>
				</div>
				<div style="display: flex;">
					<span style="height:40px;line-height: 40px;letter-spacing: 5px;">价格:</span>
					<el-input v-model="params.orderNum" placeholder="请输入内容" style="width: 200px;margin-left: 5px;"></el-input>
				</div>
			</div>
			<div style="display:flex;padding-left: 20px;margin-top: 20px;">
				<span style="height:40px;line-height: 40px;">当前活动:</span>
				<el-input v-model="params.orderNum" placeholder="请输入内容" style="width: 300px;margin-left: 5px;"></el-input>
				<el-button type="primary" style="margin-left: 20px;">删除</el-button>
			</div>
			<div style="display: flex;border-bottom: 1px solid #B3C0D1;padding: 20px;justify-content: space-between;">
				<div style="display: flex;">
					<span style="height:40px;line-height: 40px;">秒杀价格:</span>
					<el-input v-model="params.orderNum" placeholder="请输入内容" style="width: 200px;margin-left: 5px;"></el-input>
				</div>
				<div style="display: flex;">
					<span style="height:40px;line-height: 40px;">限定数量:</span>:
					<el-input v-model="params.orderNum" placeholder="请输入内容" style="width: 200px;margin-left: 5px;"></el-input>
				</div>
				<div style="display: flex;">
					<span style="height:40px;line-height: 40px;">先订购买:</span>
					<el-input v-model="params.orderNum" placeholder="请输入内容" style="width: 200px;margin-left: 5px;"></el-input>
				</div>
			</div>
			<span slot="footer" class="dialog-footer">
				<el-button @click="centerDialogVisible = false">取 消</el-button>
				<el-button type="primary" @click="confirm">确 定</el-button>
			</span>
		</el-dialog>
		<el-container class="pagec">
			<el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="params.page"
			 :page-sizes="[10]" :page-size="params.page_size" layout="total, sizes, prev, pager, next, jumper" :total="total"
			 v-show="showpage">
			</el-pagination>
		</el-container>
	</div>
</template>

<script>
	export default {
		data() {
			return {
				options: ['sss', '123', 'asd'],
				inputtext: '',
				announceData: [{
					orderNum: '123'
				}],
				value: '',
				switchinput: true,
				tableLoading: false,
				centerDialogVisible: false,
				title: '',
				//对话框中的图片上传
				dialogImageUrl: '',
				dialogVisible: false,
				showpage: true,
				total: 0,
				//对话框中的添加字段
				params: {
					orderNum: '',
					radio: '',
					page_size: 10,
					page: 1,
				}
			}
		},
		methods: {
			handleSelectionChange(val) {
				console.log(val)
			},
			addproduct() {
				this.centerDialogVisible = true
				this.title = "添加商品"
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

<style scoped="scoped">
	.typetop {
		margin: 20px 20px;
	}
</style>
