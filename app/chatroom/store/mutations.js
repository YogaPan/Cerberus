import { getTimeString } from '../utils'

export default {
  submit(state, messageContent) {
    state.messages.push({
      id: state.count,
      content: messageContent.message,
      time: getTimeString(),
      read: false,
      username: messageContent.username
    })

    state.count++
  },
  read(state) {
    state.messages.forEach(message => {
      message.read = true
    })
  },
  insert(state, messageContent) {
    new Date();
    state.messages.push({
      id: messageContent.id,
      content: messageContent.content,
      time: messageContent.time,
      read: false,
      username: messageContent.username
    })
  //  splice(index, count_to_remove, addelement1, addelement2, ...)
  },
  popVote(state, vote) {
    state.question = vote.question

    // Add 'isSelected' property to option
    state.options = vote.options.map((option) => {
      option.isSelected = false
    })
  },
  doneVote(state) {
    state.question = ''
    state.options = []
  }
}
