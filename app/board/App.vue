<template>
  <div id="root-container">

    <div id="top-container">
      <button id="menu" href="#menu" @click="toggleLeftBar">&#9776;</button>
      <a id="corna" href="/">Corna</a>
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
                <img src="/assets/logout-2.png" alt="gear">
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
    const showLeftBar = (window.innerWidth > 700 ? true : false)

    return {
      showLeftBar
    }
  },
  computed: {
    /* TODO */
  },
  methods: {
    toggleLeftBar() {
      this.showLeftBar = !this.showLeftBar
    },
    isActive(item) {
      return {
        'active': item === this.$route.name
      }
    },
    logout() {
      axios.get('/logout').then(response => {
        const body = response.data

        if (body.success) {
          document.location.href = '/login'
        } else {
          this.errorType = 'logout'
          // this.promptMessage = body.message
        }
      }).catch(error => {
        this.errorType = 'request'
        // this.promptMessage = error.message

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

#list-container {
  background-color: white;
  width: 100%;
}

.list-item {
  /* TODO */
}

.list-item a {
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: flex-start;

  padding-left: 5px;
  height: 30px;
  border-radius: 5px;

  font-size: 15px;
  font-weight: 400;
  font-family: 'helvetica', sans-serif;
  color: #555;
}

.list-item:hover a {
  background-color: #444;
  color: white;
}

.list-item:hover img {
  filter: invert(1.0);
}

.list-item img {
  height: 20px;
  width: 20px;

  margin-right: 10px;

  filter: invert(.5);
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

#corna {
  font-size: 25px;
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
