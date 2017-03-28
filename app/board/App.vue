<template>
  <div id="root-container">
    <div id="left-container">

      <div id="me">
        <div id="head"></div>
        <h1>YogaPan</h1>
        <img id="down-arrow" src="/assets/down-arrow.svg" alt="down arrow">
      </div>

      <div id="list-container">
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

      <div id="room-list">
        <div id="room-container">
          <div class="room" v-for="room in rooms">
            <div class="room-content">
              <!-- <img src="/assets/down-arrow.svg" alt="down arrow"> -->
              <h1>{{ room.name }}</h1>
              <p>{{ room.description }}</p>
            </div>
          </div>

          <div id="room-add" class="room">
            <div class="room-content">
              <p>+</p>
              <!-- <img src="/assets/add.svg" alt="add"> -->
            </div>
          </div>
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
        { name: 'Random', description: 'test', src: '' },
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
  font-family: 'Roboto Condensed', 'helvetica', sans-serif, serif;
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

  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
}

#info-container:after {
  position: absolute;

  height: 2px;
  width: 96%;

  bottom: 0;
  left: 2%;

  content: "";
  background-color: #efefef;
}

#info-container h1 {
  color: #555;
  font-weight: 100;
}

#room-list {
  flex: 1 0 0;
  width: 100%;
  overflow: scroll;
}

#room-container {
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  align-items: flex-start;
  justify-content: flex-start;

  padding: 30px;
}

.room {
  width: calc(100% / 4);

  margin-bottom: 40px;

  display: flex;
  flex-direction: column;
  align-items: center;

  background-color: #f8f8f8;
}

.room-content {
  width: 200px;
  height: 200px;
  border: 1px solid #ccc;
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

#list-container {
  flex: 1 0 0;
  width: 100%;

  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: flex-start;

  padding: 40px 0 0 40px;

  background-color: #222;
}

#list-container a {
  font-size: 20px;
  color: #ccc;
}

#list-container > a + a {
  margin-top: 10px;
}

#list-container a:hover {
  background-color: white;
  color: black;
}

@media all and (max-height: 625px) {
  /* TODO */
}

@media all and (max-width: 1225px) {
  .room {
    width: calc(100% / 3);
  }
}

@media all and (max-width: 975px) {
  .room {
    width: calc(100% / 2);
  }
}

</style>
