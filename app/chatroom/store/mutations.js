import { getTimeString } from '../utils'

export default {
  submit(state, messageContent) {
    state.messages.push({
      id: state.count,
      content: messageContent,
      time: getTimeString(),
      read: false
    })

    state.count++
  },
  read(state) {
    state.messages.forEach(message => {
      message.read = true
    })
  }
}
