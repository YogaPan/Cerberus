<template>
  <div id="root-container">
    <div id="left-container">
      <router-view></router-view>

      <div id="menubar-container">
        <div class="menu-item">
          <router-link to="/camera">
            <img class="item-image" src="/assets/cross.png" alt="snake">
            <p>Video</p>
          </router-link>
        </div>
        <div class="menu-item">
          <router-link to="/screen">
            <img class="item-image" src="/assets/cross.png" alt="snake">
            <p>Screen</p>
          </router-link>
        </div>
        <div class="menu-item">
          <router-link to="/whiteboard">
            <img class="item-image" src="/assets/cross.png" alt="snake">
            <p>Whiteboard</p>
          </router-link>
        </div>
        <div class="menu-item">
          <router-link to="/vote">
            <img class="item-image" src="/assets/cross.png" alt="snake">
            <p>Vote</p>
          </router-link>
        </div>
        <div class="menu-item">
          <router-link to="/notes">
            <img class="item-image" src="/assets/cross.png" alt="snake">
            <p>Notes</p>
          </router-link>
        </div>
        <div class="menu-item">
          <router-link to="/files">
            <img class="item-image" src="/assets/cross.png" alt="snake">
            <p>Files</p>
          </router-link>
        </div>
      </div>
    </div>

    <div id="right-container">
      <app-chat></app-chat>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import Chat from '../../components/Chat.vue'

export default {
  data() {
    return {
      // TODO
    }
  },
  mointed() {
    // TODO
  },
  methods: {
    // TODO
  },
  components: {
    'app-chat': Chat
  }
}
</script>

<style>
#root-container {
  display: flex;
  flex-direction: row;
  align-items: stretch;
  justify-content: flex-start;

  height: 100vh;
  background-color: blue;
}

#left-container {
  flex: 1 0 0;
  background-color: black;

  display: flex;
  flex-direction: column;
  align-items: stretch;
  justify-content: flex-start;
}

#right-container {
  flex: 0 0 350px;
  height: 100%;
}

#menubar-container {
  flex: 0 0 50px;
  background-color: white;

  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-around;
}

.menu-item {
  /* flex: 0 0 75px; */
  flex: 1 0 0px;

  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  border: 1px solid #ddd;
  background-color: #eee;

  /*cursor: pointer;*/
}

.menu-item p {
  font-size: 12px;
}

.item-image {
  height: 20px;
  width: 20px;
}
</style>
