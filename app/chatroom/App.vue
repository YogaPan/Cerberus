<template>
  <div id="app">
    <app-chat></app-chat>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import Chat from '../../components/Chat.vue'

export default {
  components: {
    'app-chat': Chat
  }
}
</script>

<style>
* {
   -webkit-box-sizing: border-box;
     -moz-box-sizing: border-box;
          box-sizing: border-box;
}

html, body {
  margin: 0;
  padding: 0;
}

#app {
  margin: 0;
  position: relative;
  height: 100vh;
}
</style>
