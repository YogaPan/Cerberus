<template>
  <div id="whiteboard-container">
    <div class="colors">
      <div class="color black" v-bind:class="isSelected('black')" @click="changeColor('black')"></div>
      <div class="color red" v-bind:class="isSelected('red')" @click="changeColor('red')"></div>
      <div class="color green" v-bind:class="isSelected('green')" @click="changeColor('green')"></div>
      <div class="color blue" v-bind:class="isSelected('blue')" @click="changeColor('blue')"></div>
      <div class="color yellow" v-bind:class="isSelected('yellow')" @click="changeColor('yellow')"></div>
    </div>

    <div class="edit-area">
      <a id="save" class="edit" @click="downloadCanvas($event, 'canvas')"></a>
      <img id="delete" class="edit" src="/assets/trash-2.svg" alt="delete" @click="cleanCanvas">
    </div>

    <div id="zoomer">
      <canvas id="whiteboard"
        height="2000px" width="2000px"
        @mousedown="onMouseDown" @mouseup="onMouseUp" @mouseout="onMouseUp" @mousemove="onMouseMove">
      </canvas>
    </div>
  </div>
</template>

<script>
const socket = require('socket.io-client')('https://cerberus.csie.fju.edu.tw:443')

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
    this.ctx.rect(0, 0, this.canvas.width, this.canvas.height)
    this.ctx.fillStyle = "#fefefe"
    this.ctx.fill()

    // Listen to other people's drawing event.
    socket.on('drawing', this.onDrawingEvent)
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

      socket.emit('drawing', {
        x0: x0,
        y0: y0,
        x1: x1,
        y1: y1,
        color: color
      })
    },
    cleanCanvas() {
      this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height)
    },
    downloadCanvas(evt, filename) {
      evt.target.href = this.canvas.toDataURL()
      evt.target.download = filename
    },
    onDrawingEvent(data){
      this.drawLine(data.x0, data.y0, data.x1, data.y1, data.color)
    },
    onMouseDown(evt) {
      const pos = this.getMousePos(evt)

      this.drawing = true;
      this.current.x = pos.x
      this.current.y = pos.y
    },
    onMouseUp(evt) {
      if (!this.drawing)
        return

      const pos = this.getMousePos(evt)

      this.drawing = false
      this.drawLine(this.current.x, this.current.y, pos.x, pos.y, this.current.color, true)
    },
    onMouseMove(evt) {
      if (!this.drawing)
        return

      const pos = this.getMousePos(evt)

      this.drawLine(this.current.x, this.current.y, pos.x, pos.y, this.current.color, true)
      this.current.x = pos.x
      this.current.y = pos.y
    },
    getMousePos(evt) {
      const rect = this.canvas.getBoundingClientRect()

      return {
        x: evt.clientX - rect.left,
        y: evt.clientY - rect.top
      }
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

<style lang="less">

@import "~styles/init.less";

#whiteboard-container {
  flex: 1 0 0;
  min-height: 0;  /* flexbox overflow */
  position: relative;

  animation: fadein .5s;
}

#zoomer {
  height: 100%;
  width: 100%;
  overflow-x: scroll;
  overflow-y: scroll;
}

#whiteboard {
  /* TODO */
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
  border-top-right-radius: 20px;
  border-bottom-right-radius: 20px;

  background-color: rgba(238, 238, 238, 0.95);  /* #eee */
  box-shadow: 0px 0px 16px 10px rgba(0,0,0,0.2);
}

.color {
  flex: 0 1 50px;
  width: 50px;

  border-radius: 100%;

  &:hover {
    flex: 0 1 60px;
    width: 60px;

    transition: .2s;
    cursor: pointer;
  }
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

  &:hover {
    flex: 0 1 65px;
    width: 65px;
  }
}

.edit-area {
  position: absolute;
  left: 0;
  bottom: 0;

  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-around;

  height: 125px;
  width: 80px;
  /*background-color: black;*/
}

.edit {
  flex: 0 1 50px;
  width: 50px;
  filter : invert(0.5);

  &:hover {
    filter : invert(0);
    transition: .2s;
    cursor: pointer;
  }
}

#save {
  background-image: url('/assets/save.svg');
  background-size: 50px;
  background-repeat: no-repeat;
  background-position: center;
  /*background-color: blue;*/
}

#delete {
  /*background-color: red;*/
}
</style>
