/*
 * @Author: zd
 * @Date: 2023-10-27 15:57:45
 * @LastEditors: zd
 * @LastEditTime: 2024-01-03 09:33:53
 * @FilePath: \demo-vue\src\router\index.js
 * @Description:
 */
import Vue from 'vue'
import VueRouter from 'vue-router'
import HomeView from '../views/HomeView.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'home',
    component: HomeView
  },
  {
    path: '/about',
    name: 'about',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () =>
      import(/* webpackChunkName: "about" */ '../views/AboutView.vue')
  },
  {
    path: '/messageEl',
    name: 'MessageEl',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () =>
      import(
        /* webpackChunkName: "MessageEl" */ '../views/messageEl/MessageEl.vue'
      )
  },
  {
    path: '/alertEl',
    name: 'AlertEl',
    component: () =>
      import(/* webpackChunkName: "AlertEl" */ '../views/alertEl/AlertEl.vue')
  },
  {
    path: '/formLinkage',
    name: 'FormLinkage',
    component: () =>
      import(
        /* webpackChunkName: "FormLinkage" */ '../views/formLinkage/FormLinkage.vue'
      )
  }
]

const router = new VueRouter({
  routes
})

export default router
