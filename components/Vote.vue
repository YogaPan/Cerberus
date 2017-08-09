<template>
  <div id="vote-container" class="pop-fullscreen" v-if="showVotePopUp">
    <div id="vote-inside-container">

      <div class="vote-area">

        <div class="vote-area-top">
          <h1>Vote Title</h1>
        </div>

        <div class="vote-area-middle">
          <div class="vote-item">
            <p>Radio Button 1</p>
          </div>
          <div class="vote-item">
            <p>Radio Button 2</p>
          </div>

          <div class="vote-item">
            <p>Radio Button 3</p>
          </div>
        </div>

        <div class="vote-area-bottom">
          <button class="button-trans" @click="vote">Confirm</button>
        </div>
      </div>

      <div class="result-area">
        <div class="result-area-top">
          <h1>Result</h1>
        </div>

        <div class="result-area-bottom">
          <!-- TODO -->
        </div>
      </div>

    </div>
  </div>
</template>

<script>
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
}
</script>

<style>

#vote-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}

#vote-inside-container {
  display: flex;
  flex-direction: row;
  align-items: stretch;
  justify-content: space-between;

  width: 1000px;
  height: 600px;
}

/* ============================= Vote Area ================================= */

.vote-area {
  flex: 1 0 0;

  display: flex;
  flex-direction: column;
  align-items: stretch;
  justify-content: space-between;

  padding-right: 40px;
}

.vote-area-top {
  flex: 0 0 100px;
}

.vote-area-top h1 {
  font-size: 100px;
  color: #ccc;
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

  position: relative;
}

.vote-area button {
  position: absolute;
  bottom: 0;
}


/* ============================== Result Area =============================== */
.result-area {
  flex: 0 0 400px;

  display: flex;
  flex-direction: column;
  align-items: stretch;
  justify-content: flex-start;
}

.result-area-top h1 {
  font-size: 100px;
  color: #ccc;
}

.result-area-bottom {
  flex: 1 0 0;
  background-color: #222;

  border-radius: 10px;
}

/* ============================= Vote Item ================================= */

.vote-item {
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;

  height: 100px;
  border: 3px solid #aaa;
  border-radius: 10px;

  transition: .1s;
  cursor: pointer;
}

.vote-item p {
  color: #ccc;
  font-size: 30px;
}

/* ============================== Hover =================================== */
.vote-item:hover {
  background-color: #ccc;
}

.vote-item:hover p {
  color: black;
  font-size: 30px;
}
</style>
