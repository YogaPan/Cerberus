<template>
  <div id="root-container">
    <div id="left-container">
      <app-camera></app-camera>
    </div>

    <div id="right-container">
      <app-chat></app-chat>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import Chat from '../../components/Chat.vue'
import Camera from '../../components/Camera.vue'

export default {
  components: {
    'app-chat': Chat,
    'app-camera': Camera
  }
}
</script>

<style>
#root-container {
  display: flex;
  flex-direction: row;
  align-items: stretch;
  justify-content: flex-start;

  height: 100vh;
  background-color: blue;
}

#left-container {
  flex: 1 0 0;
  background-color: black;
}

#right-container {
  flex: 0 0 350px;
  height: 100%;
}
</style>
