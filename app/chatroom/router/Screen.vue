<template>
  <div id="screen-container">
    <h1 class="title">Screen share here...</h1>
    <video id="localVideo"></video>
    <div id="remoteVideos"></div>    
  </div>
</template>

<script>
import SimpleWebRTC from 'simplewebrtc';

export default {
  data() {
    return {}
  },
  mounted() {
    const webrtc = new SimpleWebRTC({
      // the id/element dom element that will hold "our" video
      localVideoEl: 'localVideo',
      // the id/element dom element that will hold remote videos
      remoteVideosEl: 'remoteVideos',
      // immediately ask for camera access
      autoRequestMedia: true
    })

    webrtc.on('readyToCall', function () {
      // you can name it anything
      webrtc.joinRoom('your awesome room name')
    })
  },
  methods: {
    // TODO
  }
}
</script>

<style>

#screen-container {
  flex: 1 0 0;
}

.title {
  color: white;
}
</style>
