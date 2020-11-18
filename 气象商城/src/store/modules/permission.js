import { asyncRoutes, constantRoutes } from '@/router'
import { getAdminPermission } from '@/api/permission'
import {
	MessageBox,
	Message
} from 'element-ui'
import Layout from '@/layout'
/**
 * Use meta.role to determine if the current user has permission
 * @param roles
 * @param route
 */
function hasPermission(roles, route) {
  if (route.meta && route.meta.roles) {
    return roles.some(role => route.meta.roles.includes(role))
  } else {
    return true
  }
}
export function generaMenu(routes, data) {
  data.forEach(item => {
		// console.log(item)
	  if(item.type==0){
		  const menu = {
		    path: item.url,
		     component: item.parentId === 0 ? Layout :  resolve => require([`@/views${item.url}/index`], resolve),
			 keepAlive: true,
		   // component: item.url === '#' ? Layout : () => import(`@/views${item.url}/index`),
		    // hidden: true,
		    children: [],
		    name: item.name,
		    meta: { title: item.name,icon:item.icon, id: item.id, roles: ['admin'] }
		  }
		  if (item.children) {
		    generaMenu(menu.children, item.children)
		  }
		    routes.push(menu)
			// console.log(item.parentId)
			//
	  }
    // alert(JSON.stringify(item))
   
	
  
  })
}

/**
 * Filter asynchronous routing tables by recursion
 * @param routes asyncRoutes
 * @param roles
 */
export function filterAsyncRoutes(routes, roles) {
	// console.log(routes)
  const res = []
  routes.forEach(route => {
    const tmp = { ...route }
	console.log(tmp)
    if (hasPermission(roles, tmp)) {
      if (tmp.children) {
        tmp.children = filterAsyncRoutes(tmp.children, roles)
      }
      res.push(tmp)
    }
  })

  return res
}

const state = {
  routes: [],
  addRoutes: []
}

const mutations = {
  SET_ROUTES: (state, routes) => {
    state.addRoutes = routes
    state.routes = constantRoutes.concat(routes)
  }
}


//菜单权限部分，做之前参考：https://blog.csdn.net/acoolper/article/details/97136553
const actions = {
  generateRoutes({ commit }, roles) {
    return new Promise(resolve => {
      const loadMenuData = []
      // 先查询后台并返回左侧菜单数据并把数据添加到路由
      getAdminPermission(state.token).then(response => {
        let data = response
        if (response.code !== 200) {
          Message({
          	message: response.msg || 'Error',
          	type: 'error',
          	duration: 5 * 1000
          })
        } else {
			console.log(data)
          data = response.data
          Object.assign(loadMenuData, data)
          generaMenu(asyncRoutes, loadMenuData)
          let accessedRoutes
          if (roles.adminAccount.includes('admin')) {
            // alert(JSON.stringify(asyncRoutes))
            accessedRoutes = asyncRoutes || []
			// accessedRoutes = filterAsyncRoutes(asyncRoutes, roles)
			console.log(accessedRoutes)
          } else {
			  accessedRoutes = asyncRoutes || []
            // accessedRoutes = filterAsyncRoutes(asyncRoutes, roles)
			console.log(accessedRoutes)
          }
          commit('SET_ROUTES', accessedRoutes)
          resolve(accessedRoutes)
        }
        // generaMenu(asyncRoutes, data)
      }).catch(error => {
        console.log(error)
      })
    })
  }
}


export default {
  namespaced: true,
  state,
  mutations,
  actions
}
