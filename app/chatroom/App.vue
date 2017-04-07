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
#app {
  margin: 0;
  position: relative;
  height: 100vh;
}
</style>
