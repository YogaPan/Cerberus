import Vue from 'vue'
import VueRouter from 'vue-router'

import App from './App.vue'
import Camera from './router/Camera.vue'
// import Screen from './router/Screen.vue'
import Whiteboard from './router/Whiteboard.vue'
import Vote from './router/Vote.vue'
import Notes from './router/Notes.vue'
import Files from './router/Files.vue'

import { store } from './store'

Vue.use(VueRouter)

const router = new VueRouter({
  // mode: 'history',
  routes: [
    // { path: '', name: 'root', redirect: '/whiteboard' },
    // { path: '/camera', name: 'camera', component: Camera },
    // { path: '/screen', name: 'screen', component: Screen },
    { path: '/whiteboard', name: 'whiteboard', component: Whiteboard },
    { path: '/vote', name: 'vote', component: Vote },
    { path: '/notes', name: 'notes', component: Notes },
    { path: '/files', name: 'files', component: Files },
  ]
})

router.beforeEach((to, from, next) => {
  if (from.path === '/' && next.path !== '/') {
    store.state.playLocalVideo = false
    console.log('change another')
  } else if (to.path === '/') {
    store.state.playLocalVideo = true
    console.log('change to back')
  }

  next()
})

new Vue({
  el: '#app',
  router,
  store,
  render: h => h(App)
})
