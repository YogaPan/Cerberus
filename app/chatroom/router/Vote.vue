<template>
  <div id="question-container">

    <div class="inside-container">

      <div class="question-title">
        <!-- <p>Vote Title</p> -->
        <input v-model="question" class="input-big" type="text" placeholder="Your Question" />
      </div>

      <div class="option" v-for="option in options">
        <p>Option {{ option.id }}</p>
        <input v-model="option.content" class="input" type="text" />
      </div>

      <div class="new-option" @click="addNewQuestion">
        <img src="/assets/plus-sign.svg" alt="add">
      </div>

      <button @click="sendQuestion" id="ask-button" class="button-trans">Ask</button>

    </div>
  </div>
</template>

<script>
var socket = require('socket.io-client')('http://140.136.150.75:8888');

export default {
  data() {
    return {
      question: '',
      options: [
        { id: 1, content: '' },
        { id: 2, content: '' }
      ]
    }
  },
  mounted() {
    // TODO
  },
  methods: {
    addNewQuestion() {
      this.options.push({
        id: this.options.length+1,
        content: ''
      })
    },
    sendQuestion() {
      socket.emit('ask', {
        question: this.question,
        options: this.options
      })

      this.question = ''
      this.options = [
        { id: 1, content: '' },
        { id: 2, content: '' }
      ]
    }
  }
}
</script>

<style>
#question-container {
  flex: 1 0 0;

  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  /* box model */
  padding-top: 50px;

  background-color: #fafafa;
}

.inside-container {
  position: relative;

  background-color: white;
  border-radius: 20px;
  padding: 20px;
  height: 100%;
  width: 80%;
}

.question-title {
  margin-bottom: 30px;
}

.question-title .input-big {
  width: 100%;
}

.option {
  margin-bottom: 30px;
}

.option p {
  margin-bottom: 5px;

}

.new-option {
  height: 75px;
  width: 75px;

  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;

  border: 3px solid #ddd;
  border-radius: 10px;
}

.new-option img {
  height: 50px;
  width: 50px;

  filter: invert(30%);
}

.new-option:hover {
  cursor: pointer;
}

#ask-button {
  position: absolute;

  bottom: 20px;
  left: 50%;
  transform: translateX(-50%);
}
</style>
