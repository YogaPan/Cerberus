<template>
  <div id="screen-container">

    <div id="have-video" v-if="streaming">
      <video id="localVideo"></video>

      <div id="remote-video-bar">
        <div id="remoteVideos"></div>
      </div>

      <div id="button-bar" v-if="streaming">
        <button class="circle-button" @click="mute">mute</button>
        <button id="stop-streaming-button" class="circle-button" @click="stopStreaming">stop</button>
        <button class="circle-button" @click="pauseVideo">pause</button>
      </div>
    </div>

    <div id="none-video" v-else>
      <button id="start-streaming-button" @click="startStreaming">Start</button>
    </div>

  </div>
</template>

<script>
import SimpleWebRTC from 'simplewebrtc';

export default {
  data() {
    return {
      'streaming': false
    }
  },
  // mounted() {
  //   const webrtc = new SimpleWebRTC({
  //     // the id/element dom element that will hold "our" video
  //     localVideoEl: 'localVideo',
  //     // the id/element dom element that will hold remote videos
  //     remoteVideosEl: 'remoteVideos',
  //     // immediately ask for camera access
  //     // autoRequestMedia: true,
  //     // url: 'http://localhost:8888'
  //   })

  //   webrtc.on('readyToCall', function () {
  //     // you can name it anything
  //     webrtc.joinRoom('your awesome room name')
  //   })

  //   this.webrtc = webrtc
  // },
  methods: {
    startStreaming() {
      const webrtc = new SimpleWebRTC({
        // the id/element dom element that will hold "our" video
        localVideoEl: 'localVideo',
        // the id/element dom element that will hold remote videos
        remoteVideosEl: 'remoteVideos',
        // immediately ask for camera access
        autoRequestMedia: true,
        // url: 'http://localhost:8888',
        localVideo: {
          muted: false
        }
      })

      webrtc.on('readyToCall', function () {
        // you can name it anything
        webrtc.joinRoom('your awesome room name')
      })

      this.webrtc = webrtc
      this.streaming = true
    },
    
    stopStreaming() {
      this.webrtc.stopLocalVideo()
      this.streaming = false
    },

    mute() {
      this.webrtc.mute()
    },

    unmute() {
      this.webrtc.unmute()
    },

    pauseVideo() {
      this.webrtc.pauseVideo()
    },

    resumeVideo() {
      this.webrtc.resumeVideo()
    }
  }
}
</script>

<style lang="less">

@import "~styles/init.less";

#screen-container {
  position: relative;
  flex: 1 0 0;

  /* background-color: black; */
  /* z-index: -2; */
}

#localVideo {
  position: absolute;
  top: 0;
  left: 0;
  /* bottom: 0; */
  /* right: 0; */

  /* height: 100%; */
  /* width: 100%; */

  min-width: 100%; 
  min-height: 100%;
  /* width: auto;  */
  /* height: auto; */

  overflow-y: hidden;
  z-index: -1;
  background-color: black;
}

#remote-video-bar {
  position: absolute;
  top: 0;
  left: 0;

  width: 150px;
  height: 100%;

  background-color: black;
  opacity: 0.5; 
  z-index: 99;
}

#remoteVideos {

}

.circle-button {
  height: 65px;
  width: 65px;

  border-radius: 50%;
  background-color: gray;
  opacity: 0.7;
  cursor: pointer;
}

#start-streaming-button {
  height: 400px;
  width: 400px;

  border-radius: 50%;
  background-color: @purple;
  color: white;

  font-size: 75px;

  &:hover {
    height: 500px;
    width: 500px;
    transition: .1s;
  }
}

#stop-streaming-button {
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
  z-index: 99;
}

#start-video {
  height: 100%;
  width: 100%;
  postion: relative;
}

#none-video {
  height: 100%;
  width: 100%;
  background-color: @dark-black;

  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
}

.title {
  color: white;
  font-size: 20px;
}
</style>
