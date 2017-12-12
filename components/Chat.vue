<template>
  <div id="app-chat">
    <div class="online-list">
      <p v-for="onlinelist in onlinelists" style="height:35px;">
        <img class="online-user"  v-bind:src="'https://cerberus.csie.fju.edu.tw:8888/getavatar/' + onlinelist">
      </p>
    </div>
    <div class="message-container">
      <div v-for="message in sortedMessages">
      <div class="single-message">
        <img class="user-img"  v-bind:src="'https://cerberus.csie.fju.edu.tw:8888/getavatar/' + message.uid">

        <div class="text-area">
          <div class="user">
            <p>{{message.username}}</p>
          </div>

          <div class="message-area">
            <!--<div class="message" v-html="$options.filters.toEmoji(message.content)"></div>
            <div class="message">{{message.content | toEmoji}}</div>
            <div class="message">{{message.content}}</div>-->
            <div class="message"v-html="tolink($options.filters.emoji(message.content))"></div>
            <div class="msg-status">
              <div class="msg-status-read" v-if="message.read">
                read
              </div>
              <div class="msg-status-read" v-else>
                unread
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
        <div class="loader"></div>
    </div>
    <div class="typing-area">
      <div class="emoji-menu emoji" v-if="showEmojiMenu">
        <picker
          :emoji-Size="24"
          :perLine="8"
          color=""
          :native="true"  
          :exclude="['custom']"
          set="twitter"
          title="pick one"
          emoji="point_up"
          @click="addEmoji"
          >
        </picker>
      </div>
    </div>
      <!--測試中，先不用<button @click="fb">facebook</button>-->
      
      <!--<button@click="oldMessages">測試歷史訊息的按鍵</button>-->
      <div class="user-input">
        <form @submit.prevent="submit">
          <input v-model="input" @click="read" type="text">
          <input @click="toggleEmojiMenu" type="button">
        </form>
      </div>
  </div>
</template>
<!-- socket io -->
<script src="https://code.jquery.com/jquery-1.10.2.min.js"></script>
<script src="/socket.io/socket.io.js"></script>
<!-- linkify -->
<script src="https://ajax.googleapis.com/ajax/libs/jquery/1.11.2/jquery.min.js"></script>
<script src="linkify.min.js"></script>
<script src="linkify-jquery.min.js"></script>
<script>
var socket = require('socket.io-client')('https://cerberus.csie.fju.edu.tw:8888');
var linkify = require('linkifyjs');
var linkifyHtml = require('linkifyjs/html');
                  require('linkifyjs/plugins/hashtag')(linkify);
