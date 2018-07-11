import Vue from 'vue'
import vueRouter from 'vue-router'
import xlsx from '@/page/xlsx.vue'

Vue.use(vueRouter)

export default new vueRouter({
  routes: [{
    path: '/',
    name: 'home',
    component: xlsx
  }]
})