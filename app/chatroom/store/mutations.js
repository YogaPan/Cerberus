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
    state.messages.splice(0,0,{
      id: state.count,
      content: messageContent.message,
      time: getTimeString(),
      read: false,
      username: messageContent.username
    })
  //  splice(index, count_to_remove, addelement1, addelement2, ...)
  },
}
