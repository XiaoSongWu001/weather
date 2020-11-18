<template>
  <div class="navbar">
    <hamburger :is-active="sidebar.opened" class="hamburger-container" @toggleClick="toggleSideBar" />

    <breadcrumb class="breadcrumb-container" />
	
    <div class="right-menu">
		<img src="../../assets/logout.png" alt="退出" @click="logout">
    <!-- <el-dropdown class="avatar-container" trigger="click">
        <div class="avatar-wrapper">
          <img :src="avatar+'?imageView2/1/w/80/h/80'" class="user-avatar">
          <i class="el-icon-caret-bottom" />
        </div>
        <el-dropdown-menu slot="dropdown" class="user-dropdown">
          <router-link to="/">
            <el-dropdown-item>
              Home
            </el-dropdown-item>
          </router-link> -->
         <!-- <a target="_blank" href="https://github.com/PanJiaChen/vue-admin-template/">
            <el-dropdown-item>Github</el-dropdown-item>
          </a>
          <a target="_blank" href="https://panjiachen.github.io/vue-element-admin-site/#/">
            <el-dropdown-item>Docs</el-dropdown-item>
          </a>
          <el-dropdown-item divided @click.native="logout">
            <span style="display:block;">Log Out</span>
          </el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown> -->
    </div>
	<div class="right-name">
		<span class="update" @click="update">{{name}}</span>
	</div>
	<el-dialog title="修改密码" :visible.sync="updateDialogVisible" width="30%" center>
		<div style="display:flex;margin-top: 20px;">
			<span style="width: 100px;height:40px;line-height: 40px;">登录用户：</span>
			<span style="width: 100px;height:40px;line-height: 40px;">{{name}}</span>
		</div>
		<div style="display:flex;margin-top: 20px;">
			<span style="width: 100px;height:40px;line-height: 40px;">原密码：</span>
			<el-input style="height:40px;line-height: 40px;" type="password" v-model="password" placeholder="请输入内容">{{name}}</el-input>
		</div>
		<div style="display:flex;margin-top: 20px;">
			<span style="width: 100px;height:40px;line-height: 40px;">新密码：</span>
			<el-input style="height:40px;line-height: 40px;" type="password" v-model="newPassword" placeholder="请输入内容">{{name}}</el-input>
		</div>
		<span slot="footer" class="dialog-footer">
			<el-button @click="updateDialogVisible = false">取 消</el-button>
			<el-button type="primary" @click="confirm">确 定</el-button>
		</span>
	</el-dialog>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import Breadcrumb from '@/components/Breadcrumb'
import Hamburger from '@/components/Hamburger'
import { removeToken } from '@/utils/auth'
import {changePassword} from '@/api/user'
import { resetRouter } from '@/router'

export default {
  components: {
    Breadcrumb,
    Hamburger
  },
  data(){
	  return {
		  updateDialogVisible:false,
		  password:'',
		  newPassword:'',
	  }
  },
  computed: {
    ...mapGetters([
      'sidebar',
      'avatar',
	  'name'
    ])
  },
  methods: {
    toggleSideBar() {
      this.$store.dispatch('app/toggleSideBar')
    },
	update(){
		this.updateDialogVisible=true
	},
	async confirm(){
		changePassword({
			password:this.password,
			newPassword:this.newPassword
		}).then(res => {
			if(res.code==200){
				console.log(res)
				this.updateDialogVisible=false
				removeToken()
			}
		})
	},
    async logout() {
      // await this.$store.dispatch('user/logout')
	  removeToken()
		resetRouter()
      this.$router.push(`/login?redirect=${this.$route.fullPath}`)
    }
  }
}
</script>

<style lang="scss" scoped>
.navbar {
  height: 50px;
  overflow: hidden;
  position: relative;
  background: #fff;
  box-shadow: 0 1px 4px rgba(0,21,41,.08);

  .hamburger-container {
    line-height: 46px;
    height: 100%;
    float: left;
    cursor: pointer;
    transition: background .3s;
    -webkit-tap-highlight-color:transparent;

    &:hover {
      background: rgba(0, 0, 0, .025)
    }
  }

  .breadcrumb-container {
    float: left;
  }
	.right-name{
		font-size: 14px;
		float: right;
		margin-right: 10px;
		height: 100%;
		line-height: 50px;
	}
	.right-name:hover{
		cursor: pointer;
		color: #B3D8FF;
	}
	.right-menu img{
		// line-height: 50px;
		cursor: pointer;
		vertical-align: middle;
	}
  .right-menu {
    float: right;
    height: 100%;
    line-height: 50px;

    &:focus {
      outline: none;
    }

    .right-menu-item {
      display: inline-block;
      padding: 0 8px;
      height: 100%;
      font-size: 18px;
      color: #5a5e66;
      vertical-align: text-bottom;

      &.hover-effect {
        cursor: pointer;
        transition: background .3s;

        &:hover {
          background: rgba(0, 0, 0, .025)
        }
      }
    }

    .avatar-container {
      margin-right: 30px;

      .avatar-wrapper {
        margin-top: 5px;
        position: relative;

        .user-avatar {
          cursor: pointer;
          width: 40px;
          height: 40px;
          border-radius: 10px;
        }

        .el-icon-caret-bottom {
          cursor: pointer;
          position: absolute;
          right: -20px;
          top: 25px;
          font-size: 12px;
        }
      }
    }
  }
}
</style>
