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
    path: '/discipline',
    redirect: '/discipline/absent'
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
      path:'/jw', component: () => import(/* webpackChunkName: "Upload" */ '../views/jw/Upload.vue')
    },
    {
      path:'/mykq', component: () => import(/* webpackChunkName: "MyKq" */ '../views/jw/MyKq.vue')
    },
    {
      path:'/index', component: () => import(/* webpackChunkName: "Index" */ '../views/Index.vue')
    },
    {
      path:'/discipline/absent', component:() => import(/* webpackChunkName: "Absent" */ '../views/discipline/Absent.vue')
    },
    {
      path:'/discipline/audit', component:() => import(/* webpackChunkName: "Audit" */ '../views/discipline/Audit.vue')
    },
    {
      path:'/discipline/score', component:() => import(/* webpackChunkName: "Score" */ '../views/discipline/Score.vue')
    },
  ]}
]

const router = new VueRouter({
  routes
})

export default router
