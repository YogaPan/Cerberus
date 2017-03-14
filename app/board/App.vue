<template>
  <div id="root-container">
    <div id="left-container">

      <div id="me">
        <div id="head"></div>
        <h1>YogaPan</h1>
        <img id="down-arrow" src="/assets/down-arrow.svg" alt="down arrow">
      </div>

      <div id="list">
        <a href="#">Settings</a>
        <a href="#">Rooms</a>
        <a href="#">test</a>
        <a href="#">test</a>
      </div>
    </div>

    <div id="right-container">

      <div id="info-container">
        <h1>Rooms</h1>
      </div>

      <div id="room-container">
        <div id="room-1" class="room" v-for="room in rooms">
          <!-- <img src="/assets/down-arrow.svg" alt="down arrow"> -->
          <h1>{{ room.name }}</h1>
          <p>{{ room.description }}</p>
        </div>

        <div id="room-add" class="room">
          <!-- <img src="/assets/add.svg" alt="add"> -->
        </div>
      </div>

    </div>
  </div>
</template>

<script>

export default {
  data() {
    return {
      rooms: [
        { name: 'Final-project', description: 'test', src: '' },
        { name: 'Android', description: 'test', src: '' },
        { name: 'General', description: 'test', src: '' },
        { name: 'Random', description: 'test', src: '' }
      ]
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
@import url('https://fonts.googleapis.com/css?family=Roboto+Condensed');

html, body, div, h1, h2, h3, h4, h5, h6, p, a, ul, ol, li, button, input {
  margin: 0;
  padding: 0;

  color: #333;
  font-family: 'Roboto Condensed', helvetica sans-serif, serif;
}

div, input, button {
  -webkit-box-sizing: border-box;
     -moz-box-sizing: border-box;
          box-sizing: border-box;
}

a {
  text-decoration: none;
}

input:focus {
  outline: none;
}

.room {
  width: 30%;
  height: 200px;

  border: 2px solid #ccc;

  background-color: white;
}

#root-container {
  height: 100vh;
  width: 100vw;

  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: flex-start;
}

#left-container {
  flex: 0 0 250px;
  height: 100%;

  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;

  background-color: blue;
}

#right-container {
  flex: 1 0 0;
  height: 100%;

  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
}

#info-container {
  flex: 0 0 100px;
  width: 100%;

  position: relative;
}

#info-container:after {
  position: absolute;

  height: 2px;
  width: 96%;

  bottom: 0;
  left: 2%;

  content: "";
  background-color: #eee;
}

#room-container {
  flex: 1 0 0;

  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  align-items: center;
  justify-content: center;
}

#me {
  width: 100%;
  flex: 0 0 75px;

  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: flex-start;

  padding-left: 15px;

  background-color: #512DA8;
}

#me h1 {
  margin-left: 15px;

  color: #eee;
  font-size: 20px;
}

#me h1:hover {
  cursor: pointer;
}

#down-arrow {
  margin-left: 10px;

  height: 25px;
  width: 25px;
}

#down-arrow:hover {
  cursor: pointer;
}

#head {
  width: 40px;
  height: 40px;

  border-radius: 100%;
  background-color: white;

  cursor: pointer;
}

#list {
  flex: 1 0 0;
  width: 100%;

  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: flex-start;

  padding-top: 40px;
  padding-left: 40px;

  background-color: #222;
}

#list a {
  font-size: 20px;
  color: #ccc;
}

#list a:hover {
  background-color: white;
}

@media all and (max-height: 625px) {
  /* TODO */
}

@media all and (max-width: 650px) {
  /* TODO */
}

</style>
