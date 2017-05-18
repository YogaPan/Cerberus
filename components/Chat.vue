<template>
  <div id="app-chat">
    <div class="message-container">
      <div v-for="message in messages">
      <div class="single-message">
        <div class="user-img"> </div>

        <div class="text-area">
          <div class="user">
            <p>userID</p>
          </div>

          <div class="message-area">
            <div class="message">
              {{ message.content }}
            </div>

            <div class="msg-status">
              <div class="msg-status-read" v-if="message.read">
                已讀
              </div>
              <div class="msg-status-read" v-else>
               未讀
              </div>
              <div class="msg-status-time">
               {{ message.time }}
              </div>
            </div>
          </div>

        </div>
      </div>
      </div>
    </div>

    <div class="is-typing" v-if="typing">
      <p>正在輸入訊息</p>
    </div>

    <div class="user-input">
      <form @submit.prevent="submit">
        <input v-model="input" @click="read" placeholder="#chatroom">
      </form>
    </div>
  </div>
</template>

<script src="https://code.jquery.com/jquery-1.10.2.min.js"></script>
<script src="/socket.io/socket.io.js"></script>
<script>
var socket = require('socket.io-client')('http://140.136.150.75:8888');
import { mapGetters } from 'vuex'
export default {
  data() {
    return {
      input: ''
    }
  },
  computed: {
    ...mapGetters({
      messages: 'messages'
    }),
    typing() {
      return (this.input === '') ? false : true
    },
    /*getmsg() {
      socket.on('new message', function (data) {
      this.$store.dispatch('submit', data)
      const messageContainer = this.$el.querySelector(".message-container")
      messageContainer.scrollTop = messageContainer.scrollHeight
    });
    }*/
  },
  mounted: function () {
    socket.on('new message', data => {
        this.$store.dispatch('submit', data)
        setTimeout(() => {
        	const messageContainer = this.$el.querySelector(".message-container")
        	messageContainer.scrollTop = messageContainer.scrollHeight
        }, 200)
    });
  },
  methods: {
    read() {
      this.$store.dispatch('read')
    },
    submit() {
      if (this.input !== '') {
        socket.emit('new message', this.input);
        this.$store.dispatch('submit', this.input)
        this.input = ''
        setTimeout(() => {
        	const messageContainer = this.$el.querySelector(".message-container")
        	messageContainer.scrollTop = messageContainer.scrollHeight
        }, 200)
      }
    }
  }
}

</script>

<style scoped>
#app-chat {
  position: absolute;
  top: 0;
  right: 0;
  height: 100vh;
  width: 350px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: stretch;
  border-left: 2px solid black;
}
.message-container {
  overflow: scroll;
  overflow-x: hidden;
  height: 100vh;
  width: 100%;
  align-self: stretch;
  padding: 10px 20px;
}
.single-message {
  display: flex;
  align-items:flex-end;
  flex-direction:row;
  align-items:flex-start;
  margin-bottom: 15px;
}
.user-img {
  width:25px;
  height:25px;
  margin-right: 5px;
  border: 3px solid #ccc;
}
.text-area{
  flex-direction:column;
}
.user {
  margin-top: 5px;
  font-size: 12px;
}
.message-area {
  margin-top: 5px;
  display: flex;
  flex-direction:row;
  align-items:flex-end;
}
.message {
  font-size: 14px;
  color: white;
  font-family: sans-serif;
  background: #0084ff;
  border: 1px solid #ccc;
  border-radius: 15px;
  padding:8px;
}
.msg-status {
  font-size: 8px;
  display: flex;
  flex-direction: column;
  margin-left: 5px;
}
/* margin-left: 8px;
   margin-bottom: 5px;
*/
.msg-status-read {
  line-height: 12px;
  margin-bottom: 2px;
}
.msg-status-time {
  line-height: 12px;
}
.is-typing {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 40px;
  align-self: stretch;
}
.user-input {
  height: 35px;
}
.user-input input {
  /* box model */
  -webkit-box-sizing: border-box;
     -moz-box-sizing: border-box;
          box-sizing: border-box;
  /* border and shape */
  height: 35px;
  width: 100%;
  border: 2px solid #ddd;
  border-radius: 5px;
  /* font and padding */
  padding-left: 8px;
  font-size: 15px;
  color: #444;
  font-family: sans-serif;
}
/* when user click this input */
.user-input input:focus {
  outline: none;
  border: 2px solid #aaa;
}
p {
  color: ;
  margin: 0px;
  line-height: 16px;
}
</style>
