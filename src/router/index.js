import { createRouter, createWebHistory,createWebHashHistory } from 'vue-router'
import Home from '../views/Home.vue'
import Index from '../views/Index.vue'
import Active from '../views/Active.vue'
import MarkImag from '../views/MarkImag.vue'
import Recommend from '../views/recommend/Recommend.vue'
import Detail from '../views/recommend/Detail.vue'
import Submit from '../views/recommend/Submit.vue'
import MIne from '../views/myHistTory/MIne.vue'
import GetCard from '../views/myHistTory/GetCard.vue'

const routes = [
  {
    path: '/',
    name: 'index',
    component: Index
  },
  {
    path: '/active',
    name: 'active',
    component: Active
  },
  {
    path: '/markImag',
    name: 'markImag',
    component: MarkImag
  },
  {
    path: '/Home',
    name: 'Home',
    component: Home
  },
  {
    path: '/recommend/Recommend',
    name: 'Recommend',
    component: Recommend
  },
  {
    path: '/recommend/detail',
    name: 'Detail',
    component: Detail
  },
  {
    path: '/recommend/submit',
    name: 'Submit',
    component: Submit
  },
  {
    path: '/myHistTory/getCard',
    name: 'GetCard',
    component: GetCard
  },
  {
    path: '/myHistTory/mIne',
    name: 'MIne',
    component: MIne
  },
  {
    path: '/about',
    name: 'About',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
  }
]

const router = createRouter({
  history: createWebHashHistory(process.env.BASE_URL),
  routes
})

export default router
