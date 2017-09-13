<template>
  <div id="screen-container">
    <video id="localVideo"></video>

    <div id="remote-video-bar">
      <div id="remoteVideos"></div>
    </div>

    
    <div id="button-bar">
      <div class="circle-button"></div>
      <div id="hang-up" class="circle-button"></div>
      <div class="circle-button"></div>
    </div>

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
      autoRequestMedia: true,
      url: 'http://localhost:8888'
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
  position: relative;
  flex: 1 0 0;
}

#localVideo {
  position: absolute;
  top: 0;
  left: 0;

  min-width: 100%; 
  min-height: 100%;
  width: auto; 
  height: auto;

  overflow: hidden;
  z-index: -1;
}

#remote-video-bar {
  position: absolute;
  top: 0;
  left: 0;

  width: 150px;
  height: 100%;
  background-color: black;
  opacity: 0.5; 
}

#remoteVideos {

}

.circle-button {
  height: 65px;
  width: 65px;

  border-radius: 50%;
  background-color: black;
  opacity: 0.7;
}

#hang-up {
  background-color: red;
}

#button-bar {
  position: absolute;
  bottom: 0;
  left: 0;

  height: 100px;
  width: 100%;
  padding-left: 35%;
  padding-right: 35%;

  /* background-color: black; */
  /* opacity: 0.5; */

  display: flex;
  flex-direction: row;
  justify-content: space-between;
}

.title {
  color: white;
  font-size: 20px;
}
</style>
