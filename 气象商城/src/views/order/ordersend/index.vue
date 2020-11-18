<template>
	<div class="app-container">
		<div style="border:1px solid #f6f6f6;">
			<div style="border-bottom:1px solid #f6f6f6;padding: 10px;">
				搜索条件
			</div>
			<div style="display:flex;padding-left: 20px;margin: 10px 0;">
				<span style="height:30px;line-height: 30px;margin-right: 20px;">订单状态:</span>
				<el-button size="small" @click="status(0)" :class="{'hover':typenum==0}">全部</el-button>
				<el-button size="small" @click="status(1)" :class="{'hover':typenum==1}">未支付</el-button>
				<el-button size="small" @click="status(2)" :class="{'hover':typenum==2}">未发货</el-button>
				<el-button size="small" @click="status(3)" :class="{'hover':typenum==3}">待收货</el-button>
				<el-button size="small" @click="status(4)" :class="{'hover':typenum==4}">待发货</el-button>
				<el-button size="small" @click="status(5)" :class="{'hover':typenum==5}">待评价</el-button>
				<el-button size="small" @click="status(6)" :class="{'hover':typenum==6}">交易完成</el-button>
				<el-button size="small" @click="status(7)" :class="{'hover':typenum==7}">退款中</el-button>
				<el-button size="small" @click="status(8)" :class="{'hover':typenum==8}">已退款</el-button>
			</div>
			<div style="display:flex;padding-left: 20px;margin-bottom: 10px;">
				<span style="height:30px;line-height: 30px;margin-right: 20px;">订单类型:</span>
				<el-button size="small" @click="type(0)" :class="{'hover':typenum1==0}">全部</el-button>
				<el-button size="small" @click="type(1)" :class="{'hover':typenum1==1}">普通订单</el-button>
				<el-button size="small" @click="type(2)" :class="{'hover':typenum1==2}">拼团订单</el-button>
				<el-button size="small" @click="type(3)" :class="{'hover':typenum1==3}">秒杀订单</el-button>
			</div>
			<div style="display:flex;padding-left: 20px;margin-bottom: 10px;">
				<span style="height:30px;line-height: 30px;margin-right: 20px;">创建时间:</span>
				<el-button size="small" @click="time(0)" :class="{'hover':typenum2==0}">全部</el-button>
				<el-button size="small" @click="time(1)" :class="{'hover':typenum2==1}">昨天</el-button>
				<el-button size="small" @click="time(2)" :class="{'hover':typenum2==2}">今天</el-button>
				<el-button size="small" @click="time(3)" :class="{'hover':typenum2==3}">本周</el-button>
				<el-button size="small" @click="time(4)" :class="{'hover':typenum2==4}">本月</el-button>
				<el-button size="small" @click="time(5)" :class="{'hover':typenum2==5}">本季度</el-button>
				<el-button size="small" @click="time(6)" :class="{'hover':typenum2==6}">本年</el-button>
				<el-button size="small" @click="time(7)" :class="{'hover':typenum2==7}">本周</el-button>
			</div>
		</div>
		<div style="margin-top: 10px;">推送部门：
			 <el-select v-model="value" placeholder="请选择推送的部门" style="width: 300px;">
			    <el-option
			      v-for="item in options"
			      :key="item"
			      :label="item"
			      :value="item">
			    </el-option>
			  </el-select>
			  <el-button type="primary" style="margin-left: 10px;" size="mini">确认推送</el-button>
		</div>
	</div>
</template>

<script>
	import {
		AdminInfo
	} from '@/api/user'
	export default {
		data() {
			return {
				tableLoading: false,
				centerDialogVisible: false,
				typenum: 0,
				typenum1: 0,
				typenum2: 0,
				value:'',
				options:['财务部','督导部','中医医结合部','总经理']
			}
		},
		watch: {},

		methods: {
			selectannounce() {
				getInfo("123").then(res => {
					console.log("111")
				})
			},
			handleSelectionChange(val) {

			},
			status(num) {
				this.typenum = num
				console.log(num)
			},
			type(num) {
				this.typenum1 = num
				console.log(num)
			},
			time(num) {
				this.typenum2 = num
				console.log(num)
			},
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
/* 
	.app-container {
		background: #f3f3f4;
	} */
</style>
