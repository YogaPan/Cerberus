<template>
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

/* ============================== Hover =================================== */
.vote-item:hover {
  background-color: #ccc;
}

.vote-item:hover input[type="radio"] + label {
  color: black;
  font-size: 30px;
}

.vote-item:hover input[type="radio"] + label span {
     background-color: black;
}
</style>
