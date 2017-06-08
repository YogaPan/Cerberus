<template>
  <div id="root-container">

    <div id="top-container">
      <button id="menu" href="#menu" @click="toggleLeftBar">&#9776;</button>
      <a id="cerberus" href="/">Cerberus</a>

      <button>

      </button>
      <img id="head-button" class="circle-image" src="/assets/snake.jpg" alt="head" @click="toggleHeadDropdown">
      <div id="head-dropdown" class="dropdown-content" v-if="showHeadDropdown">
        <div id="dropdown-self">
          <div id="dropdown-self-left">
            <img class="circle-image" src="/assets/snake.jpg" alt="head">
          </div>
          <div id="dropdown-self-right">
            <p>{{ this.$store.state.username }}</p>
            <p>{{ this.$store.state.nickname }}</p>
          </div>
        </div>

        <div id="self-list">
          <li class="list-item">
            <router-link to="/rooms">
              <img src="/assets/earth.png" alt="rooms">
              <span>Rooms</span>
            </router-link>
          </li>
          <li class="list-item">
            <router-link to="/settings">
              <img src="/assets/settings-2.png" alt="settings">
              <span>Settings</span>
            </router-link>
          </li>
          <li class="list-item" @click="logout">
            <a href="#">
              <img src="/assets/logout-2.png" alt="logout">
              <span>Logout</span>
            </a>
           </li>
        </div>
      </div>

      <img id="notification-button" src="/assets/notification.png" alt="notification" @click="toggleNotificationDropdown">
      <div id="notification-dropdown" class="dropdown-content" v-if="showNotificationDropdown">
        <div class="invite-item" v-for="invite in this.$store.state.invites">

          <div class="invite-item-left">
            <img class="circle-image" src="/assets/snake.jpg" alt="from">
          </div>

          <div class="invite-item-middle">
            <p>{{ invite.from }} invites you to join『{{ invite.roomName }}』chatroom</p>
          </div>

          <div class="invite-item-right">
            <div class="accept-area" @click="acceptInvite(invite.id)">
              <img class="accept-button" src="/assets/accept.png">
            </div>
            <div class="reject-area" @click="rejectInvite(invite.id)">
              <img class="reject-button" src="/assets/reject.png">
            </div>
          </div>

        </div>
      </div>
    </div>

    <div id="middle-container">

      <div id="left-container" v-if="showLeftBar">
        <div id="list-container">

          <ul>
            <li :class="['list-item', isActive('rooms')]">
              <router-link to="/rooms">
                <img src="/assets/chat-2.png" alt="chat">
                <span>Rooms</span>
              </router-link>
            </li>
            <li :class="['list-item', isActive('settings')]">
              <router-link to="/settings">
                <img src="/assets/settings-2.png" alt="gear">
                <span>Settings</span>
              </router-link>
            </li>
            <li class="list-item" @click="logout">
              <a href="#">
                <img src="/assets/logout-2.png" alt="logout">
                <span>Logout</span>
              </a>
             </li>
          </ul>

        </div>
      </div>

      <div id="right-container">
        <router-view></router-view>
      </div>

    </div>
  </div>
</template>

<script>

import axios from 'axios'

export default {
  data() {
    // const showLeftBar = (window.innerWidth > 700 ? true : false)
    const showLeftBar = false
    const showHeadDropdown = false
    const showNotificationDropdown = false;

    return {
      showLeftBar,
      showHeadDropdown,
      showNotificationDropdown,
    }
  },
  mounted() {
    // Get all data
    this.$store.dispatch('getAllInformation')

    // Add global event listener
    document.addEventListener('click', this.hideDropdown)
  },
  methods: {
    isActive(item) {
      return {
        'active': item === this.$route.name
      }
    },
    toggleLeftBar() {
      this.showLeftBar = !this.showLeftBar
    },
    toggleHeadDropdown(event) {
      this.showHeadDropdown = !this.showHeadDropdown
      this.showNotificationDropdown = false
      event.stopPropagation()
    },
    toggleNotificationDropdown(event) {
      this.showNotificationDropdown = !this.showNotificationDropdown
      this.showHeadDropdown = false
      event.stopPropagation()
    },
    hideDropdown() {
      this.showHeadDropdown = false
      this.showNotificationDropdown = false
    },
    acceptInvite(id) {
      axios.post('/invite', {
        id: id,
        accept: 'accept'
      }).then(response => {
        const body = response.data
        if (body.success) {
          this.$store.dispatch('getAllInformation')
        } else {
          console.error('Invite Error!')
        }
      }).catch(error => {
        console.error(error)
      })
    },
    rejectInvite(id) {
      axios.post('/invite', {
        id: id,
        accept: 'reject'
      }).then(response => {
        const body = response.data
        if (body.success) {
          this.$store.dispatch('getAllInformation')
        } else {
          console.error('Invite Error!')
        }
      }).catch(error => {
        console.error(error)
      })
    },
    logout() {
      axios.get('/logout').then(response => {
        const body = response.data

        if (body.success) {
          document.location.href = '/login'
        } else {
          console.error(body)
        }
      }).catch(error => {
        console.error(error)
      })
    }
  }
}

