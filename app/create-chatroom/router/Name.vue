<template>
 <div id="tutorial-container">

   <div id="middle-container">
     <div id="register-form">
       <h1>Create new Chatroom</h1>
       <p v-if="errorMessage" class="error-message">{{ errorMessage }}</p>
       <input v-model="roomName" type="text" placeholder="#room name">
     </div>
   </div>

   <div id="next">
    <button @click="nextStep" id="next-button">Next -></button>
   </div>

 </div>
</template>

<script>

export default {
  data() {
    return {
      errorMessage: ''
    }
  },
  computed: {
    roomName: {
      get() {
        return this.$store.state.roomName
      },
      set(value) {
        this.$store.commit('updateRoomName', value)
      }
    }
  },
  methods: {
    nextStep() {
      this.$store.state.roomName === '' ? this.errorMessage = 'Please fill in your room name.' : document.location.href = '#members'
    }
  }
}

</script>

<style>

#tutorial-container {
  height: 100%;
  width: 100%;

  display: flex;
  flex-direction: column;
  justify-content: stretch;
}

#middle-container {
  width: 100%;
  flex: 1 0 auto;

  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  /*background-color: blue;*/
}

#register-form {
  /*background-color: orange;*/
  width: 80%;
}

#next {
  width: 100%;
  flex: 0 0 150px;

  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
}

#register-form h1 {
  font-weight: 100;
}

#register-form .error-message {
  margin-top: 15px;
  color: red;
}

#register-form input {
  height: 50px;
  width: 100%;

  margin-top: 10px;

  border: 2px solid #ddd;
  border-radius: 5px;
  padding-left: 10px;

  font-size: 20px;
  font-weight: 300;
  color: #444;
}

#register-form input:focus {
  border: 2px solid #888;
}

#register-form input::placeholder {
  color: #ccc;
}

#next-button {
  height: 50px;
  width: 130px;

  border: none;
  border-radius: 5px;

  background-color: #333;

  font-size: 20px;
  color: white;
}

#next-button:hover {
  background-color: #512DA8;
  transition: .2s;
}

.error-message {
  color: red;
}

</style>
