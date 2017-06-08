import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export const store = new Vuex.Store({
  state: {
    roomName: '',
    members: [],
    matchedUsers: []
  },

  getters: {
    membersId(state) {
      return state.members.map(member => member.id)
    }
  },

  mutations: {
    getMatchedUsers(state, matchedUsers) {
      matchedUsers = matchedUsers.filter(user => {
        return state.members.every(member => {
          return user.id !== member.id
        })
      })

      state.matchedUsers = matchedUsers
    },
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
  },

  actions: {
    getMatchedUsers({ commit }, input) {
      if (input === '') {  // If no input, no matched users.
        return commit('getMatchedUsers', [])
      }

      axios.post('/search', {
        search: this.input
      }).then(response => {
        const body = response.data

        commit('getMatchedUsers', body.users)
      })

      // frontend debug variables
      // commit('getMatchedUsers', [
      //   { id: 1, name: 'yogapan' },
      //   { id: 2, name: 'garylai' },
      //   { id: 3, name: 'husky' },
      //   { id: 4, name: 'james' } ,
      //   { id: 5, name: 'test' },
      //   { id: 6, name: 'KD' },
      //   { id: 7, name: 'curry' },
      //   { id: 8, name: 'thompson' },
      //   { id: 9, name: 'green' },
      //   { id: 10, name: 'irving' }
      // ])
    }
  }
})
