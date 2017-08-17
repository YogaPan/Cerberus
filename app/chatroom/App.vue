<template>
  <div id="root-container">

    <!-- <app-vote></app-vote> -->
    <app-vote v-if="this.$store.state.question"></app-vote>

    <div id="left-container">
      <router-view></router-view>

      <div id="menubar-container">
        <!-- <router-link class="menu-item" tag="div" to="/camera">
          <img class="item-image" src="/assets/cross.png" alt="snake">
          <p>Video</p>
        </router-link>
        <router-link class="menu-item" tag="div" to="/screen">
          <img class="item-image" src="/assets/cross.png" alt="snake">
          <p>Screen</p>
        </router-link> -->
        <router-link class="menu-item" tag="div" to="/whiteboard">
          <img class="item-image" src="/assets/brush.svg" alt="whiteboard">
          <p>Whiteboard</p>
        </router-link>
        <router-link class="menu-item" tag="div" to="/notes">
          <img class="item-image" src="/assets/list.svg" alt="notes">
          <p>Notes</p>
        </router-link>
        <router-link class="menu-item" tag="div" to="/files">
          <img class="item-image" src="/assets/link.svg" alt="files">
          <p>Files</p>
        </router-link>
        <router-link class="menu-item" tag="div" to="/vote">
          <img class="item-image" src="/assets/megaphone.svg" alt="vote">
          <p>Vote</p>
        </router-link>
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
import Vote from '../../components/Vote.vue'
var socket = require('socket.io-client')('http://140.136.150.75:8888')

export default {
  data() {
    return {
      // TODO
    }
  },
  mounted() {
    socket.on('ask', (vote) => {
      this.$store.dispatch('popVote', vote)
    })
  },
  methods: {
    // TODO
  },
  components: {
    'app-chat': Chat,
    'app-vote': Vote
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
  width: 100vw;
  /*background-color: blue;*/
}

#left-container {
  flex: 1 0 0;
  min-width: 0;  /* flexbox overflow */

  display: flex;
  flex-direction: column;
  align-items: stretch;
  justify-content: flex-start;
}

#right-container {
  flex: 0 0 350px;
  height: 100%;
}

/* ================================= menu =================================== */

#menubar-container {
  flex: 0 0 50px;
  background-color: white;

  display: flex;
  flex-direction: row;
  align-items: stretch;
  justify-content: space-around;
}

.menu-item {
  /* flex: 0 0 75px; */
  flex: 1 0 0px;

  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;

  /*border: 1px solid #ddd;*/
  /*border-radius: 100px;*/
  background-color: #eee;

  cursor: pointer;
}

.menu-item p {
  font-size: 12px;
}

.menu-item img {
  height: 20px;
  width: 20px;
}

/* =========================== menu-item:hover ============================= */

.menu-item:hover {
  background-color: #333;
  transition: .2s;
}

.menu-item:hover p {
  color: white;
  transition: .2s;
}

.menu-item:hover img {
  filter: invert(100%);
}

</style>
