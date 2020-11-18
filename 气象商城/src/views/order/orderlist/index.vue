<template>
	<div class="app-container">
		<div style="background: white;margin-bottom: 10px;padding: 10px;box-shadow: 0px 5px 10px rgba(0, 0, 0, 0.1);">
			<div style="border-bottom:1px solid #f6f6f6;padding: 10px;">
				搜索条件
			</div>
			<div style="display:flex;padding-left: 20px;margin: 10px 0;">
				<span style="height:30px;line-height: 30px;margin-right: 20px;">订单状态:</span>
				<el-button size="small" @click="status(null)" :class="{'hover':typenum==10}">全部</el-button>
				<el-button size="small" @click="status(3)" :class="{'hover':typenum==3}">待付款</el-button>
				<el-button size="small" @click="status(0)" :class="{'hover':typenum==0}">待发货</el-button>
				<el-button size="small" @click="status(2)" :class="{'hover':typenum==2}">已收货</el-button>
				<el-button size="small" @click="status(1)" :class="{'hover':typenum==1}">已发货</el-button>
				<el-button size="small" @click="status(6)" :class="{'hover':typenum==6}">交易完成</el-button>
				<el-button size="small" @click="status(-1)" :class="{'hover':typenum==-1}">退款中</el-button>
				<el-button size="small" @click="status(-2)" :class="{'hover':typenum==-2}">已退款</el-button>
			</div>
			<!-- <div style="display:flex;padding-left: 20px;margin-bottom: 10px;">
				<span style="height:30px;line-height: 30px;margin-right: 20px;">订单类型:</span>
				<el-button size="small" @click="type(0)" :class="{'hover':typenum1==0}">全部</el-button>
				<el-button size="small" @click="type(1)" :class="{'hover':typenum1==1}">普通订单</el-button>
				<el-button size="small" @click="type(2)" :class="{'hover':typenum1==2}">拼团订单</el-button>
				<el-button size="small" @click="type(3)" :class="{'hover':typenum1==3}">秒杀订单</el-button>
			</div> -->
			<!-- <div style="display:flex;padding-left: 20px;margin-bottom: 10px;">
				<span style="height:30px;line-height: 30px;margin-right: 20px;">创建时间:</span>
				<el-button size="small" @click="time(0)" :class="{'hover':typenum2==0}">全部</el-button>
				<el-button size="small" @click="time(1)" :class="{'hover':typenum2==1}">昨天</el-button>
				<el-button size="small" @click="time(2)" :class="{'hover':typenum2==2}">今天</el-button>
				<el-button size="small" @click="time(3)" :class="{'hover':typenum2==3}">本周</el-button>
				<el-button size="small" @click="time(4)" :class="{'hover':typenum2==4}">本月</el-button>
				<el-button size="small" @click="time(5)" :class="{'hover':typenum2==5}">本季度</el-button>
				<el-button size="small" @click="time(6)" :class="{'hover':typenum2==6}">本年</el-button>
				<el-button size="small" @click="time(7)" :class="{'hover':typenum2==7}">本周</el-button>
			</div> -->
			<div style="display:flex;padding-left: 20px;margin: 10px 0;">
				<span style="height:30px;line-height: 30px;letter-spacing: 4px;margin-right: 20px;">订单号:</span>
				<el-input placeholder="请输入订单编号" style="width: 400px;" v-model="paramsData.orderName"></el-input>
				<el-button type="primary" size="mini" style="margin-left:10px;" @click="orderselect">查询</el-button>
			</div>
		</div>
		<!-- <div style="margin-bottom: 10px;box-shadow: 0px 5px 10px rgba(0, 0, 0, 0.1);display: flex;justify-content: space-between;">
			<div style="width: 16%;height: 100px;font-size: 14px;margin-right: 5px;background: white;">
				<div style="padding: 10px;border-bottom: 1px solid #f6f6f6;">
					<span>订单数量</span>
					<span style="text-align: center;line-height:20px;float: right;width: 30px;height: 20px;background: #1E9FFF;color: white">件</span>
				</div>
				<div style="padding-top: 20px;padding-left: 10px;">
					<span style="font-size: 20px;">{{total}}</span>
				</div>
			</div>
			<div style="width: 16%;height: 100px;font-size: 14px;background: white;">
				<div style="padding: 10px;border-bottom: 1px solid #f6f6f6;">
					<span>售出商品</span>
					<span style="text-align: center;line-height:20px;float: right;width: 30px;height: 20px;background: #1E9FFF;color: white">件</span>
				</div>
				<div style="padding-top: 20px;padding-left: 10px;">
					<span style="font-size: 20px;">105</span>
				</div>
			</div>
			<div style="width: 16%;height: 100px;font-size: 14px;background: white;">
				<div style="padding: 10px;border-bottom: 1px solid #f6f6f6;">
					<span>订单金额</span>
					<span style="text-align: center;line-height:20px;float: right;width: 30px;height: 20px;background: #1E9FFF;color: white">元</span>
				</div>
				<div style="padding-top: 20px;padding-left: 10px;">
					<span style="font-size: 20px;">15625.2</span>
				</div>
			</div>
			<div style="width: 16%;height: 100px;font-size: 14px;background: white;">
				<div style="padding: 10px;border-bottom: 1px solid #f6f6f6;">
					<span>退款金额</span>
					<span style="text-align: center;line-height:20px;float: right;width: 30px;height: 20px;background: #1E9FFF;color: white">元</span>
				</div>
				<div style="padding-top: 20px;padding-left: 10px;">
					<span style="font-size: 20px;">4552.9</span>
				</div>
			</div>
			<div style="width: 16%;height: 100px;font-size: 14px;background: white;">
				<div style="padding: 10px;border-bottom: 1px solid #f6f6f6;">
					<span>微信支付金额</span>
					<span style="text-align: center;line-height:20px;float: right;width: 30px;height: 20px;background: #1E9FFF;color: white">元</span>
				</div>
				<div style="padding-top: 20px;padding-left: 10px;">
					<span style="font-size: 20px;">2309.04</span>
				</div>
			</div>
			<div style="width: 16%;height: 100px;font-size: 14px;background: white;">
				<div style="padding: 10px;border-bottom: 1px solid #f6f6f6;">
					<span>余额支付金额</span>
					<span style="text-align: center;line-height:20px;float: right;width: 30px;height: 20px;background: #1E9FFF;color: white">元</span>
				</div>
				<div style="padding-top: 20px;padding-left: 10px;">
					<span style="font-size: 20px;">13412.04</span>
				</div>
			</div>
		</div> -->

		<div style="background: white;">
			<div style="border-bottom:1px solid #f6f6f6;padding: 10px;">
				订单列表
			</div>
			<div style="width: 100%;">
				<el-table :data="orderlistdata" border style="width: 98%;margin: 10px auto;" height="710" max-height="780"
				 v-loading="tableLoading" element-loading-text="正在拼命加载中。。。。">
					<el-table-column prop="orderName" label="订单号" min-width="30%" align="center"></el-table-column>
					<el-table-column label="商品信息" min-width="50%">
						<template slot-scope="scope">
							<img v-if="scope.row.orderDetails[0].recommendImage!=null&&scope.row.orderDetails[0].recommendImage!=''" :src="url1+scope.row.orderDetails[0].recommendImage" style="width: 30px;height: 30px;float: left;" />
							<span style="height: 30px;line-height: 30px;text-align: left;">{{scope.row.orderDetails[0].productName}}</span><br />
							<!-- <span style="display: block;float: left;height: 30px;line-height: 30px;">价格：{{scope.row.orderDetails[0].productPrice}}</span> -->
						</template>
					</el-table-column>
					<el-table-column prop="payPrice" label="总价格" min-width="9%" align="center"></el-table-column>
					<el-table-column prop="practicalPrice" label="实际支付" min-width="10%" align="center"> </el-table-column>
					<el-table-column prop="payPostage" label="邮费" min-width="10%" align="center"></el-table-column>
					<el-table-column prop="createTime" label="创建时间" min-width="17%" align="center"></el-table-column>
					<el-table-column prop="payTime" label="支付时间" min-width="17%" align="center"></el-table-column>
					<el-table-column prop="orderProductCount" label="数量" min-width="15%" align="center"></el-table-column>
					<el-table-column label="订单状态" min-width="15%" align="center">
						<template slot-scope="scope">
							<span v-if="scope.row.orderState==-1">申请退款</span>
							<span v-else-if="scope.row.orderState==-2">退款成功</span>
							<span v-else-if="scope.row.orderState==0">待发货</span>
							<span v-else-if="scope.row.orderState==1">已发货</span>
							<span v-else-if="scope.row.orderState==2">已收货</span>
							<span v-else-if="scope.row.orderState==3">待付款</span>
						</template>
					</el-table-column>
					<el-table-column label="操作" min-width="25%" align="center">
						<template slot-scope="scope">
							<el-button icon="el-icon-s-promotion" size="mini" type="primary" @click="send(scope.$index, scope.row)" v-if="scope.row.orderState==0">去发货</el-button>
							<el-button icon="el-icon-truck" size="mini" type="primary" @click="update(scope.$index, scope.row)" v-if="scope.row.orderState==1">修改快递单号</el-button>
							<el-button icon="el-icon-truck" size="mini" type="primary" @click="logistics(scope.$index, scope.row)" v-if="scope.row.orderState==1">物流信息</el-button>
							<!-- <el-dropdown trigger="click" @command="handleCommand">
								<el-button size="mini" type="primary" style="margin-left: 10px;">
									操作<i class="el-icon-arrow-down el-icon--right"></i>
								</el-button>
								<el-dropdown-menu slot="dropdown">
									<el-dropdown-item icon="el-icon-refresh-right" :command="beforeHandleCommand(scope.$index, scope.row,'orderrefund')">订单退款</el-dropdown-item>
									<el-dropdown-item icon="el-icon-bicycle" :command="beforeHandleCommand(scope.$index, scope.row,'ordersend')">订单发货</el-dropdown-item>
									<el-dropdown-item icon="el-icon-tickets" :command="beforeHandleCommand(scope.$index, scope.row,'orderremark')">订单备注</el-dropdown-item>
									<el-dropdown-item icon="el-icon-edit-outline" :command="beforeHandleCommand(scope.$index, scope.row,'orderupdate')">订单修改</el-dropdown-item>
									<el-dropdown-item icon="el-icon-notebook-2" :command="beforeHandleCommand(scope.$index, scope.row,'orderrecord')">订单记录</el-dropdown-item>
									<el-dropdown-item icon="el-icon-s-claim" :command="beforeHandleCommand(scope.$index, scope.row,'orderdetail')">订单详细</el-dropdown-item>
									<el-dropdown-item icon="el-icon-s-claim" :command="beforeHandleCommand(scope.$index, scope.row,'confirmgoods')">确认收货</el-dropdown-item>
								</el-dropdown-menu>
							</el-dropdown> -->
						</template>
					</el-table-column>
				</el-table>
				<el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="paramsData.page"
				 :page-sizes="[10]" :page-size="paramsData.pageSize" layout="total, sizes, prev, pager, next, jumper" :total="total"
				 v-show="showpage">
				</el-pagination>
			</div>
		</div>
		<!-- 物流信息 -->
		<el-dialog :title="title" :visible.sync="logisticDialog" width="30%" center>
			<div>
				<span style="margin-right: 5px;">{{expName}}</span>
				<span>{{number}}</span>
			</div>
			<!-- <div style="margin-top: 20px;">物流信息</div> -->
			<div style="display:flex;margin-top: 20px;">
				<el-timeline>
				   <el-timeline-item
				     v-for="(activity, index) in activities"
				     :timestamp="activity.time">
				     {{activity.status}}
				   </el-timeline-item>
				 </el-timeline>
			</div>
		</el-dialog>
		
		<el-dialog :title="title" :visible.sync="centerDialogVisible" :width="width" center @close="closeDialog">
			<!-- 订单发货 -->
			<div v-if="changebutton==0">
				<div style="display:flex;padding-left: 20px;margin-bottom: 20px;">
					<span style="height:40px;line-height: 40px;letter-spacing: 10px;">订单号:</span>
					<el-input v-model="orderName" :disabled="true" placeholder="请输入内容" style="width: 300px;margin-left: 5px;height:40px;line-height: 40px;"></el-input>
				</div>
				<div style="display:flex;padding-left: 20px;margin-bottom: 20px;">
					<span style="height:40px;line-height: 40px;">物流公司名称:</span>
					<el-select @change="selectModel($event)" style="width: 300px;margin-left: 5px;height:40px;line-height: 40px;" v-model="paramsOrderSend.expressName" filterable placeholder="请选择">
						<el-option v-for="item in optionsList" :key="item.id" :label="item.expressName" :value="item.id">
						</el-option>
					</el-select>
				</div>
				<div style="display:flex;padding-left: 20px;margin-bottom: 20px;">
					<span style="height:40px;line-height: 40px;letter-spacing: 6px;">快递单号:</span>
					<el-input v-model="paramsOrderSend.expressOddnumbers" placeholder="请输入内容" style="width: 300px;margin-left: 5px;height:40px;line-height: 40px;"></el-input>
				</div>
				<!-- <div style="display:flex;padding-left: 20px;margin-bottom: 20px;">
					<span style="height:40px;line-height: 40px;">快递公司编码:</span>
					<el-select style="width: 300px;margin-left: 5px;" v-model="paramsOrderSend.expressCode" filterable placeholder="请选择">
						<el-option v-for="item in optionsList" :key="item.id" :label="item.expressCode" :value="item.expressCode">
						</el-option>
					</el-select>
				</div> -->

				<!-- <div style="display:flex;padding-left: 20px;margin-bottom: 20px;">
					<span style="height:40px;line-height: 40px;letter-spacing: 2px;">收货人地址:</span>
					<el-input v-model="params.orderNum" placeholder="请输入内容" style="width: 300px;margin-left: 5px;"></el-input>
				</div>
				<div style="display:flex;padding-left: 20px;margin-bottom: 20px;">
					<span style="height:40px;line-height: 40px;letter-spacing: 4px;">快递备注:</span>
					<el-input v-model="params.orderNum" placeholder="请输入内容" style="width: 300px;margin-left: 5px;"></el-input>
				</div>
				<div style="display:flex;padding-left: 20px;margin-bottom: 20px;">
					<span style="height:40px;line-height: 40px;letter-spacing: 8px;">邮编:</span>
					<el-input v-model="params.orderNum" placeholder="请输入内容" style="width: 300px;margin-left: 25px;"></el-input>
				</div> -->
				<div style="width: 100%;text-align: center;">
					<span slot="footer">
						<el-button @click="centerDialogVisible = false" size="mini">取 消</el-button>
						<el-button type="primary" @click="confirm('send')" size="mini">确 定</el-button>
					</span>
				</div>
			</div>
			<div v-else-if="changebutton==1">
				<div style="display:flex;margin-bottom: 20px;">
					<el-input v-model="params.orderNum" placeholder="请输入备注内容" style="width: 500px;margin-left: 25px;" type="textarea"
					 :rows="7"></el-input>
				</div>
				<div style="width: 100%;text-align: center;">
					<span slot="footer">
						<el-button @click="centerDialogVisible = false" size="mini">取 消</el-button>
						<el-button type="primary" @click="confirm" size="mini">确 定</el-button>
					</span>
				</div>
			</div>
			<div v-else-if="changebutton==2">
				<div style="display:flex;padding-left: 20px;margin-bottom: 20px;">
					<span style="height:40px;line-height: 40px;letter-spacing: 4px;">总价:</span>
					<el-input v-model="params.orderNum" placeholder="请输入内容" style="width: 300px;margin-left: 20px;"></el-input>
				</div>
				<div style="display:flex;padding-left: 20px;margin-bottom: 20px;">
					<span style="height:40px;line-height: 40px;letter-spacing: 4px;">邮费:</span>
					<el-input v-model="params.orderNum" placeholder="请输入内容" style="width: 300px;margin-left: 20px;"></el-input>
				</div>
				<div style="display:flex;padding-left: 20px;margin-bottom: 20px;">
					<span style="height:40px;line-height: 40px;">实际价格:</span>
					<el-input v-model="params.orderNum" placeholder="请输入内容" style="width: 300px;margin-left: 5px;"></el-input>
				</div>
				<div style="display:flex;padding-left: 20px;margin-bottom: 20px;">
					<span style="height:40px;line-height: 40px;">实际邮费:</span>
					<el-input v-model="params.orderNum" placeholder="请输入内容" style="width: 300px;margin-left: 5px;"></el-input>
				</div>
				<div style="display:flex;padding-left: 20px;margin-bottom: 20px;">
					<span style="height:40px;line-height: 40px;">积分兑换:</span>
					<el-input v-model="params.orderNum" placeholder="请输入内容" style="width: 300px;margin-left: 5px;"></el-input>
				</div>
				<div style="width: 100%;text-align: center;">
					<span slot="footer">
						<el-button @click="centerDialogVisible = false" size="mini">取 消</el-button>
						<el-button type="primary" @click="confirm" size="mini">确 定</el-button>
					</span>
				</div>
			</div>
			<div v-else-if="changebutton==3">
				<el-table :data="orderRecordData" border stripe style="width: 100%">
					<el-table-column prop="date" label="订单编号" min-width="20%">
					</el-table-column>
					<el-table-column prop="name" label="操作记录" min-width="40%">
					</el-table-column>
					<el-table-column prop="address" label="操作时间" min-width="20%">
					</el-table-column>
				</el-table>
				<div style="width: 100%;text-align: center;margin-top: 10px;">
					<span slot="footer">
						<el-button @click="centerDialogVisible = false" size="mini">取 消</el-button>
						<el-button type="primary" @click="confirm" size="mini">确 定</el-button>
					</span>
				</div>
			</div>
			<!-- 删除弹框 -->
			<div v-else-if="changebutton==4">
				<div style="width: 60px;margin: 20px auto;">
					<img src="../../../assets/warning2.png" style="width: 60px;height: 60px;" alt="">
				</div>
				<div style="width: 100%;margin: 20px auto;text-align: center;">
					<span v-if="isReceive" style="color: #FF9100;font-weight: 800;font-size: 15px;">是否确认状态将状态改为已收货，更改后无法测回</span>
					<span v-else style="color: #FF9100;font-weight: 800;font-size: 15px;">是否退款12元，退款后无法测回，请谨慎操作！</span>
				</div>
				<div style="width: 100%;text-align: center;">
					<span slot="footer">
						<el-button @click="centerDialogVisible = false" size="mini">取 消</el-button>
						<el-button type="primary" @click="confirm" size="mini">确 定</el-button>
					</span>
				</div>
			</div>
			<!-- 订单退款 -->
			<div v-else-if="changebutton==6">
				<div style="display:flex;padding-left: 20px;margin-bottom: 20px;">
					<span style="height:40px;line-height: 40px;">退款单号:</span>
					<el-input v-model="params.id" placeholder="请输入内容" :disabled="true" style="width: 300px;margin-left: 5px;"></el-input>
				</div>
				<div style="display:flex;padding-left: 20px;margin-bottom: 20px;">
					<span style="height:40px;line-height: 40px;">退款金额:</span>
					<el-input v-model="params.money" placeholder="请输入金额" style="width: 100px;margin-left: 5px;"></el-input>
				</div>
				<div style="width: 100%;text-align: center;">
					<span slot="footer">
						<el-button type="primary" @click="confirm('refund')" size="mini" icon="el-icon-sell" style="width: 80%;">提 交</el-button>
					</span>
				</div>
			</div>
			<!-- 订单详细 -->
			<div v-else>
				<!-- 收货信息 -->
				<div style="margin-bottom: 20px;border: 1px solid #DCDCDC;">
					<div class="cols" style="padding-left:20px;font-size: 14px;font-weight: 800;height: 40px;line-height: 40px;background:#DCDCDC;">
						收货信息
					</div>
					<div class="cols">
						收货人昵称：王二蛋操蛋
					</div>
					<div class="cols">
						收货人姓名：王二蛋
					</div>
					<div class="cols">
						收货人电话：124545454454
					</div>
					<div class="cols">
						收货人地址：重庆市渝中区希尔顿
					</div>
				</div>
				<!-- 订单信息 -->
				<div style="margin-bottom: 20px;border: 1px solid #DCDCDC;">
					<div class="cols" style="padding-left:20px;font-size: 14px;font-weight: 800;height: 40px;line-height: 40px;background:#DCDCDC;">
						订单信息
					</div>
					<div class="cols cols1">
						<div style="width: 50%;">订单编号：王二蛋操蛋</div>
						<div style="width: 50%;">订单状态：代发货</div>
					</div>
					<div class="cols cols1">
						<div style="width: 50%;">商品数量：1</div>
						<div style="width: 50%;">商品总价：25.2</div>
					</div>
					<div class="cols cols1">
						<div style="width: 50%;">支付邮费：2.0</div>
						<div style="width: 50%;">优惠券金额：10.5</div>
					</div>
					<div class="cols cols1">
						<div style="width: 50%;">实际支付：222</div>
						<div style="width: 50%;">创建时间：2020-09-21 09:44:56</div>
					</div>
					<div class="cols cols1">
						<div style="width: 50%;">支付方式：支付宝支付</div>
						<div style="width: 50%;">商家备注：无</div>
					</div>
					<div class="cols cols1">
						<div style="width: 50%;">推广人：无</div>
						<div style="width: 50%;">买家备注：无</div>
					</div>
				</div>
				<!-- 物流信息 -->
				<div style="margin-bottom: 20px;border: 1px solid #DCDCDC;">
					<div class="cols" style="padding-left:20px;font-size: 14px;font-weight: 800;height: 40px;line-height: 40px;background:#DCDCDC;">
						备注信息
					</div>
					<div class="cols">
						<div style="width: 50%;">暂无备注信息</div>
					</div>
				</div>
			</div>
		</el-dialog>
	</div>
