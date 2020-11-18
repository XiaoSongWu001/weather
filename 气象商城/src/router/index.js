import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

/* Layout */
import Layout from '@/layout'

/**
 * Note: sub-menu only appear when route children.length >= 1
 * Detail see: https://panjiachen.github.io/vue-element-admin-site/guide/essentials/router-and-nav.html
 *
 * hidden: true                   if set true, item will not show in the sidebar(default is false)
 * alwaysShow: true               if set true, will always show the root menu
 *                                if not set alwaysShow, when item has more than one children route,
 *                                it will becomes nested mode, otherwise not show the root menu
 * redirect: noRedirect           if set noRedirect will no redirect in the breadcrumb
 * name:'router-name'             the name is used by <keep-alive> (must set!!!)
 * meta : {
    roles: ['admin','editor']    control the page roles (you can set multiple roles)
    title: 'title'               the name show in sidebar and breadcrumb (recommend set)
    icon: 'svg-name'/'el-icon-x' the icon show in the sidebar
    breadcrumb: false            if set false, the item will hidden in breadcrumb(default is true)
    activeMenu: '/example/list'  if set path, the sidebar will highlight the path you set
  }
 */

/**
 * constantRoutes
 * a base page that does not have permission requirements
 * all roles can be accessed
 */
export const constantRoutes = [
 {
 	// name:'login',
 	path: '/login',
 	component: () => import('@/views/login/index'),
 	hidden: true
 },
 
 {
 	path: '/404',
 	component: () => import('@/views/404'),
 	hidden: true
 },
 
 {
 	path: '/',
 	component: Layout,
 	redirect: '/home',
 	children: [{
 		path: 'home',
 		name: 'home',
 		component: () => import('@/views/home/index'),
 		meta: {
 			title: '首页',
 			icon: 'dashboard'
 		}
 	}]
 },
]

