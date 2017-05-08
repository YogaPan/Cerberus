import Vue from 'vue'
import VueRouter from 'vue-router'

import App from './App.vue'
import Name from './router/Name.vue'
import Members from './router/Members.vue'

Vue.use(VueRouter)

const router = new VueRouter({
  // mode: 'history',
  routes: [
    { path: '', name: 'root', redirect: '/name' },
    { path: '/name', name: 'name', component: Name },
    { path: '/members', name: 'members', component: Members }
  ]
})

new Vue({
  el: '#app',
  router,
  render: h => h(App)
})
