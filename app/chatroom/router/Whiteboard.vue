<template>
  <div id="whiteboard-container">
    <!-- <h1>whiteboard here...</h1> -->

    <div id="leftbar">
      <div class="colors">
        <div class="color black" v-bind:class="isSelected('black')" @click="changeColor('black')"></div>
        <div class="color red" v-bind:class="isSelected('red')" @click="changeColor('red')"></div>
        <div class="color green" v-bind:class="isSelected('green')" @click="changeColor('green')"></div>
        <div class="color blue" v-bind:class="isSelected('blue')" @click="changeColor('blue')"></div>
        <div class="color yellow" v-bind:class="isSelected('yellow')" @click="changeColor('yellow')"></div>
      </div>
    </div>

    <canvas id="whiteboard" @mousedown="onMouseDown" @mouseup="onMouseUp" @mouseout="onMouseUp" @mousemove="onMouseMove"></canvas>
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
      classObject: {
        // TODO
      }
    }
  },
  mounted() {
    this.canvas = this.$el.querySelector('#whiteboard')
    this.context = this.canvas.getContext('2d')

    this.canvas.style.height = 500
    this.canvas.style.width = 600

    socket.on('drawing', onDrawingEvent)

    window.addEventListener('resize', this.onResize, false)
    onResize();

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

  display : flex;
  flex-direction: row;
  align-items: stretch;
  justify-content: center;
}

#whiteboard {
  /*flex: 1 0 0;*/
  background-color: #fefefe;
}

#leftbar {
  position: absolute;
  top: 0;
  left: 0;
  bottom: 0;

  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  height: 100%;
}

.colors {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-around;

  height: 300px;
  width: 80px;
  border-top-right-radius: 20px;
  border-bottom-right-radius: 20px;

  background-color: #eee;
}

.colors:hover {
  background-color: #ddd;
  transition: .5s;
}

.color {
  flex: 0 1 50px;
  width: 50px;

  border-radius: 100%;
  /*cursor: pointer;*/
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
