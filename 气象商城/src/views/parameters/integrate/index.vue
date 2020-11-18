<template>
	<div class="app-container">
		<div style="font-size: 16px;">当前最低积分配比：1：{{integrate}}</div>
		<div style="display: flex;font-size: 16px;">
			<span style="height: 40px;line-height: 40px;">积分比例：1：</span><el-input v-model="integrate" placeholder="积分" style="width: 80px;line-height: 40px;"></el-input>
			<div style="height: 40px;line-height: 45px;margin: 0 5px;">
				<img style="height: 16px;width: 16px;" src="../../../assets/tips.png" alt="提示">
			</div>
			
			<span style="height: 40px;line-height: 40px;">设置积分充值比例，一元钱可以兑换{{integrate}}积分</span>
		</div>
		<div>
			<el-button @click="submit" size="mini">提交</el-button>
		</div>
	</div>
</template>

<script>
	import {getIntegralRatio} from '@/api/parameters'
	import {setIntegralRatio} from '@/api/parameters'
	export default {

		data() {
			return {
				integrate:null,
			}
		},
		watch: {},
		mounted() {
			this.selectEnterprise()
		},
		methods: {
			//查询表格数据
			selectEnterprise() {
				this.announceData = []
				getIntegralRatio().then(res => {
					console.log(res)
					this.integrate=res.data
				})
			},
			submit(){
				setIntegralRatio(this.integrate).then(res => {
					console.log(res)
					this.selectEnterprise()
				})
			},
		}
	}
</script>