import { mapGetters } from 'vuex'
import { Picker, Emoji, emojiIndex } from 'emoji-mart-vue'
import axios from 'axios'
import VueEmoji from 'vue-emoji'
import Vue from 'vue'
Vue.use(VueEmoji, { path: '/assets/emoji/' })
export default {
  data() {
    const showEmojiMenu = false;
    return {
      input: '',
      userID: '',
      roomID: '',
      showEmojiMenu,
      currentEmoji: { id: '+1' },
      onlinelists: [],
      msg: '',
    }
  },
  components: {
    Picker,
    Emoji
  },
  computed: {
    ...mapGetters({
      messages: 'messages'
    }),
    typing() {
      setTimeout(() => {
          const messageContainer = this.$el.querySelector(".message-container")
          messageContainer.scrollTop = messageContainer.scrollHeight
        }, 50)
      return (this.input === '') ? false : true
    },
    sortedMessages(state) {
      return state.messages.sort(function (a, b) {
      return a.id - b.id;
      });
    }
  },
  created: function () {
    //  init FB API
    window.fbAsyncInit = function() {
        FB.init({
          appId            : '1045259632196338',
          autoLogAppEvents : true,
          xfbml            : false,
          status           : true,
          version          : 'v2.9'
        });
        FB.AppEvents.logPageView();   
      };
      (function(d, s, id){
         var js, fjs = d.getElementsByTagName(s)[0];
         if (d.getElementById(id)) {return;}
         js = d.createElement(s); js.id = id;
         js.src = "//connect.facebook.net/en_US/sdk.js";
         fjs.parentNode.insertBefore(js, fjs);
       }(document, 'script', 'facebook-jssdk'));
    //  Init, get leatest 20 messages
    //  Get Data from API
    this.oldMessages();
    //  Submit to State
    
    //  加入房间
      socket.on('connect', function () {
        socket.emit('join');
      });

  },
  mounted: function () {
    socket.on('new message', data => {
        this.$store.dispatch('submit', data)
        setTimeout(() => {
          const messageContainer = this.$el.querySelector(".message-container")
          messageContainer.scrollTop = messageContainer.scrollHeight
        }, 50)
    });
    socket.on('online', onlineArr => {
        //  刪除陣列重複元素
        var new_array = onlineArr
        for(var i=0; i<new_array.length; ++i) 
        {
          for(var j=i+1; j<new_array.length; ++j)
          {
              if(new_array[i] === new_array[j])
              new_array.splice(j, 1);
          } 
        }
        this.onlinelists = new_array
        //console.log(onlineArr)
        console.log(this.onlinelists)
    });
  },
  beforeDestroy: function () {
    socket.emit('leave');
  },
  methods: {
    read() {
      this.$store.dispatch('read')
    },
    submit() {
      if (this.input !== '') {
        socket.emit('new message', this.input);
        //this.$store.dispatch('submit', this.input)
        this.input = ''
        setTimeout(() => {
          const messageContainer = this.$el.querySelector(".message-container")
          messageContainer.scrollTop = messageContainer.scrollHeight
        }, 50)
      }
    },
    oldMessages() {
      var pathname = window.location.pathname.substring(window.location.pathname.lastIndexOf('/')+1);
      var that = this
        axios.post('/oldMessages',{url:pathname})
          .then(function (response) {
            console.log(response);
            response.data.message.forEach(element => {
              that.$store.dispatch('insert', element);
            });
          })
          .catch(function (error) {
            console.log(error);
          });
        //  this.$store.dispatch('submit', data)
        //  把得到的資料傳入
    },
    toggleEmojiMenu(event) {
      this.showEmojiMenu = !this.showEmojiMenu
      event.stopPropagation()
    },
    addEmoji(emoji) {
      this.currentEmoji = emoji
      this.input += this.currentEmoji.native
    },
    tolink(value) {
      return linkifyHtml(value,{defaultProtocol: 'https'});
    },
    fb() {
      FB.getLoginStatus(function(response) {
        if (response.status === 'connected') {
          var accessToken = response.authResponse.accessToken;
        }
        var url = "http://logdown.com";
        FB.api(
          '/?id='+url+'&fields=id,og_object{id,title,image}',
          'GET',
          {access_token: accessToken},
          function(response) {
              //var img = JSON.parse(response.og_object.image);
              console.log(response.og_object.image);
              console.log(response.og_object.image[0].url); //img url
          }
        );   
        } ); 
    },
    getAvatar(userID) {
      axios.get('/avatar', {
        params: {
          "id" : [userID]
        }
      })
      .then(function (response) {
        console.log(response);
      })
      .catch(function (error) {
        console.log(error);
      });
    },
    removeArray(arr) {
      var what, a = arguments, L = a.length, ax;
      while (L > 1 && arr.length) {
      what = a[--L];
        while ((ax= arr.indexOf(what)) !== -1) {
          arr.splice(ax, 1);
        }
      }
      return arr;
    },
  },
  filters: {
    toEmoji: function (value) {
      let string = value
      let colonsRegex = new RegExp('(^|\\s)(\:[a-zA-Z0-9-_+]+\:(\:skin-tone-[2-6]\:)?)', 'g')
      let match
      while (match = colonsRegex.exec(string)) {
        let colons = match[2]
        let colonsA = colons.replace(/:/g, "")
        let emojis = emojiIndex.search(colonsA)
        if (emojis.length > 0) {
          return emojis[0].native
        } else {
          return colons
        }
      }
    }
  }
}
</script>

