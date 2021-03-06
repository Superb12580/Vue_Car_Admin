import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home,
    // 登录拦截
    meta: { requireAuth: true },
    children: [
      {
        path: '/',
        name: 'Sy',
        component: () => import('../views/Sy.vue')
      },
      {
        path: '/car',
        name: 'Car',
        component: () => import('../views/cars/Car.vue')
      },
      {
        path: '/style',
        name: 'Style',
        component: () => import('../views/cars/Style.vue')
      },
      {
        path: '/lbt',
        name: 'Lbt',
        component: () => import('../views/cars/Lbt.vue')
      },
      {
        path: '/dt',
        name: 'Dt',
        component: () => import('../views/essay/Dt.vue')
      },
      {
        path: '/pl',
        name: 'Pl',
        component: () => import('../views/essay/Pl.vue')
      },
      {
        path: '/zf',
        name: 'Zf',
        component: () => import('../views/essay/Zf.vue')
      },
      {
        path: '/dtxq',
        name: 'Dtxq',
        component: () => import('../views/essay/Dtxq.vue')
      },
      {
        path: '/spdsh',
        name: 'SpDsh',
        component: () => import('../views/video/SpDsh.vue')
      },
      {
        path: '/spyfb',
        name: 'SpYfb',
        component: () => import('../views/video/SpYfb.vue')
      },
      {
        path: '/spybh',
        name: 'SpYbh',
        component: () => import('../views/video/SpYbh.vue')
      },
      {
        path: '/spxq',
        name: 'Spxq',
        component: () => import('../views/video/Spxq.vue')
      },
      {
        path: '/dsh',
        name: 'Dsh',
        component: () => import('../views/news/Dsh.vue')
      },
      {
        path: '/yfb',
        name: 'Yfb',
        component: () => import('../views/news/Yfb.vue')
      },
      {
        path: '/ybh',
        name: 'Ybh',
        component: () => import('../views/news/Ybh.vue')
      },
      {
        path: '/wzxq',
        name: 'Wzxq',
        component: () => import('../views/news/Wzxq.vue')
      },
      {
        path: '/cjh',
        name: 'Cjh',
        component: () => import('../views/user/Cjh.vue')
      },
      {
        path: '/yh',
        name: 'Yh',
        component: () => import('../views/user/Yh.vue')
      },
      {
        path: '/bq',
        name: 'Bq',
        component: () => import('../views/Bq.vue')
      },
      {
        path: '/rz',
        name: 'Rz',
        component: () => import('../views/Rz.vue')
      },
      {
        path: '/zdb',
        name: 'Zdb',
        component: () => import('../views/Zdb.vue')
      },
      {
        path: '/data_type',
        name: 'DataType',
        component: () => import('../views/DataType.vue')
      },
      {
        path: '/data_dictionary',
        name: 'DataDictionary',
        component: () => import('../views/DataDictionary.vue')
      }
    ]
  },
  {
    path: '/login',
    name: 'Login',
    component: () => import('../views/Login.vue')
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
