<template>
  <div id="question-container">

    <div class="inside-container">

      <div class="question-title">
        <!-- <p>Vote Title</p> -->
        <input v-model="title" class="input-big" type="text" placeholder="Question Title" />
      </div>

      <div class="question" v-for="question in questions">
        <p>Question {{ question.id }}</p>
        <input v-model="question.content" class="input" type="text" />
      </div>

      <div class="new-question" @click="addNewQuestion">
        <img src="/assets/plus-sign.svg" alt="add">
      </div>

      <button @click="sendQuestion" id="question-button" class="button-trans">Ask</button>

    </div>
  </div>
</template>

<script>
var socket = require('socket.io-client')('http://140.136.150.75:8888');

export default {
  data() {
    return {
      title: '',
      questions: [
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
      this.questions.push({
        id: this.questions.length+1,
        content: ''
      })
    },
    sendQuestion() {
      socket.emit('ask', {
        title: this.title,
        questions: this.questions
      })

      this.title = ''
      this.questions = [
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

.question {
  margin-bottom: 30px;
}

.question p {
  margin-bottom: 5px;

}

.new-question {
  height: 75px;
  width: 75px;

  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;

  border: 3px solid #ddd;
  border-radius: 10px;
}

.new-question img {
  height: 50px;
  width: 50px;
}

.new-question:hover {
  cursor: pointer;
  /*filter: invert(100%);*/
}

#question-button {
  position: absolute;

  bottom: 20px;
  left: 50%;
  transform: translateX(-50%);
}
</style>
