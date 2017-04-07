import Vue from 'vue'
import VueRouter from 'vue-router'

import App from './App.vue'
import Rooms from './router/Rooms.vue'
import Settings from './router/Settings.vue'

Vue.use(VueRouter)

const router = new VueRouter({
  // mode: 'history',
  routes: [
    { path: '', name: 'root', redirect: '/rooms' },
    { path: '/rooms', name: 'rooms', component: Rooms },
    { path: '/settings', name: 'settings', component: Settings }
  ]
})

new Vue({
  el: '#app',
  router,
  render: h => h(App)
})
