import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export const store = new Vuex.Store({
  state: {
    roomName: '',
    members: []
  },

  getters: {
    membersId(state) {
      return state.members.map(member => member.id)
    }
  }

  mutations: {
    updateRoomName(state, roomName) {
      state.roomName = roomName
    },
    addMember(state, newMember) {
      state.members.push(newMember)
    },
    removeMember(state, id) {
      state.members = state.members.filter(member => {
        return member.id !== id
      })
    }
  }
})
