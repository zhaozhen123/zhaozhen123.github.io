import Vue from 'vue'
import VueRouter, { RouteConfig } from 'vue-router'
Vue.use(VueRouter)

const routes: Array<RouteConfig> = [
  {
    path: '/',
    name: 'EightWords',
    meta: {
      title: '姓名解析'
    },
    component: () => import('../views/EightWords/EightWords.vue')
  },
  {
    path: '/results',
    name: 'results',
    meta: {
      title: '测算结果'
    },
    component: () => import('../views/results/results.vue')
  },
  {
    path: '/middle',
    name: 'middle',
    meta: {
      title: '启灵阁命理分析'
    },
    component: () => import('../views/middle/middle.vue')
  },
  {
    path:'/weixinpay',
    name: 'weixinpay',
    meta: {
      title: '微信支付'
    },
    component: () => import('../views/weixinpay/weixinpay.vue')
  },
  {
    path:'/order',
    name: 'order',
    meta: {
      title: '订单查询'
    },
    component: () => import('../views/order/order.vue')
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

router.beforeEach((to, from, next) => {
  if (to.meta.title) {
      document.title = to.meta.title;
  }
  next();
});
export default router
