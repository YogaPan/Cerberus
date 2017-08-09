<template>
  <div id="root-container">
    <div id="vote-container" class="pop-fullscreen" v-if="showVotePopUp">
      <div id="vote-inside-container">

        <div class="vote-area">

          <div class="vote-area-top">
            <h1>Vote Title</h1>
          </div>

          <div class="vote-area-middle">
            <!-- <form method="post"> -->
              <div class="vote-item">
                <input type="radio" name="radio" id="radio01" value="option1" />
                <label for="radio01"><span></span>Radio Button 1</label>
              </div>

              <div class="vote-item">
                <input type="radio" name="radio" id="radio02" value="option2" />
                <label for="radio02"><span></span>Radio Button 2</label>
              </div>

              <div class="vote-item">
                <input type="radio" name="radio" id="radio03" value="option3" />
                <label for="radio03"><span></span>Radio Button 3</label>
              </div>
            <!-- </form> -->
          </div>

          <div class="vote-area-bottom">
            <button class="button-trans" @click="vote">Confirm</button>
          </div>
        </div>

        <div class="result-area">
          <p>Result</p>

          <div class="vote-graph">
            <!-- TODO -->
          </div>
        </div>

      </div>
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
      showVotePopUp: true
    }
  },
  mounted() {
    // TODO
  },
  methods: {
    vote() {
      this.showVotePopUp = false
    }
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
  flex-direction: row;
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

#vote-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}

#vote-container h1, #vote-container p {
  font-size: 100px;
  color: white;
}

#vote-inside-container {
  display: flex;
  flex-direction: row;
  align-items: stretch;
  justify-content: space-between;

  width: 1000px;
  height: 600px;
}

.vote-area {
  flex: 1 0 0;

  display: flex;
  flex-direction: column;
  align-items: stretch;
  justify-content: space-between;
}

.vote-area-top {
  flex: 0 0 100px;
}

.vote-area-middle {
  flex: 1 0 0;

  display: flex;
  flex-direction: column;
  align-items: stretch;
  justify-content: space-between;
}

.vote-area-bottom {
  flex: 0 0 100px;

  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
}

.result-area {
  flex: 0 0 400px;

  display: flex;
  flex-direction: column;
  align-items: stretch;
  justify-content: flex-start;
}

.vote-graph {
  flex: 1 0 0;
  background-color: #222;

  border-radius: 10px;
}

.vote-item {
  height: 100px;
  border: 3px solid #aaa;
  border-radius: 10px;
}

.vote-item input[type="radio"] {
  display: none;
}

.vote-item input[type="radio"] + label {
  color: white;
  font-size: 30px;
}

.vote-item input[type="radio"] + label span {
    display: inline-block;
    width: 19px;
    height: 19px;
    margin: -1px 4px 0 0;
    vertical-align: middle;
    cursor: pointer;
    -moz-border-radius: 50%;
    border-radius: 50%;
}

.vote-item input[type="radio"] + label span {
     background-color: white;
}

.vote-item input[type="radio"]:checked + label span{
     background-color: #512DA8;
}

.vote-item input[type="radio"] + label span,
.vote-item input[type="radio"]:checked + label span {
  transition: background-color 0.1s linear;
}
</style>
