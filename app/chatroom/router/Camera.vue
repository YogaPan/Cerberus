<template>
  <div id="camera-container">
    <video id="camera" autoplay></video>
  </div>
</template>

<script>

export default {
  data() {
    return {
      /* TODO */
    }
  },
  mounted() {
    if (this.hasGetUserMedia()) {
      navigator.getUserMedia({
        video: true, audio: true
      }, stream => {  // success callback
        const video = this.$el.querySelector('#camera')
        video.src = window.URL.createObjectURL(stream)
        video.muted = true;  // no sound feedback
      }, error => {  //fail callback
        alert('ERROR!')
      })
    } else {
      alert('getUserMedia() is not supported in your browser')
    }
  },
  methods: {
    hasGetUserMedia() {
      return !!(navigator.getUserMedia || navigator.webkitGetUserMedia ||
        navigator.mozGetUserMedia || navigator.msGetUserMedia)
    }
  }
}

</script>

<style>
#camera-container {
  width: 100%;

  flex: 1 0 0;
}

#camera {
  /*object-fit: fill;*/
  height: 100%;
}
</style>