</template>

<script>
	import {
		queryOrder
	} from '@/api/order'
	import {
		deliverGoods
	} from '@/api/order'
	import {
		getLogisticsCompany
	} from '@/api/order'
	//物流信息获取
	import {
		logisticsInfo
	} from '@/api/order'
	export default {
		data() {
			return {
				url1: this.IMGURL.baseUrl,
				orderRecordData: [{
					date: '2016-05-02',
					name: '王小虎',
					address: '上海市普陀区金沙江路 1518 弄'
				}, {
					date: '2016-05-04',
					name: '王小虎',
					address: '上海市普陀区金沙江路 1517 弄'
				}, {
					date: '2016-05-01',
					name: '王小虎',
					address: '上海市普陀区金沙江路 1519 弄'
				}, {
					date: '2016-05-03',
					name: '王小虎',
					address: '上海市普陀区金沙江路 1516 弄'
				}],
				orderlistdata: [],
				showpage: true,
				total: 0,
				tableLoading: false,
				title: '',
				orderName:'',
				paramsOrderSend: {
					id: null,
					expressCode: '',
					expressName: '',
					expressOddnumbers: '',
				},
				params: {
					money: 1024,
					orderNum: '',
					id: 'wx2019032717512010015'
				},
				width: '30%',
				centerDialogVisible: false,
				logisticDialog:false,
				activities:[],
				expName:'',
				number:'',
				typenum: 0,
				typenum1: 0,
				typenum2: 0,
				paramsData: {
					orderName: '',
					orderState: null,
					pageSize: 15,
					page: 1,
				},
				orderId:'',//订单号
				changebutton: -1,
				isReceive: true,
				optionsList:[],
			}
		},
		watch: {},

		methods: {
			send(index, row){
				console.log(row)
				this.title = "订单发货"
				this.width = '30%'
				this.changebutton = 0
				this.paramsOrderSend.id=row.id
				this.orderName=row.orderName
				this.paramsOrderSend.expressName=''
				this.paramsOrderSend.expressOddnumbers=''
				this.centerDialogVisible = true
			},
			closeDialog(){
				// this.paramsOrderSend.expressName=''
				// this.paramsOrderSend.expressOddnumbers=''
			},
			update(index, row){
				console.log(row)
				this.title = "修改订单"
				this.width = '30%'
				this.changebutton = 0
				this.paramsOrderSend.id=row.id
				this.paramsOrderSend.expressCode=row.expressCode
				this.paramsOrderSend.expressName=row.expressName
				this.paramsOrderSend.expressOddnumbers=row.expressOddnumbers
				this.orderName=row.orderName
				this.centerDialogVisible = true
			},
			// 物流信息
			logistics(index,row){
				this.title = "物流信息"
				console.log(row)
				this.orderId=row.orderName
				logisticsInfo(this.orderId).then(res => {
					console.log(res)
					this.activities=res.data.list
					this.expName=res.data.expName
					this.number=res.data.number
					this.title='物流信息'
					this.logisticDialog=true
				})
			},
			ordersend(index, row) {
				console.log(row)
				this.orderName=row.orderName
				this.paramsOrderSend.id=row.id
			},
			beforeHandleCommand(index, row, command) {
				return {
					'index': index,
					'row': row,
					'command': command
				}
			},
			handleCommand(command) {
				if (command.command == "ordersend") {
					this.title = "订单发货"
					this.width = '30%'
					this.changebutton = 0
					this.ordersend(command.index,command.row)
				} else if (command.command == "orderremark") {
					this.title = "订单备注"
					this.width = '30%'
					this.changebutton = 1
				} else if (command.command == "orderupdate") {
					this.title = "订单修改"
					this.changebutton = 2
					this.width = '30%'
				} else if (command.command == "orderrecord") {
					this.width = '50%'
					this.title = "订单记录"
					this.changebutton = 3
				} else if (command.command == 'confirmgoods') {
					this.isReceive = true
					this.title = "确认收货"
					this.changebutton = 4
					this.width = '30%'
				} else if (command.command == 'orderrefund') {
					this.title = "订单退款"
					this.changebutton = 6
					this.width = '30%'
				} else if (command.command == 'orderdetail') {
					this.title = "订单详细"
					this.changebutton = 5
					this.width = '70%'
				}
				this.centerDialogVisible = true
			},
			confirm(type) {
				if (type == 'refund') {
					this.isReceive = false
					this.changebutton = 4
				} else if (type == 'send') {
					this.changebutton = 0
					deliverGoods(this.paramsOrderSend).then(res => {
						console.log(res)
						if(res.code==200){
							if(res.data!=null){
								if(res.data.list.length!=0){
									this.activities=res.data.list
									this.expName=res.data.expName
									this.number=res.data.number
									this.logisticDialog=true
								}
							}
						}
						this.orderselect()
						
					})
				}
				this.centerDialogVisible = false
			},
			selectModel(id){
				console.log(id)
			        let obj = {};
			        let selectModel = {};
			        obj = this.optionsList.find((item)=>{//model就是上面的数据源
			          if(item.id === id){
						  console.log(item)
						  this.paramsOrderSend.expressName=item.expressName
						  this.paramsOrderSend.expressCode=item.expressCode
			          }
			        });
					console.log(this.paramsOrderSend)
			    },
			//物流公司信息查询
			getLogisticsCompany(){
				getLogisticsCompany().then(res => {
					console.log(res)
					this.optionsList=res.data
				})
			},
			formatDate(date) {
				if(date == null){
					return null
				}
				var date = new Date(date);
				var y = date.getFullYear();
				var m = date.getMonth() + 1;
				var d = date.getDate();
				var h = date.getHours();
				var mi = date.getMinutes();
				m = m > 9 ? m : '0' + m;
				d = d > 9 ? d : '0' + d;
				h = h > 9 ? h : '0' + h;
				mi = mi > 9 ? mi : '0' + mi;
				return y + '-' + m + '-' + d + ' ' + h + ':' + mi;
			},
			//表格订单查询
			orderselect() {
				queryOrder(this.paramsData).then(res => {
					console.log(res)
					for (let i = 0; i < res.data.length; i++) {
						res.data[i].createTime = this.formatDate(res.data[i].createTime)
						res.data[i].payTime = this.formatDate(res.data[i].payTime)
					}
					this.orderlistdata = res.data
					this.total=res.total
				})
			},
			status(num) {
				this.typenum = num
				this.paramsData.orderState = num
			},
			type(num) {
				this.typenum1 = num
				console.log(num)
			},
			time(num) {
				this.typenum2 = num
				console.log(num)
			},
			//页码
			handleSizeChange(val) {
				this.paramsData.pageSize = val
			},
			handleCurrentChange(val) {
				this.paramsData.page = val
				this.orderselect()
			},
			// 订单详细
			// detail(index, row) {
			// 	this.title = "订单详细"
			// 	this.changebutton = 5
			// 	this.width = '70%'
			// 	this.centerDialogVisible = true
			// },
		},
		mounted() {
			this.getLogisticsCompany()
		}
	}
</script>
<style scoped="scoped">
	.hover {
		background: #ecf5ff;
		color: #409eff;
		border: 1px solid #c6e2ff;
	}

	.el-dialog__header {
		border-bottom: 1px solid black;
		text-align: left;
	}

	.app-container {
		background: #f3f3f4;
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
</style>
