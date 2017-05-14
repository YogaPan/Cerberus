<template>
  <div id="settings-container">
    <div id="settings-content">
      <h2 class="center">Settings</h2>
      <hr class="line">

      <div id="profile">

        <div id="profile-left">
          <img id="head-image" src="/assets/snake.jpg"></img>
        </div>

        <div id="profile-right">
          <h2 id="username">Username</h2>
          <input type="text" value="yogapan85321">
          <h2 id="nickname">Nick Name</h2>
          <input type="text" value="東谷羽琉秀緒">
        </div>

      </div>

      <div id="button-container">
        <button id="save-button">Save Change</button>
      </div>

    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {}
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
#settings-container {
  flex: 1 0 0;
  width: 800px;

  padding-left: 50px;
  padding-right: 50px;

  margin-top: 10px;
  border: 1px solid #eee;
  border-radius: 10px;

  background-color: white;
}

#settings-content {
  height: 100%;
  width: 100%;

  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;

  padding-top: 25px;
}

#profile {
  flex: 0 0 250px;
  width: 100%;

  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: flex-start;
}

#profile-left {
  flex: 0 0 32%;
  height: 100%;

  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  /*background-color: #eee;*/
}

#profile-right {
  flex: 1 0 0;
  height: 100%;

  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: flex-start;

  padding-top: 30px;
  padding-left: 10%;
}

#head-image {
  width: 90%;
  border-radius: 50%;
  background-color: #eee;
}

#profile-right h2 {
  font-weight: 100;
}

#username {

}

#nickname {
  margin-top: 25px;
}

#profile-right input {
  height: 40px;
  width: 100%;

  margin-top: 10px;

  border: 2px solid #ddd;
  border-radius: 5px;
  padding-left: 10px;

  font-size: 20px;
  font-weight: 300;
  color: #444;
}

#profile-right input:focus {
  border: 2px solid #888;
}

.center {
  align-self: center;
}

.line {
  display: block;
  border: 1px solid #eee;
  width: 100%;
  margin-top: 15px;
  margin-bottom: 20px;
}

#button-container {
  width: 100%;

  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;

  padding-top: 50px;
}

#save-button {
  height: 50px;
  width: 200px;

  border: none;
  border-radius: 5px;

  background-color: #333;
  font-size: 20px;
  color: white;
}

#save-button:hover {
  background-color: #512DA8;
  transition: .2s;
}

@media all and (max-height: 625px) {
  /* TODO */
}

@media all and (max-width: 1225px) {
  #settings-container {
    width: 80%;
  }

  #profile-right {
    /* TODO */
  }
}

@media all and (max-width: 975px) {
  #settings-container {
    padding-left: 20px;
    padding-right: 20px;
  }

  #username {
    font-size: 20px;
  }

  #nickname {
    font-size: 20px;
  }

  #profile-left {

  }

  #profile-right {

  }
}

@media all and (max-width: 700px) {
  #profile {
    flex: 0 0 600px;

    display: flex;
    flex-direction: column;
    /*flex-wrap: wrap;*/
    justify-content: flex-start;
    align-items: center;
  }

  #profile-left {
    flex: 0 0 350px;
    width: 100%;
  }

  #profile-right {
    flex: 0 0 550px;
    width: 100%;

    padding-left: 0;
    padding-top: 0;
  }

  #head-image {
    width: 50%;
  }

  /*
  #left-container {
    display: block;
    position: fixed;
    left: 0;
    top: 60px;

    width: 200px;
  }*/
}
@media all and (max-width: 550px) {
  #profile-left {
    flex: 0 0 250px;
  }
}

</style>
