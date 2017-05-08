<template>
  <div id="root-container">
    <div id="left-container">

      <div id="app-name">
        <a href="#">Corna</a>
      </div>
      <router-view></router-view>

    </div>

    <div id="right-container">
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

#app-name a {
  font-size: 30px;

  /*margin-top: 10px;*/
  /*margin-left: 10px;*/
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
