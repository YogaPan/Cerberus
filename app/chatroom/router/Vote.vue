<template>
  <div id="question-container">

    <div class="inside-container">

      <div class="question-title">
        <!-- <p>Vote Title</p> -->
        <input class="input-big" type="text" placeholder="Question Title" />
      </div>

      <div class="question" v-for="question in questions">
        <p>Question {{ question.id }}</p>
        <input class="input" type="text" />
      </div>

      <div class="new-question" @click="addNewQuestion">

      </div>

      <button id="question-button" class="button-trans">Emit vote event</button>

    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
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
  height: 100px;
  width: 100px;

  border: 3px solid #ddd;
  border-radius: 10px;
  /*background-color: red;*/
}

.new-question:hover {
  cursor: pointer;
}

#question-button {
  position: absolute;
  left: 20px;
  bottom: 20px;
}
</style>
