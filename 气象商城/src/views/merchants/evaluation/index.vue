<template>
	<div class="app-container">
		<div class="typetop">
			评价搜索:
			<el-input size="medium" placeholder="请输入评论内容" clearable style="width: 200px;margin-left: 10px;" v-model="comments">
			</el-input>
			<el-button size="mini" type="primary" icon="el-icon-search" style="margin-left: 10px;">搜索</el-button>
		</div>
		<div style="display:flex;margin: 10px 0;">
			<span style="height:30px;line-height: 30px;margin-right: 20px;">状态类型:</span>
			<el-button size="small" @click="status(0)">全部</el-button>
			<el-button size="small" @click="status(1)">已回复</el-button>
			<el-button size="small" @click="status(2)">未回复</el-button>
			<el-button size="small" @click="status(3)">带图评价</el-button>
			<el-button size="small" @click="status(4)">追评</el-button>
			<el-button size="small" @click="status(5)">好评</el-button>
			<el-button size="small" @click="status(6)">中评</el-button>
			<el-button size="small" @click="status(7)">差评</el-button>
		</div>
		
		<div style="display: flex;border-bottom: 1px solid black;padding: 10px;">
			<div style="width: 80px;">计分</div>
			<div style="width: 25%;">评价</div>
			<div style="width: 45%;text-align: center;">商品信息</div>
			<div style="width: 15%;text-align: center;">操作</div>
		</div>
		<div v-for="item in items">
			<div style="height: 40px;line-height: 40px;background: #f9f9fb;margin-top: 10px;">
				订单号：41564678463454
			</div>
			<div style="display: flex;border-bottom: 1px solid black;padding: 10px;height: auto;border-bottom: 1px solid black;">
				<div style="width: 80px;height: 200px;">
					<img src="../../../assets/face.jpg" alt="" style="width: 50px;height: 50px;">
				</div>
				<div style="width: 25%;font-family:Alibaba;">
					<div style="margin-bottom: 5px;">宝贝已经收到,很不错！</div>
					<div>初次评价：2020-07-12 11：30</div>
					<div style="display: flex;margin-top: 10px;">
						<img src="../../../assets/face.jpg" alt="" style="width: 100px;height: 100px;margin-right: 10px;">
						<img src="../../../assets/p10.jpg" alt="" style="width: 100px;height: 100px;margin-right: 10px;">
						<img src="../../../assets/404_images/404.png" alt="" style="width: 100px;height: 100px;margin-right: 10px;">
					</div>
					<div>
						<span style="color: #FF0000;">卖家回复:</span><span>谢谢您的光临</span>
					</div>
					<div><span style="color: #FF5654;">追评:</span><span>是真的很不错</span></div>
				</div>
				<div style="width: 45%;text-align: center;">
					<div style="margin-top: 40px;font-weight: bolder;">BLESSING双十二预定系列</div>
					<div style="color: #FF5654;margin-top: 40px;">￥958</div>
				</div>
				<div style="width: 15%;">
					<el-button type="primary" style="margin-top: 50px;margin-left: 70px;">回复卖家</el-button>
				</div>
			</div>
		</div>
		
		<el-pagination style="margin-top: 10px;" @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="params.page"
		 :page-sizes="[10]" :page-size="params.page_size" layout="total, sizes, prev, pager, next, jumper" :total="total"
		 >
		</el-pagination>
		
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
				items:['1','2','3'],
				comments:'',
				announceData: [{
					time:'555'
				}],
				tableLoading: false,
				title:'',
				params:{
					orderNum:'',
					page:1,
					page_size:10,
				},
				centerDialogVisible:false,
				total:0,
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
			//页码
			handleSizeChange(val) {
				this.params.page_size = val
			},
			handleCurrentChange(val) {
				this.params.page = val
				this.selectorder()
			},
			confirm(){
				
			}
		}
	}
</script>
