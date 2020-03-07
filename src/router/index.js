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
      path:'/jw/upload', component: () => import(/* webpackChunkName: "Upload" */ '../views/jw/Upload.vue')
    },
    {
      path:'/jw/mykq', component: () => import(/* webpackChunkName: "MyKq" */ '../views/jw/MyKq.vue')
    },



    {
      path:'/admin/index', component: () => import(/* webpackChunkName: "Index" */ '../views/admin/Index.vue')
    },
    {
      path:'/admin/listkq', component: () => import(/* webpackChunkName: "ListKq" */ '../views/admin/ListKq.vue')
    },


    {
      path:'/admin/discipline/absent', component:() => import(/* webpackChunkName: "Absent" */ '../views/admin/discipline/Absent.vue')
    },
    {
      path:'/admin/discipline/audit', component:() => import(/* webpackChunkName: "Audit" */ '../views/admin/discipline/Audit.vue')
    },
    {
      path:'/admin/discipline/score', component:() => import(/* webpackChunkName: "Score" */ '../views/admin/discipline/Score.vue')
    },
  ]}
]

const router = new VueRouter({
  routes
})

export default router
