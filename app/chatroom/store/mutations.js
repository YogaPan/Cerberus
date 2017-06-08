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
  }
}
