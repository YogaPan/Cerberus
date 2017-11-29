// const socket = require('socket.io-client')('http://localhost');

export default {
  submit({ commit }, messageContent) {
    commit('submit', messageContent)
  },
  read({ commit }) {
    commit('read')
  },
  insert({ commit }, messageContent) {
    commit('insert', messageContent)
  },
  popVote({ commit }, vote) {
    commit('popVote', vote)
  },
  selectVote({ commit }, id) {
    commit('selectVote', id)
  },
  doneVote({ commit }) {
    commit('doneVote')
  },
}
