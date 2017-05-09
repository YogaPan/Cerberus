<template>
 <div id="tutorial-container">

   <div id="middle-container">
     <div id="register-form">
       <h1>Create new Chatroom</h1>
       <input type="text" placeholder="#room name">
     </div>
   </div>

   <div id="next">
     <router-link to="/members">
       <button id="next-button">Next -></button>
     </router-link>
   </div>

 </div>
</template>

<script>

export default {
  data() {
    return {
      /* TODO */
    }
  },
  computed: {
    /* TODO */
  },
  methods: {
    /* TODO */
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

#register-form p {
  margin-top: 20px;
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

</style>
