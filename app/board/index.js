import Vue from 'vue'
import VueRouter from 'vue-router'

import App from './App.vue'
import Rooms from './router/Rooms.vue'
import Settings from './router/Settings.vue'

import { store } from './store'

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
  store,
  render: h => h(App)
})