</script>

<style>
#root-container {
  height: 100vh;
  width: 100vw;

  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
}

#top-container {
  flex: 0 0 60px;
  width: 100%;

  position: relative;

  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
}

#middle-container {
  flex: 1 0 0;
  width: 100%;
  overflow: scroll;

  display: flex;
  flex-direction: row;
  align-items: stretch;
  justify-content: flex-start;
}

#left-container {
  flex: 0 0 200px;

  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;

  border-top: 2px solid #f8f8f8;
  padding-top: 25px;
  padding-left: 20px;
  padding-right: 15px;

  background-color: white;
}

#right-container {
  flex: 1 0 0;

  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;

  background-color: #f8f8f8;
}

#menu {
  position: absolute;
  left: 30px;

  top: 50%;
  transform: translateY(-50%);

  color: #999;
  font-size: 20px;
  background-color: white;
  cursor: pointer;
}

#menu:focus {
  outline: none;
}

#cerberus {
  font-size: 25px;
}

#notification-button {
  position: absolute;
  right: 100px;

  top: 50%;
  transform: translateY(-50%);

  cursor: pointer;

  height: 25px;
}

#head-button {
  position: absolute;
  right: 50px;

  top: 50%;
  transform: translateY(-50%);
  cursor: pointer;
}

#head-dropdown {
  right: 50px;
  top: 50px;

  min-width: 300px;

  display: flex;
  flex-direction: column;
  align-items: stretch;
  justify-content: flex-start;
}

#dropdown-self {
  display: flex;
  flex-direction: row;
  align-items: stretch;
  justify-content: flex-start;

  height: 75px;

  background-color: #eee;
}

#dropdown-self-left {
  flex: 0 0 60px;

  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}

#dropdown-self-right {
  flex: 1 0 0;

  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: center;

  font-size: 20px;
}

.list-item a {
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: flex-start;

  height: 30px;
  border-radius: 5px;
  padding: 5px 15px;

  font-size: 20px;
  font-weight: 400;
  font-family: 'helvetica', sans-serif;
  color: #222;
}

.list-item:hover a {
  background-color: #444;
  color: white;
}

.list-item:hover img {
  filter: invert(1.0);
}

.list-item img {
  height: 25px;
  width: 25px;

  margin-right: 10px;

  filter: invert(.5);
}

#notification-dropdown {
  right: 100px;
  top: 50px;

  height: 400px;
  min-width: 400px;
  overflow-y: scroll;

  display: flex;
  flex-direction: column;
  align-items: stretch;
  justify-content: flex-start;
}

.invite-item {
  /*font-size: 100px;*/
  flex: 0 0 100px;

  display: flex;
  flex-direction: row;
  align-items: stretch;
  justify-content: flex-start;

  border-bottom: 1px solid #eee;
}

.invite-item:hover {
  background-color: #f8f8f8;
}

.invite-item-left {
  flex: 0 0 50px;

  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}

.invite-item-middle {
  flex: 1 0 0;

  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: flex-start;
}

.invite-item-middle p {
  padding-right: 15px;
}

.invite-item-right {
  flex: 0 0 75px;

  display: flex;
  flex-direction: column;
  align-items: stretch;
  justify-content: space-around;

  /*border-left: 2px solid #eee;*/
  /* TODO */
}

.accept-button, .reject-button {
  height: 25px;
}

.accept-area {
  flex: 1 0 0;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
}

.reject-area {
  flex: 1 0 0;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
}

.accept-area:hover {
  transition: .2s;
  background-color: #00D62B;
  cursor: pointer;
}

.reject-area:hover {
  transition: .2s;
  background-color: #EF0035;
  cursor: pointer;
}

.dropdown-content {
  z-index: 1;
  position: absolute;

  border-radius: 10px;

  background-color: white;
  box-shadow: 0px 8px 16px 0px rgba(0,0,0,0.2);
}

.circle-image {
  height: 30px;
  width: 30px;
  border-radius: 50%;
}

.active a {
  background-color: #512DA8;
  color: white;
}

.active:hover a {
  background-color: #512DA8;
  color: white;
}

.active img {
  filter: invert(1.0);
}

@media all and (max-height: 625px) {
  /* TODO */
}

@media all and (max-width: 1225px) {
  /* TODO */
}

@media all and (max-width: 975px) {
  /* TODO */
}

@media all and (max-width: 700px) {
  #left-container {
    display: block;
    position: fixed;
    left: 0;
    top: 60px;

    width: 200px;
  }
}

</style>
