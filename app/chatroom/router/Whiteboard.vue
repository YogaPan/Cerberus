<template>
  <div id="whiteboard-container">
    <!-- <h1>whiteboard here...</h1> -->
    <div class="colors">
      <div class="color black" v-bind:class="isSelected('black')" @click="changeColor('black')"></div>
      <div class="color red" v-bind:class="isSelected('red')" @click="changeColor('red')"></div>
      <div class="color green" v-bind:class="isSelected('green')" @click="changeColor('green')"></div>
      <div class="color blue" v-bind:class="isSelected('blue')" @click="changeColor('blue')"></div>
      <div class="color yellow" v-bind:class="isSelected('yellow')" @click="changeColor('yellow')"></div>
    </div>

    <canvas id="whiteboard"
      height="750px" width="750px"
      @mousedown="onMouseDown" @mouseup="onMouseUp" @mouseout="onMouseUp" @mousemove="onMouseMove">
    </canvas>
  </div>
</template>

<script>
const socket = require('socket.io-client')('http://140.136.150.75:8888')

export default {
  data() {
    return {
      current: {
        x: 0,
        y: 0,
        color: 'black'
      },
      drawing: false,
    }
  },
  mounted() {
    this.canvas = this.$el.querySelector('#whiteboard')
    this.ctx = this.canvas.getContext('2d')

    // Initial canvas color.
    this.ctx.beginPath()
    this.ctx.rect(0, 0, 750, 750)
    this.ctx.fillStyle = "#fefefe"
    this.ctx.fill()

    socket.on('drawing', this.onDrawingEvent)

    // window.addEventListener('resize', this.onResize, false)
    // onResize();

    function onResize() {
      this.canvas.width = window.innerWidth
      this.canvas.height = window.innerHeight
    }
  },
  methods: {
    changeColor(color) {
      this.current.color = color
    },
    drawLine(x0, y0, x1, y1, color, emit) {
      this.ctx.beginPath()
      this.ctx.moveTo(x0, y0)
      this.ctx.lineTo(x1, y1)
      this.ctx.strokeStyle = color
      this.ctx.lineWidth = 2
      this.ctx.stroke()
      this.ctx.closePath()

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
      this.canvas.width = window.innerWidth
      this.canvas.height = window.innerHeight
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
    },
    isSelected(color) {
      return {
        selected: this.current.color === color
      }
    }
  }
}
</script>

<style>
#whiteboard-container {
  flex: 1 0 0;
  position: relative;
  overflow-x: scroll;
  overflow-y: scroll;

  /*display : flex;*/
  /*flex-direction: row;*/
  /*align-items: stretch;*/
  /*justify-content: center;*/
}

#whiteboard {
  /*flex: 1 0 0;*/
  /*background-color: #fefefe;*/
}

.colors {
  position: absolute;
  left: 0;
  top: 50%;
  transform: translate(0, -50%);

  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-around;

  height: 300px;
  width: 80px;
  /*border: 2px solid #ddd;*/
  box-shadow: 0px 0px 16px 10px rgba(0,0,0,0.2);
  border-top-right-radius: 20px;
  border-bottom-right-radius: 20px;

  background-color: #eee;
  z-index: 99;
}

.colors:hover {
  background-color: #ddd;
  transition: .5s;
}

.color {
  flex: 0 1 50px;
  width: 50px;

  border-radius: 100%;
}

.color:hover {
  flex: 0 1 60px;
  width: 60px;

  transition: .2s;
  cursor: pointer;
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

.selected {
  flex: 0 1 65px;
  width: 65px;
  transition: .2s;
}

.selected:hover {
  flex: 0 1 65px;
  width: 65px;
}
</style>
