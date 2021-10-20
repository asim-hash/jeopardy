import Vue from 'vue'
import Router from 'vue-router'
import main from '../components/main-window'
import board from '../components/board'
import statistic from '../components/Statistic.vue'

Vue.use(Router);
 
let router = new Router({
 routes: [
   {
     path: '/',
     name:'main',
     component:main,
   },
   {
    path: '/board',
    name:'board',
    component:board,
  }
  ,
   {
    path: '/statistic',
    name:'statistic',
    component:statistic,
  }
 ]
})

export default router
