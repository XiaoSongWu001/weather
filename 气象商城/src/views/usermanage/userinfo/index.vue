<template>
	<div>
		<div class="typetop">
			投诉搜索:
			<el-input placeholder="请输入用户名或账号" clearable style="width: 200px;margin: 0 10px;" v-model="inputtext">
			</el-input>
			<el-select v-model="value" filterable placeholder="请选择">
				<el-option v-for="item in options" :key="item" :label="item" :value="item">
				</el-option>
			</el-select>
			<el-button type="primary" icon="el-icon-search" style="margin-left: 10px;" size="mini">搜索</el-button>
			<el-button type="primary" style="margin-left: 10px;" @click="addproduct" size="mini">添加</el-button>
		</div>
		<el-container>
			<el-table :data="userData" border style="width: 100%;margin-bottom: 10px;" height="710" max-height="780" v-loading="tableLoading"
			 element-loading-text="正在拼命加载中。。。。">
				<el-table-column prop="id" label="序号" min-width="8%" align="center"></el-table-column>
				<el-table-column prop="orderNum" label="时间" min-width="20%" align="center" :sortable="'custom'"></el-table-column>
				<el-table-column prop="orderNum" label="账号" min-width="10%" align="center"></el-table-column>
				<el-table-column prop="img" label="头像" min-width="10%" align="center">
					<template slot-scope="scope">
						<img src="../../../assets/face.jpg" alt="" style="width: 32px;height: 32px;">
					</template>
				</el-table-column>
				<el-table-column prop="orderNum" label="用户名" min-width="10%" align="center"> </el-table-column>
				<el-table-column prop="orderNum" label="投诉概况" min-width="30%" align="center"></el-table-column>
				<el-table-column prop="orderNum" label="账号状态" min-width="10%" align="center"></el-table-column>
				<el-table-column label="操作" min-width="17%" align="center">
					<template slot-scope="scope">
						<el-button size="mini" type="primary" class="rowA4" @click="editproduct">编辑</el-button>
						<el-button size="mini" type="success" class="rowA5" @click="detail">详细</el-button>
					</template>
				</el-table-column>
			</el-table>
		</el-container>

		<el-dialog :title="title" :visible.sync="centerDialogVisible" width="50%" center>
			<!-- 订单信息 -->
			<div style="margin-bottom: 20px;border: 1px solid #DCDCDC;">
				<div class="cols" style="padding-left:20px;font-size: 14px;font-weight: 800;height: 40px;line-height: 40px;background:#DCDCDC;">
					订单信息
				</div>
				<div class="cols cols1">
					<div style="width: 10%;text-align: right;">昵称：</div>
					<div style="width: 50%;color: seagreen;">王二蛋操蛋</div>
					<div style="width: 10%;text-align: right;">账号：</div>
					<div style="width: 30%;font-weight: bolder;">123454545</div>
				</div>
				<div class="cols cols1">
					<div style="width: 10%;text-align: right;">真实姓名：</div>
					<div style="width: 50%;color: seagreen;">王二狗</div>
					<div style="width: 10%;text-align: right;">累计积分：</div>
					<div style="width: 30%;font-weight: bolder;">2000</div>
				</div>
				<div class="cols cols1">
					<div style="width: 10%;text-align: right;">联系电话：</div>
					<div style="width: 50%;color: seagreen;">4545454152</div>
					<div style="width: 10%;text-align: right;">有效积分：</div>
					<div style="width: 30%;font-weight: bolder;">2000</div>
				</div>
				<div class="cols cols1">
					<div style="width: 10%;text-align: right;">收货地址：</div>
					<div style="width: 50%;color: seagreen;">重庆市渝中区两路口希尔顿大厦</div>
					<div style="width: 10%;text-align: right;">性别：</div>
					<div style="width: 30%;font-weight: bolder;">男</div>
				</div>
				<div class="cols cols1">
					<div style="width: 10%;text-align: right;">地区：</div>
					<div style="width: 50%;color: seagreen;">重庆市南岸区</div>
					<div style="width: 10%;text-align: right;">出生日期：</div>
					<div style="width: 30%;font-weight: bolder;">2017-03-20</div>
				</div>
				<div class="cols cols1">
					<div style="width: 10%;text-align: right;">兴趣：</div>
					<div style="width: 90%;color: seagreen;">篮球 羽毛球 乒乓球</div>
				</div>
				<div class="cols cols1">
					<div style="width: 10%;text-align: right;">个性说明：</div>
					<div style="width: 90%;color: seagreen;">这个人很懒，什么都没有留下</div>
				</div>
				<div class="cols cols1">
					<div style="width: 10%;text-align: right;">账号绑定：</div>
					<div style="width: 90%;color: seagreen;">156465441341</div>
				</div>
				<div class="cols cols1">
					<div style="width: 10%;text-align: right;">推广人：</div>
					<div style="width: 50%;color: seagreen;">无</div>
					<div style="width: 10%;">推广码：</div>
					<div style="width: 30%;">6523451</div>
				</div>
			</div>
			<div style="padding-bottom: 20px;border: 1px solid #DCDCDC;">
				<div class="cols" style="padding-left:20px;font-size: 14px;font-weight: 800;height: 40px;line-height: 40px;background:#DCDCDC;">
					其它信息
				</div>
				<div style="display: flex;justify-content: space-around;">
					<div class="othercontent">
						<div style="line-height: 60px;text-align: center;">总计订单<span style=" margin-left: 5px;width: 15px;height: 15px;background: #1890FF;display: inline-block;line-height: 15px;font-size: 7px;">笔</span></div>
						<div style="line-height: 20px;text-align: center;color: #1890FF;">123</div>
					</div>
					<div class="othercontent">
						<div style="line-height: 60px;text-align: center;">总计使用积分</div>
						<div style="line-height: 20px;text-align: center;color: #1890FF;">5000</div>
					</div>
					<div class="othercontent">
						<div style="line-height: 60px;text-align: center;">本月订单<span style=" margin-left: 5px;width: 15px;height: 15px;background: #1890FF;display: inline-block;line-height: 15px;font-size: 7px;">笔</span></div>
						<div style="line-height: 20px;text-align: center;color: #1890FF;">23</div>
					</div>
					<div class="othercontent">
						<div style="line-height: 60px;text-align: center;">本月使用积分</div>
						<div style="line-height: 20px;text-align: center;color: #1890FF;">123</div>
					</div>
				</div>
				<div style="display: flex;margin-top: 20px;border: 1px solid #B9B9B9;">
					<div @click="changeAfford(1)" :class="changenum==1?'afford1':'afford'">消费能力</div>
					<div @click="changeDetail(2)" :class="changenum==2?'afford1':'afford'">积分明细</div>
					<div @click="changeCoupons(3)" :class="changenum==3?'afford1':'afford'">持有优惠券</div>
					<div @click="changePromote(4)" :class="changenum==4?'afford1':'afford'">推广明细</div>
					<div @click="changeAddress(5)" :class="changenum==5?'afford1':'afford'">地址管理</div>
					<div @click="changeCollect(6)" :class="changenum==6?'afford1':'afford'">收藏管理</div>
				</div>
				<div style="margin-top: 10px;" v-if="changenum==1">
					<el-table :data="affordData" border style="width: 100%"
					 :header-cell-style="{background:'#eef1f6',color:'#606266','text-align':'center'}"
					 :cell-style="{'text-align':'center'}">
						<el-table-column prop="asn" label="订单编号" min-width="15%"></el-table-column>
						<el-table-column prop="asn" label="收货人" min-width="15%"></el-table-column>
						<el-table-column prop="supplier_name" label="商品数量" min-width="15%"></el-table-column>
						<el-table-column prop="dock" label="商品总价" min-width="15%"></el-table-column>
						<el-table-column prop="arrive_time" label="实付金额" min-width="15%"></el-table-column>
						<el-table-column prop="arrive_time" label="交易完成时间" min-width="20%"></el-table-column>
					</el-table>
				</div>
				<div style="margin-top: 10px;" v-if="changenum==2">
					<el-table :data="detailData" border style="width: 100%"
					 :header-cell-style="{background:'#eef1f6',color:'#606266','text-align':'center'}"
					 :cell-style="{'text-align':'center'}">
						<el-table-column prop="asn" label="来源/用途" min-width="20%"></el-table-column>
						<el-table-column prop="asn" label="积分变化" min-width="20%"></el-table-column>
						<el-table-column prop="supplier_name" label="变化后积分" min-width="20%"></el-table-column>
						<el-table-column prop="dock" label="日期" min-width="20%"></el-table-column>
						<el-table-column prop="arrive_time" label="备注" min-width="20%"></el-table-column>
					</el-table>
				</div>
				<div style="margin-top: 10px;" v-if="changenum==3">
					<el-table :data="couponsData" border style="width: 100%"
					 :header-cell-style="{background:'#eef1f6',color:'#606266','text-align':'center'}"
					 :cell-style="{'text-align':'center'}">
						<el-table-column prop="asn" label="优惠券名称" min-width="20%"></el-table-column>
						<el-table-column prop="asn" label="面值" min-width="20%"></el-table-column>
						<el-table-column prop="supplier_name" label="有效期" min-width="20%"></el-table-column>
						<el-table-column prop="dock" label="所需积分" min-width="20%"></el-table-column>
						<el-table-column prop="arrive_time" label="兑换时间" min-width="20%"></el-table-column>
					</el-table>
				</div>
				<div style="margin-top: 10px;" v-if="changenum==4">
					<el-table :data="promoteData" border style="width: 100%"
					 :header-cell-style="{background:'#eef1f6',color:'#606266','text-align':'center'}"
					 :cell-style="{'text-align':'center'}">
						<el-table-column prop="asn" label="昵称" min-width="20%"></el-table-column>
						<el-table-column prop="asn" label="余额" min-width="20%"></el-table-column>
						<el-table-column prop="supplier_name" label="积分" min-width="20%"></el-table-column>
						<el-table-column prop="dock" label="加入时间" min-width="20%"></el-table-column>
						<el-table-column prop="arrive_time" label="兑换时间" min-width="20%"></el-table-column>
					</el-table>
				</div>
				<div style="margin-top: 10px;" v-if="changenum==5">
					<el-table :data="addressData" border style="width: 100%"
					 :header-cell-style="{background:'#eef1f6',color:'#606266','text-align':'center'}"
					 :cell-style="{'text-align':'center'}">
						<el-table-column prop="asn" label="收件地址" min-width="20%"></el-table-column>
						<el-table-column prop="asn" label="收件人" min-width="20%"></el-table-column>
						<el-table-column prop="supplier_name" label="联系电话" min-width="20%"></el-table-column>
						<el-table-column prop="dock" label="收件人邮编" min-width="20%"></el-table-column>
						<el-table-column prop="arrive_time" label="操作" min-width="20%">
							<template>
								<img src="" alt="">
							</template>
						</el-table-column>
					</el-table>
				</div>
				<div style="margin-top: 10px;" v-if="changenum==6">
					<el-table :data="collectData" border style="width: 100%"
					 :header-cell-style="{background:'#eef1f6',color:'#606266','text-align':'center'}"
					 :cell-style="{'text-align':'center'}">
						<el-table-column prop="asn" label="收藏内容ID" min-width="20%"></el-table-column>
						<el-table-column prop="asn" label="收藏标题" min-width="20%"></el-table-column>
						<el-table-column prop="supplier_name" label="收藏时间" min-width="20%"></el-table-column>
						<el-table-column prop="dock" label="收藏类型" min-width="20%"></el-table-column>
						<el-table-column prop="arrive_time" label="操作" min-width="20%">
							<template>
								<img src="" alt="">
							</template>
						</el-table-column>
					</el-table>
				</div>
			</div>
		<!-- 	<span slot="footer" class="dialog-footer">
				<el-button @click="centerDialogVisible = false">取 消</el-button>
				<el-button type="primary" @click="confirm">确 定</el-button>
			</span> -->
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
				options: ['正常', '封停7天', '封停1个月'],
				inputtext: '',
				userData: [{
					orderNum: '123',
				}],
				affordData:[],
				detailData:[],
				couponsData:[],
				promoteData:[],
				addressData:[],
				collectData:[],
				value: '',
				switchinput: true,
				tableLoading: false,
				centerDialogVisible: false,
				title: '',
				showpage: true,
				total: 0,
				//对话框中的添加字段
				params: {
					orderNum: '',
					radio: '',
					page_size: 10,
					page: 1,
				},
				changenum:1
			}
		},
		methods: {
			addproduct() {
				this.centerDialogVisible = true
				this.title = "添加商品"
			},
			editproduct() {
				this.title = "编辑商品"
				this.centerDialogVisible = true
			},
			detail() {
				this.title = "用户——个人信息"
				this.centerDialogVisible = true
			},
			confirm() {
				this.$message.success("点了确定")
			},
			//页码
			handleSizeChange(val) {
				this.params.page_size = val
			},
			handleCurrentChange(val) {
				this.params.page = val
				this.selectorder()
			},
			changeAfford(num){
				this.changenum=num
			},
			changeDetail(num){
				this.changenum=num
			},
			changeCoupons(num){
				this.changenum=num
			},
			changePromote(num){
				this.changenum=num
			},
			changeAddress(num){
				this.changenum=num
			},
			changeCollect(num){
				this.changenum=num
			},
		}

	}
</script>

<style>
	.typetop {
		margin: 20px 20px;
	}

	.cols {
		padding-left: 20px;
		font-size: 14px;
		height: 35px;
		line-height: 35px;
		border-bottom: 1px solid #F8F8F8;
	}

	.cols1 {
		display: flex;
	}

	.el-dialog__header {
		border-bottom: 1px solid black;
		text-align: left;
	}

	.othercontent {
		width: 100px;
		height: 100px;
		background: #DDE9F6;
		box-shadow: 0px 3px 6px rgba(0, 0, 0, 0.16);
		margin-top: 10px;
	}

	.afford {
		width: 17%;
		background: #DEDBDE;
		height: 40px;
		line-height: 40px;
		text-align: center;
		cursor: pointer;
	}
	.afford1{
		width: 17%;
		height: 40px;
		line-height: 40px;
		text-align: center;
		background: white;
		cursor: pointer;
	}
</style>
