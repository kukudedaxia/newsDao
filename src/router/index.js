import Vue from 'vue'
import Router from 'vue-router'
import { initTheme } from '@/utils/theme'

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
    path: '/login',
    component: () => import('@/views/login/index'),
    hidden: true,
    meta: {
      title: '登录'
    }
  },

  {
    path: '/404',
    component: () => import('@/views/404'),
    hidden: true,
    meta: {
      title: '404'
    }
  },

  {
    path: '/',
    component: Layout,
    redirect: 'noRedirect',
    children: [{
      path: '',
      name: 'home',
      component: () => import('@/views/home/index'),
      meta: { title: '仪表盘', icon: 'progress' }
    }]
  },

  {
    path: '/example',
    component: Layout,
    redirect: 'noRedirect',
    name: 'Example',
    children: [{
      path: 'docs',
      name: 'docs',
      component: () => import('@/views/example/index'),
      meta: { title: '使用文档', icon: 'docs' }
    }]
  },

  {
    path: '/order',
    component: Layout,
    redirect: '/order/list',
    devider: true,
    deviderText: '订阅',
    children: [
      {
        path: 'list',
        name: 'order',
        component: () => import('@/views/order/index'),
        meta: { title: '我的订阅', icon: 'order' }
      }, {
        path: 'list/:id',
        hidden: true,
        name: 'detail',
        component: () => import('@/views/order/detail'),
        meta: { title: '订阅', icon: 'order', dashboard: {
          path: '/order/list',
          title: '我的订阅'
        }}
      }
    ]
  },
  {
    path: '/person',
    component: Layout,
    devider: true,
    deviderText: '用户',
    children: [
      {
        path: 'index',
        name: 'order',
        component: () => import('@/views/person/index'),
        meta: { title: '个人中心', icon: 'user' }
      }
    ]
  },

  {
    path: 'external-link',
    component: Layout,
    children: [
      {
        path: 'https://panjiachen.github.io/vue-element-admin-site/#/',
        meta: { title: 'Custom Channel', icon: 'link' }
      }
    ]
  },

  // 404 page must be placed at the end !!!
  { path: '*', redirect: '/404', hidden: true }
]

const createRouter = () => new Router({
  // mode: 'history', // require service support
  scrollBehavior: () => ({ y: 0 }),
  routes: constantRoutes
})

const router = createRouter()

router.beforeEach(async(to, from, next) => {
  if (localStorage.getItem('theme')) {
    const theme = localStorage.getItem('theme')
    await initTheme(theme)
  } else {
    await initTheme('light')
  }
  next()
})

// Detail see: https://github.com/vuejs/vue-router/issues/1234#issuecomment-357941465
export function resetRouter() {
  const newRouter = createRouter()
  router.matcher = newRouter.matcher // reset router
}

export default router
