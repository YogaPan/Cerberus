<template>
  <div id="root-container">
    <div id="left-container">

      <div id="app-name">
        <a class="app-link" href="/board">Cerberus</a>
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

<style lang="less">

@import "~styles/init.less";

#root-container {
  height: 100vh;
  width: 100vw;

  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;

  @media all and (max-height: 450px) {
    height: 450px;
  }

  @media all and (max-width: 770px) {
    flex-wrap: wrap;
    /*height: 1400px;*/
  }
}

#left-container {
  flex: 0 0 625px;
  height: 100%;
  background-color: white;

  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;

  @media all and (max-width: 1250px) {
    flex: 1 0 100px;
    /*background-color: pink;*/
  }

  @media all and (max-width: 770px) {
    flex: 0 0 100%;
    height: 600px;
    /*background-color: purple;*/
  }
}

#right-container {
  flex: 1 0 auto;
  height: 100%;
  background-image: url( '/assets/teamwork.jpg' );
  background-size: auto;
  background-repeat: no-repeat;
  background-color: #400080;
  background-position:90% 50%;
  background-attachment:fixed;

  @media all and (max-width: 1250px) {
    flex: 1 0 100px;
  }

  @media all and (max-width: 975px) {
    flex: 1 0 auto;
  }

  @media all and (max-width: 770px) {
    height: 500px;
    flex: 0 0 100%;
  }
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

#register-form {
  @media all and (max-width: 770px) {
    width: 65%;
  }
}

</style>
