import { login, logout, AdminInfo } from '@/api/user'
import { getToken, setToken, removeToken } from '@/utils/auth'
import { resetRouter } from '@/router'

const getDefaultState = () => {
  return {
    token: getToken(),
    name: '',
    avatar: '',
		roles: []
  }
}

const state = getDefaultState()

const mutations = {
  RESET_STATE: (state) => {
    Object.assign(state, getDefaultState())
  },
  SET_TOKEN: (state, token) => {
    state.token = token
  },
  SET_NAME: (state, name) => {
    state.name = name
  },
  SET_AVATAR: (state, avatar) => {
    state.avatar = avatar
  },
	SET_ROLES: (state, roles) => {
	    state.roles = roles
	  }
}

const actions = {
  // user login
  login({ commit }, userInfo) {
    const { username, password } = userInfo
    return new Promise((resolve, reject) => {
      login({ account: username.trim(), password: password }).then(response => {
       if(response.code==200){
		   const { data } = response
        commit('SET_TOKEN', data)
        setToken(data)
        resolve()
	   }
		
      }).catch(error => {
        reject(error)
      })
    })
  },

  // get user info
  AdminInfo({ commit, state }) {
    return new Promise((resolve, reject) => {
      AdminInfo(state.token).then(response => {
        const { data } = response
				
        if (!data) {
          return reject('Verification failed, please Login again.')
        }

        const { name, avatar,roles } = data
				console.log(data.roleName)
		commit('SET_ROLES', data.roleName)
        commit('SET_NAME', data.adminAccountName)
        commit('SET_AVATAR', avatar)
        resolve(data)
      }).catch(error => {
        reject(error)
      })
    })
  },

  // user logout
  logout({ commit, state }) {
    return new Promise((resolve, reject) => {
      logout(state.token).then(() => {
        removeToken() // must remove  token  first
        resetRouter()
        commit('RESET_STATE')
        resolve()
      }).catch(error => {
        reject(error)
      })
    })
  },

  // remove token
  resetToken({ commit }) {
    return new Promise(resolve => {
      removeToken() // must remove  token  first
      commit('RESET_STATE')
      resolve()
    })
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}

