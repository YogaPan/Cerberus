<template>
  <div id="screen-container" ref="screen-container" v-bind:class="{ hide: isHide }">

    <div id="have-video" v-if="this.$store.state.streaming">
      <video id="localVideo" ref="localVideo"></video>

      <div id="remote-video-bar">
        <div id="remoteVideos"></div>
      </div>

      <div id="button-bar">
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
  mounted() {
    // TODO
  },
  computed: {
    isHide() {
      if (this.$route.path === '/') {
        return false
      } else {
        return true
      }
    }
  },
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
        // localVideo: {
          // muted: false
        // }
      })

      webrtc.on('readyToCall', function () {
        // you can name it anything
        webrtc.joinRoom('your awesome room name')
      })

      this.$store.state.webrtc = webrtc
      this.$store.state.streaming = true
      this.$store.state.playLocalVideo = false
    },
    
    stopStreaming() {
      this.$store.state.webrtc.stopLocalVideo()
      this.$store.state.streaming = false
      this.$store.state.playLocalVideo = false
    },

    mute() {
      this.$store.state.webrtc.mute()
    },

    unmute() {
      this.$store.state.webrtc.unmute()
    },

    pauseVideo() {
      this.$store.state.webrtc.pauseVideo()
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
  video {
    position: absolute;
    left: 10px;

    width: 125px;
    height: 125px;

    &:hover {
      cursor: pointer;
    }
  }
}

.circle-button {
  height: 65px;
  width: 65px;

  border-radius: 50%;
  background-color: @dark-black;
  opacity: 0.7;
  cursor: pointer;

  color: @white;

  &:hover {
    height: 70px;
    width: 70px;
    transition: .2s;
  }
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

.hide {
  display: none;
}
</style>
