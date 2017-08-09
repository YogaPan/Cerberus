<template>
  <div id="vote-container" class="pop-fullscreen" v-if="showVotePopUp">
    <div id="vote-inside-container">

      <img id="cancel" src="/assets/cross.png" v-if="showResult" @click="cancel">

      <div class="vote-area" v-if="!showResult">

        <div class="vote-area-top">
          <h1>Vote Title</h1>
        </div>

        <div class="vote-area-middle">
          <div class="vote-item" v-for="option in options" :class="{'selected-vote-item': option.isSelected}" @click="select(option.id)">
            <p>{{ option.content }}</p>
          </div>
        </div>

        <div class="vote-area-bottom">
          <button class="button-trans" @click="vote">Confirm -></button>
        </div>
      </div>

      <div class="result-area" v-else>
        <div class="result-area-top">
          <h1>Result</h1>
        </div>

        <div class="result-area-bottom">

        </div>
      </div>

    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      showVotePopUp: true,
      showResult: false,
      options: [
        { id: 1, content: 'Option 1', isSelected: false },
        { id: 2, content: 'Option 2', isSelected: false },
        { id: 3, content: 'Option 3', isSelected: false }
      ]
    }
  },
  mounted() {
    // TODO
  },
  methods: {
    select(id) {
      console.log(id)
      this.options[id-1].isSelected = !this.options[id-1].isSelected
    },
    vote() {
      this.showResult = true
    },
    cancel() {
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

  width: 800px;
  height: 600px;
}

/* ============================= Vote Area ================================= */

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

.selected-vote-item {
  background-color: #ccc;
}

.selected-vote-item p {
  color: black;
}

/* ============================== Hover =================================== */
.vote-item:hover {
  background-color: #ccc;
}

.vote-item:hover p {
  color: black;
  font-size: 30px;
}

/* ============================== Result Area =============================== */
.result-area {
  flex: 1 0 0;

  display: flex;
  flex-direction: column;
  align-items: stretch;
  justify-content: flex-start;

  /*transition: 1s;*/
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

/* ================================ Others ================================== */

#cancel {
  position: absolute;
  top: 20px;
  right: 20px;

  height: 40px;
  width: 40px;

  transition: .2s;
  filter: invert(100%);
  cursor: pointer;
}

#cancel:hover {
  height: 45px;
  width: 45px;
}
</style>
