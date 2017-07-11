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
    this.colors =this.$el.querySelector('.color')
    this.context = this.canvas.getContext('2d');

    // var current = {
      // color: 'black'
    // };
    // var drawing = false;

    /*
    canvas.addEventListener('mousedown', onMouseDown, false);
    canvas.addEventListener('mouseup', onMouseUp, false);
    canvas.addEventListener('mouseout', onMouseUp, false);
    canvas.addEventListener('mousemove', throttle(onMouseMove, 10), false);
    */

    /*
    for (var i = 0; i < colors.length; i++){
      colors[i].addEventListener('click', onColorUpdate, false);
    }
    */

    socket.on('drawing', onDrawingEvent);

    // window.addEventListener('resize', onResize, false);
    // onResize();

    /*
    function drawLine(x0, y0, x1, y1, color, emit){
      context.beginPath();
      context.moveTo(x0, y0);
      context.lineTo(x1, y1);
      context.strokeStyle = color;
      context.lineWidth = 2;
      context.stroke();
      context.closePath();

      if (!emit) { return; }
      var w = canvas.width;
      var h = canvas.height;

      socket.emit('drawing', {
        x0: x0 / w,
        y0: y0 / h,
        x1: x1 / w,
        y1: y1 / h,
        color: color
      });
    }
    */

    /*
    function onMouseDown(e){
      this.drawing = true;
      this.current.x = e.clientX;
      this.current.y = e.clientY;

      // DEBUG
      console.log(this.current)
    }
    */

    /*
    function onMouseUp(e){
      if (!this.drawing) { return; }
      this.drawing = false;
      drawLine(current.x, current.y, e.clientX, e.clientY, this.current.color, true);
    }
    */

    /*
    function onMouseMove(e){
      if (!this.drawing) { return; }
      drawLine(this.current.x, this.current.y, e.clientX, e.clientY, this.current.color, true);
      this.current.x = e.clientX;
      this.current.y = e.clientY;
    }
    */

    /*
    function onColorUpdate(e){
      current.color = e.target.className.split(' ')[1];
    }
    */

    /*
    // limit the number of events per second
    function throttle(callback, delay) {
      var previousCall = new Date().getTime();
      return function() {
        var time = new Date().getTime();

        if ((time - previousCall) >= delay) {
          previousCall = time;
          callback.apply(null, arguments);
        }
      };
    }
    */

    /*
    function onDrawingEvent(data){
      var w = canvas.width;
      var h = canvas.height;
      drawLine(data.x0 * w, data.y0 * h, data.x1 * w, data.y1 * h, data.color);
    }
    */

    /*
    // make the canvas fill its parent
    function onResize() {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    }
    */
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
      this.drawLine(current.x, current.y, e.clientX, e.clientY, this.current.color, true)
    },
    onMouseMove(e) {
      if (!this.drawing) { return; }
      this.drawLine(this.current.x, this.current.y, e.clientX, e.clientY, this.current.color, true)
      this.current.x = e.clientX
      this.current.y = e.clientY
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

  display : flex;
  flex-direction: column;
  align-items: stretch;
  justify-content: center;

  background-color: #fff;
}

#whiteboard {
  flex: 1 0 0;
  /*
  height: 100%;
  width: 100%;
  position: absolute;
  left: 0;
  right: 0;
  bottom: 0;
  top: 0;
  */
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
