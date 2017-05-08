<template>
  <div id="root-container">
    <div id="left-container">
      <div id="app-name">
        <a href="#">Corna</a>
      </div>

      <div id="middle-container">
        <div id="register-form">
          <h1>Create new Chatroom</h1>
          <p>Your room name</p>
          <input type="text" placeholder="#room name">
        </div>
      </div>

      <div id="next">
        <button id="next-button">Next -></button>
      </div>
    </div>

    <div id="right-container">

    </div>
  </div>
</template>

<script>

</script>

<style>
#root-container {
  background-color: black;

  height: 100vh;
  width: 100vw;

  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
}

#left-container {
  flex: 0 0 625px;
  height: 100%;
  background-color: white;

  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
}

#right-container {
  flex: 1 0 auto;
  height: 100%;
  background-color: #222;
  /*background-color: rgb(33, 178, 254);*/
}


#app-name {
  width: 100%;
  flex: 0 0 50px;

  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: flex-start;

  /*background-color: red;*/
  padding-left: 10px;
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

  /*background-color: yellow;*/
}

#app-name a {
  font-size: 30px;

  /*margin-top: 10px;*/
  /*margin-left: 10px;*/
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

@media all and (max-height: 450px) {
  #root-container {
    height: 450px;
  }
}

@media all and (max-width: 1250px) {
  #left-container {
    flex: 1 0 100px;
    /*background-color: pink;*/
  }

  #right-container {
    flex: 1 0 100px;
  }
}

@media all and (max-width: 975px) {
  #left-container {
    flex: 0 0 485px;
    /*background-color: red;*/
  }

  #right-container {
    flex: 1 0 auto;
  }
}

@media all and (max-width: 770px) {
  #root-container {
    flex-wrap: wrap;
    /*height: 1400px;*/
  }

  #left-container {
    flex: 0 0 100%;
    height: 400px;
    /*background-color: purple;*/
  }

  #right-container {
    height: 500px;
    flex: 0 0 100%;
  }

  #register-form {
    width: 65%;
  }
}
</style>
