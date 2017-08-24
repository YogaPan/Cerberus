import Vue from 'vue'
import Vuex from 'vuex'

import axios from 'axios'

Vue.use(Vuex)

export const store = new Vuex.Store({
  state: {
    username: '',
    nickname: '',
    invites: [],
    rooms: [],

    // frontend debug variables
    // username: 'yogapan8532',
    // nickname: '東谷羽琉',
    // invites: [
    //   { roomName: 'fuck123', from: 'garylai' },
    //   { roomName: '帥哥群聊', from: 'husky' },
    //   { roomName: '美女群聊', from: 'husky' },
    //   { roomName: '聊色嗎？', from: 'husky' },
    //   { roomName: '聊色嗎？', from: 'husky' },
    //   { roomName: '聊色嗎？', from: 'husky' }
    // ],
    // rooms: [
    //   { name: '白癡高峰會', description: 'big black cock', url: '#213fds' },
    //   { name: '爆料公社', description: 'big black cock', url: '#213fds' },
    //   { name: '報廢公社', description: 'big black cock', url: '#213fds' },
    //   { name: '大爆射', description: 'big black cock', url: '#213fds' },
    //   { name: '怕.jpg', description: 'big black cock', url: '#213fds' },
    //   { name: '吉澤明步影片交流區', description: 'big black cock', url: '#213fds' },
    //   { name: 'ABC', description: 'big black cock', url: '#213fds' },
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
