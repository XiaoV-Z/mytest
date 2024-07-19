import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

/* Layout */
import Layout from '@/layout'

/* Router Modules */
// import componentsRouter from './modules/components'
// import chartsRouter from './modules/charts'
// import tableRouter from './modules/table'
// import nestedRouter from './modules/nested'
// import bak from './bak.js'

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
    noCache: true                if set true, the page will no be cached(default is false)
    affix: true                  if set true, the tag will affix in the tags-view
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
    path: '/redirect',
    component: Layout,
    hidden: true,
    children: [
      {
        path: '/redirect/:path(.*)',
        component: () => import('@/views/redirect/index')
      }
    ]
  },
  {
    path: '/login',
    component: () => import('@/views/login/index'),
    hidden: true
  },
  {
    path: '/auth-redirect',
    component: () => import('@/views/login/auth-redirect'),
    hidden: true
  },
  {
    path: '/404',
    component: () => import('@/views/error-page/404'),
    hidden: true
  },
  {
    path: '/401',
    component: () => import('@/views/error-page/401'),
    hidden: true
  },
  {
    path: '/',
    component: Layout,
    redirect: '/dashboard',
    children: [
      {
        path: 'dashboard',
        component: () => import('@/views/dashboard/index'),
        name: 'Dashboard',
        meta: { title: '首页', icon: 'dashboard', affix: true }
      }
    ]
  },
  {
    path: '/documentation',
    component: Layout,
    children: [
      {
        path: 'index',
        component: () => import('@/views/documentation/index'),
        name: 'Documentation',
        meta: { title: '文章', icon: 'documentation', affix: true }
      }
    ]
  },
  {
    path: '/guide',
    component: Layout,
    redirect: '/guide/index',
    children: [
      {
        path: 'index',
        component: () => import('@/views/guide/index'),
        name: 'Guide',
        meta: { title: '操作指引', icon: 'guide', noCache: true }
      }
    ]
  },
  {
    path: '/profile',
    component: Layout,
    redirect: '/profile/index',
    hidden: true,
    children: [
      {
        path: 'index',
        component: () => import('@/views/profile/index'),
        name: 'Profile',
        meta: { title: 'Profile', icon: 'user', noCache: true }
      }
    ]
  }
]

/**
 * asyncRoutes
 * the routes that need to be dynamically loaded based on user roles
 */
export const asyncRoutes = [
  {
    path: '/sysvulms',
    component: Layout,
    redirect: '/sysvulms/vulms-list',
    alwaysShow: true,
    name: 'sysVulms',
    meta: { title: '系统漏洞', icon: 'el-icon-notebook-2', roles: ['admin', 'editor'] },
    children: [
      {
        path: 'vulms-list',
        component: () => import('@/views/sysvulms/vulms-list'),
        name: 'sysVulList',
        meta: { title: '漏洞列表', icon: 'list', roles: ['admin', 'editor'] }
      },
      {
        path: 'addsysvlms',
        component: () => import('@/views/sysvulms/vulms-form'),
        name: 'AddsysVul',
        meta: { title: '新增漏洞', icon: 'edit' }
      },
      {
        path: 'VulsbatchUpload',
        component: () => import('@/views/sysvulms/vulsbatch-upload'),
        name: 'VulsbatchUpload',
        meta: { title: '批量导入', icon: 'form' }
      },
      {
        path: 'SysVulSearchForm',
        component: () => import('@/views/sysvulms/vuls-searchform.vue'),
        name: 'SysVulSearchForm',
        meta: { title: '高级搜索', icon: 'el-icon-search' },
        hidden: true,
        props: true
      },
      {
        path: 'SysvulsExport',
        component: () => import('@/views/sysvulms/vuls-export.vue'),
        name: 'SysvulsExport',
        meta: { title: '漏洞导出', icon: 'el-icon-document' },
        hidden: true,
        props: true
      },
      {
        path: 'addsysvlms/:id',
        component: () => import('@/views/sysvulms/vulms-form'),
        name: 'EditsysVul',
        meta: { title: '编辑系统漏洞', icon: 'edit' },
        hidden: true,
        props: true
      }
    ] // 子路由结束
  },
  {
    path: '/hostvulms',
    component: Layout,
    redirect: '/hostvulms/hostvulms-list',
    alwaysShow: true,
    name: 'hostVulms',
    meta: { title: '主机漏洞', icon: 'el-icon-s-platform', roles: ['admin', 'editor'] },
    children: [
      {
        path: 'hostvulms-list',
        component: () => import('@/views/hostvulms/hostvuls-list'),
        name: 'hostVulList',
        meta: { title: '漏洞列表', icon: 'list', roles: ['admin', 'editor'] }
      },
      {
        path: 'addhostvulms',
        component: () => import('@/views/hostvulms/hostvuls-form'),
        name: 'AddhostVul',
        meta: { title: '新增漏洞', icon: 'edit' }
      }
    ]
  },
  {
    path: '/onlineVulmsL',
    component: Layout,
    redirect: '/onlinevulms/onlinevuls-list',
    alwaysShow: true,
    name: 'onlineVul',
    meta: { title: '上线测试', icon: 'el-icon-upload2', roles: ['admin', 'editor'] },
    children: [
      {
        path: 'onlinevuls-list',
        component: () => import('@/views/onlinevulms/onlinevuls-list'),
        name: 'onlineVulList',
        meta: { title: '漏洞列表', icon: 'list', roles: ['admin', 'editor'] }
      },
      {
        path: 'addonlinevlms',
        component: () => import('@/views/onlinevulms/onlinevuls-form'),
        name: 'AddonlineVul',
        meta: { title: '新增漏洞', icon: 'edit' }
      }
    ]
  },
  /** when your routing map is too long, you can split it into small modules **/
  //   componentsRouter,
  //   chartsRouter,
  //   nestedRouter,
  //   tableRouter,
  //   ...bak,
  // 404 page must be placed at the end !!!
  { path: '*', redirect: '/404', hidden: true }
]

const createRouter = () => new Router({
  // mode: 'history', // require service support
  scrollBehavior: () => ({ y: 0 }),
  routes: constantRoutes
})

const router = createRouter()

// Detail see: https://github.com/vuejs/vue-router/issues/1234#issuecomment-357941465
export function resetRouter() {
  const newRouter = createRouter()
  router.matcher = newRouter.matcher // reset router
}

export default router
