<template>
  <div id="screen-container" ref="screen-container" v-bind:class="{ hide: isHide }">

    <div id="have-video" v-if="this.$store.state.streaming">
      <!-- <video id="current-video" ref="current-video"></video> -->
      <canvas id="current-video" ref="current-video"></canvas>

      <div id="remote-video-bar">
        <div id="remote-videos">
          <!-- <video id="first-video" src="http://www.html5videoplayer.net/videos/toystory.mp4" autoplay="true"></video> -->
          <video id="first-video"></video>
          <!-- <video id="second-video" src="http://www.html5videoplayer.net/videos/toystory.mp4" autoplay="true"></video> -->
        </div>
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
import SimpleWebRTC from 'simplewebrtc'

export default {
  data() {
    return {
      streaming: false,
      drawing: false
    }
  },
  mounted() {
    // this.processor.doLoad = function doLoad() {
    //   console.log('doload!!!')

    //   this.video = document.getElementById('first-video')
    //   this.c = document.getElementById('current-video')
    //   this.ctx = this.c.getContext('2d')

    //   let self = this
    //   self.timerCallback()
    //   // this.video.addEventListener('play', function() {
    //   //   self.timerCallback()
    //   // }, false)
    // }

    // this.processor.timerCallback = function timerCallback() {
    //   console.log('timerCallback!!')
    //   if (this.video.paused || this.video.ended) {
    //     return
    //   }

    //   this.computeFrame()

    //   let self = this
    //   setTimeout(function() {
    //     self.timerCallback()
    //   }, 0)
    // }

    // this.processor.computeFrame = function computeFrame() {
    //   console.log('computeFrame!')
    //   this.ctx.drawImage(this.video, 0, 0, 500, 500)
    // }
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
        localVideoEl: 'first-video',
        remoteVideosEl: '',
        autoRequestMedia: true,
        // url: 'https://cerberus.csie.fju.edu.tw:7777',
        // url: 'http://localhost:8888',

        // localVideo: {
          // muted: false
        // }
      })

      webrtc.on('readyToCall', () => {
        // you can name it anything
        webrtc.joinRoom('your awesome room name')
        console.log('ready to call!!!!')

        this.load(this.$el.querySelector('#first-video'))

        this.$el.querySelector('#first-video').addEventListener('click', () => {
          console.log('click!!!!')
          this.load(this.$el.querySelector('#first-video'))
        })
      })

      // a peer video has been added
      webrtc.on('videoAdded', (video, peer) => {
        console.log('video added', peer)

        const remotes = document.getElementById('remote-videos')

        if (remotes) {
          const container = document.createElement('div')

          container.className = 'videoContainer'
          container.id = 'container_' + webrtc.getDomId(peer)
          container.appendChild(video)

          container.addEventListener('click', () => {
            console.log('click!!!!')
            this.load(video)
          })

          // suppress contextmenu
          video.oncontextmenu = function () { return false }

          remotes.appendChild(container)
        }
      })

      // a peer video was removed
      webrtc.on('videoRemoved', (video, peer) => {
        console.log('video removed ', peer)

        const remotes = document.getElementById('remote-videos')
        const el = document.getElementById(peer ? 'container_' + webrtc.getDomId(peer) : 'localScreenContainer')
        if (remotes && el) {
          remotes.removeChild(el)
        }
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
    },
    load(video) {
      var canvas = document.getElementById('current-video')
      var context = canvas.getContext('2d')

      // context.scale(-1,1)
      this.drawing = false

      setTimeout(() => {
        var cw = 640
        var ch = 480
        canvas.width = cw
        canvas.height = ch

        this.drawing = true
        this.draw(video, context, cw, ch)
      }, 1000)
    },

    draw(video, canvas, width, height) {
      if (video.paused || video.ended)
        return false
      if (this.drawing === false)
        return false
      canvas.drawImage(video, 0, 0, width, height)
      setTimeout(this.draw, 20, video, canvas, width, height);
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
  animation: fadein .5s;
}

#current-video {
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

  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;

  // padding-top: 10px;

  background-color: black;
  // opacity: 0.5;
  z-index: 99;
}

#remote-videos {
  video {
    //position: absolute;
    //left: 10px;

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
