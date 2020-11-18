<template>
  <div class="dashboard-container">
    <div class="dashboard-text">name: {{ name }}</div>
  </div>
</template>

<script>
	import {
		getAdminPermission
	} from '@/api/permission'
import { mapGetters } from 'vuex'

export default {
  name: 'Dashboard',
  computed: {
    ...mapGetters([
      'name'
    ])
  },
	methods:{
		select(){
			getAdminPermission().then(res => {
				console.log(res)
				this.goodsParams = res.data
			})
		},
		load(){
			location.reload()
		}
	},
	mounted() {
		this.select()
		// this.load()
	}
}
</script>

<style lang="scss" scoped>
.dashboard {
  &-container {
    margin: 30px;
  }
  &-text {
    font-size: 30px;
    line-height: 46px;
  }
}
</style>
