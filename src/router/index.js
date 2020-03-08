import Vue from 'vue'
import VueRouter from 'vue-router'
import Navi from '../components/Navi.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    redirect: '/login'
  },
  {
    path: '/admin/discipline',
    redirect: '/admin/discipline/absent'
  },
  {
    path: '/login',
    name: 'Login',
    component: () => import(/* webpackChunkName: "Login" */ '../views/Login.vue')
  },
  {path:'/navi',
  component:Navi,
  // redirect:'/index',
  children:[
    {
      path:'/jw/upload', component: () => import(/* webpackChunkName: "jw" */ '../views/jw/Upload.vue')
    },
    {
      path:'/jw/mykq', component: () => import(/* webpackChunkName: "jw" */ '../views/jw/MyKq.vue')
    },



    {
      path:'/admin/index', component: () => import(/* webpackChunkName: "xdPublic" */ '../views/admin/Index.vue')
    },
    {
      path:'/admin/kqs', component: () => import(/* webpackChunkName: "xdPublic" */ '../views/admin/ListKq.vue')
    },
    {
      path:'/admin/users', component: () => import(/* webpackChunkName: "xdPublic" */ '../views/admin/ListUser.vue')
    },
    {
      path:'/admin/courses', component: () => import(/* webpackChunkName: "xdPublic" */ '../views/admin/ListCourse.vue')
    },


    {
      path:'/admin/discipline/absent', component:() => import(/* webpackChunkName: "discipline" */ '../views/admin/discipline/Absent.vue')
    },
    {
      path:'/admin/discipline/audit', component:() => import(/* webpackChunkName: "discipline" */ '../views/admin/discipline/Audit.vue')
    },
    {
      path:'/admin/discipline/score', component:() => import(/* webpackChunkName: "discipline" */ '../views/admin/discipline/Score.vue')
    },
  ]}
]

const router = new VueRouter({
  routes
})

export default router