// export const constantRoutes = [
export const asyncRoutes = [
	// {
	// 	path: '/message',
	// 	component: Layout,
	// 	redirect: '/Message/product',
	// 	name: 'Message',
	// 	meta: {
	// 		title: '消息类别配置',
	// 		icon: 'message'
	// 	},
	// 	children: [
	// 		{
	// 			path: 'news',
	// 			name: 'News',
	// 			component: () => import('@/views/message/news/index.vue'),
	// 			meta: {
	// 				title: '新闻广告配置'
	// 			}
	// 		},
	// 		{
	// 			path: 'messagesend',
	// 			name: 'Messagesend',
	// 			component: () => import('@/views/message/messagesend/index'),
	// 			meta: {
	// 				title: '平台消息配置'
	// 			}
	// 		},
	// 		{
	// 			path: 'disaster',
	// 			name: 'Disaster',
	// 			component: () => import('@/views/message/disaster/index'),
	// 			meta: {
	// 				title: '灾害消息配置'
	// 			}
	// 		}
	// 	]
	// },

	// {
	// 	path: '/product',
	// 	component: Layout,
	// 	redirect: '/product/type',
	// 	name: 'Product',
	// 	meta: {
	// 		title: '商品',
	// 		icon: 'product'
	// 	},
	// 	children: [{
	// 			path: 'type',
	// 			name: 'Type',
	// 			component: () => import('@/views/productmanage/type/index'),
	// 			meta: {
	// 				title: '商品管理'
	// 			}
	// 		},
	// 		{
	// 			path: 'classification',
	// 			name: 'Classification',
	// 			component: () => import('@/views/productmanage/classification/index'),
	// 			meta: {
	// 				title: '商品分类'
	// 			}
	// 		},
	// 		{
	// 			path: 'profit',
	// 			name: 'Profit',
	// 			component: () => import('@/views/productmanage/profit/index'),
	// 			meta: {
	// 				title: '经销利润比例'
	// 			}
	// 		},
	// 		{
	// 			path: 'activity',
	// 			name: 'Activity',
	// 			component: () => import('@/views/productmanage/activity/index'),
	// 			meta: {
	// 				title: '商品活动管理'
	// 			}
	// 		}
	// 	]
	// },

	// {
	// 	path: '/order',
	// 	component: Layout,
	// 	redirect: '/order/orderlist',
	// 	name: 'Order',
	// 	meta: {
	// 		title: '订单',
	// 		icon: 'order'
	// 	},
	// 	children: [{
	// 			path: 'orderlist',
	// 			component: () => import('@/views/order/orderlist/index'), // Parent router-view
	// 			name: 'Orderlist',
	// 			meta: {
	// 				title: '订单列表'
	// 			}
	// 		},
	// 		{
	// 			path: 'ordersend',
	// 			component: () => import('@/views/order/ordersend/index'),
	// 			name: 'Ordersend',
	// 			meta: {
	// 				title: '订单消息推送'
	// 			}
	// 		}
	// 	]
	// },
	// {
	// 	path: '/usermanage',
	// 	component: Layout,
	// 	redirect: '/usermanage/userinfo',
	// 	name: 'Usermanage',
	// 	meta: {
	// 		title: '用户管理',
	// 		icon: 'user'
	// 	},
	// 	children: [{
	// 			path: 'userinfo',
	// 			component: () => import('@/views/usermanage/userinfo/index'), // Parent router-view
	// 			name: 'Userinfo',
	// 			meta: {
	// 				title: '用户基本信息'
	// 			}
	// 		},
	// 		{
	// 			path: 'advice',
	// 			component: () => import('@/views/usermanage/advice/index'),
	// 			name: 'Advice',
	// 			meta: {
	// 				title: '投诉与建议'
	// 			}
	// 		}
	// 	]
	// },
	// {
	// 	path: '/merchants',
	// 	component: Layout,
	// 	redirect: '/merchants/merchantslist',
	// 	name: 'Merchants',
	// 	meta: {
	// 		title: '商家管理',
	// 		icon: 'merchants'
	// 	},
	// 	children: [{
	// 			path: 'merchantslist',
	// 			component: () => import('@/views/merchants/merchantslist/index'), // Parent router-view
	// 			name: 'Merchantslist',
	// 			meta: {
	// 				title: '商家列表'
	// 			}
	// 		},
	// 		{
	// 			path: 'storemanage',
	// 			component: () => import('@/views/merchants/evaluation/index'),
	// 			name: 'Storemanage',
	// 			meta: {
	// 				title: '店铺管理'
	// 			},
	// 			children: [
	// 				{
	// 					path: 'evaluation',
	// 					component: () => import('@/views/merchants/evaluation/index'),
	// 					name: 'Evaluation',
	// 					meta: {
	// 						title: '评价'
	// 					}
	// 				},
	// 				{
	// 					path: 'credit',
	// 					component: () => import('@/views/merchants/credit/index'),
	// 					name: 'Credit',
	// 					meta: {
	// 						title: '信用'
	// 					}
	// 				}
	// 			]
	// 		}
	// 	]
	// },
	// {
	// 	path: '/application',
	// 	component: Layout,
	// 	redirect: '/application',
	// 	name: 'Application',
	// 	meta: {
	// 		title: '申请管理',
	// 		icon: 'setting'
	// 	},
	// 	children: [{
	// 			path: 'company',
	// 			component: () => import('@/views/application/company/index'), // Parent router-view
	// 			name: 'Company',
	// 			meta: {
	// 				title: '企业申请'
	// 			}
	// 		},
	// 	]
	// },
	// {
	// 	path: '/parameters',
	// 	component: Layout,
	// 	redirect: '/parameters',
	// 	name: 'Parameters',
	// 	meta: {
	// 		title: '参数管理',
	// 		icon: 'parameters'
	// 	},
	// 	children: [{
	// 			path: 'integrate',
	// 			component: () => import('@/views/parameters/integrate/index'), // Parent router-view
	// 			name: 'Integrate',
	// 			meta: {
	// 				title: '积分比例管理'
	// 			}
	// 		},
	// 	]
	// },
	// {
	// 	path: '/enterprise',
	// 	component: Layout,
	// 	redirect: '/enterprise/company',
	// 	name: 'Enterprise',
	// 	meta: {
	// 		title: '企业管理',
	// 		icon: 'setting'
	// 	},
	// 	children: [{
	// 			path: 'company',
	// 			component: () => import('@/views/enterprise/company/index'), // Parent router-view
	// 			name: 'Company',
	// 			meta: {
	// 				title: '我的企业'
	// 			}
	// 		},
	// 		{
	// 			path: 'employee',
	// 			component: () => import('@/views/enterprise/employee/index'),
	// 			name: 'Employee',
	// 			meta: {
	// 				title: '我的员工'
	// 			}
	// 		},
	// 		{
	// 			path: 'application',
	// 			component: () => import('@/views/enterprise/application/index'),
	// 			name: 'Application',
	// 			meta: {
	// 				title: '员工申请'
	// 			}
	// 		}
	// 	]
	// },
	// {
	// 	path: '/system',
	// 	component: Layout,
	// 	redirect: '/system/menulist',
	// 	name: 'System',
	// 	meta: {
	// 		title: '系统设置',
	// 		icon: 'setting'
	// 	},
	// 	children: [{
	// 			path: 'menulist',
	// 			component: () => import('@/views/setting/menulist/index'), // Parent router-view
	// 			name: 'Menulist',
	// 			meta: {
	// 				title: '菜单管理'
	// 			}
	// 		},
	// 		{
	// 			path: 'rolemanage',
	// 			component: () => import('@/views/setting/rolemanage/index'),
	// 			name: 'Rolemanage',
	// 			meta: {
	// 				title: '角色管理'
	// 			}
	// 		},
	// 		{
	// 			path: 'adminmanage',
	// 			component: () => import('@/views/setting/adminmanage/index'),
	// 			name: 'Adminmanage',
	// 			meta: {
	// 				title: '管理员管理'
	// 			}
	// 		}
	// 	]
	// },

	// 404 page must be placed at the end !!!
	{
		path: '*',
		redirect: '/404',
		hidden: true
	}
]

const createRouter = () => new Router({
	// mode: 'history', // require service support
	scrollBehavior: () => ({
		y: 0
	}),
	routes: constantRoutes
})

const router = createRouter()

// Detail see: https://github.com/vuejs/vue-router/issues/1234#issuecomment-357941465
export function resetRouter() {
	const newRouter = createRouter()
	router.matcher = newRouter.matcher // reset router
}

export default router