<style>
.online-list {
  height: 50px;
  background-color: rgba(0,0,0,0.7);
  display: flex;
  flex-direction: row;
  align-items: stretch;
  align-items: center;
}
.online-user {
  height: 35px;
  width: 35px;
  background-color: white;
  border-radius:50%;
  align-items:stretch;
  justify-content: center;
  margin-left: 10px;
  object-fit: cover;
}
#app-chat {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: stretch;
  height: 100%;
  border-left: 2px solid black;
}
.message-container {
  overflow: scroll;
  overflow-x: hidden;
  flex: 1 0 0;
  width: 100%;
  align-self: stretch;
  padding: 10px 20px;
  background-color: #f2f1f4;
}
.single-message {
  display: flex;
  align-items:flex-end;
  flex-direction:row;
  align-items:flex-start;
  margin-bottom: 15px;
}
.user-img {
  width:36px;
  height:36px;
  margin-right: 5px;
  border: 1px solid #555555;
  border-radius: 3px;
  object-fit: cover;
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
.emotion {
  vertical-align:bottom;
  width: 20px;
  height: 20px;
}
.message {
  font-size: 15px;
  color: black;
  font-family: sans-serif;
  background: #ffffff;
  border: 1px solid #ccc;
  border-radius: 15px;
  padding:8px;
  max-width:220px;
  word-break: break-all;
  vertical-align:top;
}
.linkified {
  color: #4169E1;
}
.msg-status {
  color: #5B5B5B;
  font-size: 8px;
  display: flex;
  flex-direction: column;
  margin-left: 5px;
}
.msg-status-read {
  font-size: 5px;
  line-height: 12px;
  margin-bottom: 4px;
}
.msg-status-time {
  font-size: 5px;
  line-height: 12px;
}
.typing-area {
  position: relative;
  flex-direction: row;
}
.is-typing {
  z-index: 5;
  display: flex;
  align-items: center;
  justify-content: center;
  flex: 0 0 40px;
  background-color:#f2f1f4;
  align-self: stretch;
}
input[type=button]{
  background-color: rgba(0,0,0,0);
  background-image:url(/assets/smileIcon.png);
  width:8%;
  height:26px;
  background-size:cover;
  align-items:flex-end;
  border: none;
  outline:none;
}
form {
  display: inline-flex;
  width: 100%;
  justify-content:flex-end;
  align-items:center;
}
.user-input {
  padding-right: 3px;

  margin: 5px;
  display: flex;
  flex: 0 0 45px;
  border: 2px solid #ddd;
  border-radius: 5px;
}
.user-input input[type=text] {
  /* box model */
  -webkit-box-sizing: border-box;
     -moz-box-sizing: border-box;
          box-sizing: border-box;
  /* border and shape */
  height: 45px;
  width: 92%;
  border: 2px solid #ddd;
  border-radius: 5px;
  /* font and padding */
  margin-right: 3px;
  font-size: 15px;
  color: #444;
  font-family: sans-serif;
  display: inline-flex;
}
/* when user click this input */
.user-input input[type=text]:focus, user-input:focus {
  outline: none;
  border: 2px solid #aaa;
}
.loader,
.loader:before,
.loader:after {
  border-radius: 50%;
  width: 0.8em;
  height: 0.8em;
  -webkit-animation-fill-mode: both;
  animation-fill-mode: both;
  -webkit-animation: load7 1.8s infinite ease-in-out;
  animation: load7 1.8s infinite ease-in-out;
}
.loader {
  color: #666666;
  font-size: 10px;
  position: relative;
  text-indent: -9999em;
  -webkit-transform: translateZ(0);
  -ms-transform: translateZ(0);
  transform: translateZ(0);
  -webkit-animation-delay: -0.16s;
  animation-delay: -0.16s;
  margin-bottom: 75px;
}
.loader:before,
.loader:after {
  content: '';
  position: absolute;
  top: 0;
}
.loader:before {
  left: -3.5em;
  -webkit-animation-delay: -0.32s;
  animation-delay: -0.32s;
}
.loader:after {
  left: 3.5em;
}
@-webkit-keyframes load7 {
  0%,
  80%,
  100% {
    box-shadow: 0 2.5em 0 -1.3em;
  }
  40% {
    box-shadow: 0 2.5em 0 0;
  }
}
@keyframes load7 {
  0%,
  80%,
  100% {
    box-shadow: 0 2.5em 0 -1.3em;
  }
  40% {
    box-shadow: 0 2.5em 0 0;
  }
}
.emoji {
  z-index: 10;
  position: absolute;
  border-radius: 10px;
  background-color: #E6E6FA;
  box-shadow: 0px 8px 16px 0px rgba(0,0,0,0.2);
}
.emoji-menu {
  top: -425px;
  display: inline-block;
  flex-direction: column;
  align-items: stretch;
  justify-content: flex-start;
}
</style>