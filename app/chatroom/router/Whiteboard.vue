<template>
  <div id="whiteboard-container">
    <!-- <h1>whiteboard here...</h1> -->

    <canvas id="whiteboard" @mousedown="onMouseDown" @mouseup="onMouseUp" @mouseout="onMouseUp" @mousemove="onMouseMove"></canvas>

    <div class="colors">
      <div class="color black" @click="changeColor('black')"></div>
      <div class="color red" @click="changeColor('red')"></div>
      <div class="color green" @click="changeColor('green')"></div>
      <div class="color blue" @click="changeColor('blue')"></div>
      <div class="color yellow" @click="changeColor('yellow')"></div>
    </div>
  </div>
</template>

<script>
var socket = require('socket.io-client')('http://140.136.150.75:8888')

export default {
  data() {
    return {
      current: {
        x: 0,
        y: 0,
        color: 'black'
      },
      drawing: false
    }
  },
  mounted() {
    this.canvas = this.$el.querySelector('#whiteboard')
    this.context = this.canvas.getContext('2d');

    this.colors =this.$el.querySelector('.color')

    socket.on('drawing', onDrawingEvent);

    window.addEventListener('resize', this.onResize, false);
    onResize();
  },
  methods: {
    changeColor(color) {
      this.current.color = color
    },
    drawLine(x0, y0, x1, y1, color, emit) {
      this.context.beginPath()
      this.context.moveTo(x0, y0)
      this.context.lineTo(x1, y1)
      this.context.strokeStyle = color
      this.context.lineWidth = 2
      this.context.stroke()
      this.context.closePath()

      if (!emit) { return }
      var w = this.canvas.width
      var h = this.canvas.height

      socket.emit('drawing', {
        x0: x0 / w,
        y0: y0 / h,
        x1: x1 / w,
        y1: y1 / h,
        color: color
      })
    },
    onDrawingEvent(data){
      var w = this.canvas.width
      var h = this.canvas.height
      this.drawLine(data.x0 * w, data.y0 * h, data.x1 * w, data.y1 * h, data.color)
    },
    onMouseDown(e) {
      this.drawing = true;
      this.current.x = e.clientX
      this.current.y = e.clientY

      // DEBUG
      console.log(this.current)
    },
    onMouseUp(e) {
      if (!this.drawing) { return }
      this.drawing = false
      this.drawLine(this.current.x, this.current.y, e.clientX, e.clientY, this.current.color, false)
    },
    onMouseMove(e) {
      if (!this.drawing) { return }
      this.drawLine(this.current.x, this.current.y, e.clientX, e.clientY, this.current.color, false)
      this.current.x = e.clientX
      this.current.y = e.clientY
    },
    onResize() {
      this.canvas.width = window.innerWidth;
      this.canvas.height = window.innerHeight;
    },
    throttle(callback, delay) {
      var previousCall = new Date().getTime();
      return function() {
        var time = new Date().getTime()

        if ((time - previousCall) >= delay) {
          previousCall = time
          callback.apply(null, arguments)
        }
      }
    }
  }
}
</script>

<style>
#whiteboard-container {
  flex: 1 0 0;

  /*display : flex;*/
  /*flex-direction: column;*/
  /*align-items: stretch;*/
  /*justify-content: center;*/

  background-color: #fff;
}

#whiteboard {
  /*flex: 1 0 0;*/
}

.colors {
  display: flex;
  flex-direction: column;
  align-items: stretch;
  justify-content: space-between;

  position: fixed;
  height: 250px;
  width: 50px;
}

.color {
  flex: 1 0 0;
}

.color.black {
  background-color: black;
}

.color.red {
  background-color: red;
}

.color.green {
  background-color: green;
}

.color.blue {
  background-color: blue;
}

.color.yellow {
  background-color: yellow;
}
</style>
