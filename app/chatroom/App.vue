<template>
  <div id="root-container">
    <div id="vote-popup">
      <div class="vote-title">
        <h1>想要射精嗎？</h1>
      </div>

      <!-- <div class="vote-items">
        <p class="vote-item">想</p>
        <p class="vote-item">不想</p>
        <p class="vote-item">好興奮喔</p>
      </div> -->

      <form action="POST" class="vote-items">
        <input type="radio" id="radio01" name="radio" />
        <label for="radio01"><span></span>想要</label>

        <input type="radio" id="radio02" name="radio" />
        <label for="radio02"><span></span>不要</label>

        <input type="radio" id="radio03" name="radio" />
        <label for="radio03"><span></span>好興奮</label>
      </form>
    </div>

    <div id="left-container">
      <router-view></router-view>

      <div id="menubar-container">
        <router-link class="menu-item" tag="div" to="/camera">
          <img class="item-image" src="/assets/cross.png" alt="snake">
          <p>Video</p>
        </router-link>
        <router-link class="menu-item" tag="div" to="/screen">
          <img class="item-image" src="/assets/cross.png" alt="snake">
          <p>Screen</p>
        </router-link>
        <router-link class="menu-item" tag="div" to="/whiteboard">
          <img class="item-image" src="/assets/cross.png" alt="snake">
          <p>Whiteboard</p>
        </router-link>
        <router-link class="menu-item" tag="div" to="/vote">
          <img class="item-image" src="/assets/cross.png" alt="snake">
          <p>Vote</p>
        </router-link>
        <router-link class="menu-item" tag="div" to="/notes">
          <img class="item-image" src="/assets/cross.png" alt="snake">
          <p>Notes</p>
        </router-link>
        <router-link class="menu-item" tag="div" to="/files">
          <img class="item-image" src="/assets/cross.png" alt="snake">
          <p>Files</p>
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

  cursor: pointer;
}

.menu-item p {
  font-size: 12px;
}

.item-image {
  height: 20px;
  width: 20px;
}

#vote-popup {
  position: fixed;
  height: 100%;
  width: 100%;

  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-around;

  background-color: black;

  opacity: .9;
}

.vote-title {
  flex: 1 0 0;
  width: 100%;

  /* Center */
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
}

.vote-title h1 {
  color: white;
  font-size: 100px;
}

.vote-items {
  flex: 1 0 0;
  width: 100%;

  /* Center */
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-around;
}

.vote-item {
  color: white;
  font-size: 50px;
}

input[type="radio"] {
    display: none;
}

input[type="radio"] + label {
    color: white;
    font-family: Arial, sans-serif;
    font-size: 50px;
}

input[type="radio"] + label span {
    display: inline-block;
    width: 40px;
    height: 40px;

    margin: -1px 4px 0 0;
    border-radius:  50%;

    vertical-align: middle;
    cursor: pointer;
}

input[type="radio"] + label span {
  background-color: white;
}

input[type="radio"]:checked + label span {
  background-color: #512DA8;
}

input[type="radio"] + label span,
input[type="radio"]:checked + label span {
  transition: background-color 0.3s linear;
}
</style>
