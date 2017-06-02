import Vue from 'vue'
import Vuex from 'vuex'

import axios from 'axios'

Vue.use(Vuex)

export const store = new Vuex.Store({
  state: {
    username: '',
    nickname: '',
    invites: [],
    rooms: []

    // frontend debug variables
    // username: 'yogapan8532',
    // nickname: '東谷羽琉',
    // invites: [
    //   { roomName: 'fuck123', from: 'garylai' },
    //   { roomName: '大屌群組', from: 'husky' },
    //   { roomName: '大屌群組', from: 'husky' },
    //   { roomName: '大屌群組', from: 'husky' },
    //   { roomName: '大屌群組', from: 'husky' },
    //   { roomName: '大屌群組', from: 'husky' }
    // ],
    // rooms: [
    //   { name: '大雞雞的對談', description: 'big black cock', url: '#213fds' },
    //   { name: '大雞雞的對談', description: 'big black cock', url: '#213fds' },
    //   { name: '大雞雞的對談', description: 'big black cock', url: '#213fds' },
    //   { name: '大雞雞的對談', description: 'big black cock', url: '#213fds' },
    //   { name: '大雞雞的對談', description: 'big black cock', url: '#213fds' },
    //   { name: '大雞雞的對談', description: 'big black cock', url: '#213fds' },
    //   { name: '大雞雞的對談', description: 'big black cock', url: '#213fds' },
    // ]
  },

  getters: {
    /* TODO */
  },

  mutations: {
    getAllInformation(state, data) {
      state.username = data.username
      state.rooms    = data.chatroom
      state.invites  = data.chatroom_invite
    }
  },

  actions: {
    getAllInformation({ commit }) {
      axios.post('/board')
        .then(response => {
          const data = response.data
          commit('getAllInformation', data)
        })
        .catch(error => {
          console.error(error)
        })
    }
  }
})
