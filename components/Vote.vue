<template> 
  <div id="vote-pop-container" class="pop-fullscreen">
    <div id="vote-inside-container">

      <img id="cancel" src="/assets/cross.png" v-if="showResult" @click="cancel">

      <div class="vote-area" v-if="!showResult">

        <div class="vote-area-top">
          <h1>{{ question }}</h1>
        </div>

        <div class="vote-area-middle">
          <div class="vote-item" v-for="(option, index) in options" :key="index" v-bind:class="{'selected-vote-item': option.isSelected}" @click="vote(option.id)">
            <p>{{ option.content }}</p>
          </div>
        </div>
      </div>

      <div class="result-area" v-else>
        <div class="result-area-top">
          <h1>Result</h1>
        </div>

        <div class="result-area-bottom">
          <app-chart ref="chart" :chart-data="dataCollection"></app-chart>
        </div>
      </div>

    </div>
  </div>
</template>

<script>
const socket = require('socket.io-client')('https://cerberus.csie.fju.edu.tw:8888')

import Chart from './Chart'

export default {
  data() {
    const len = this.$store.state.options
    const dataCollection = {
      labels: [],  // initial to empty array
      datasets: [
        {
          label: this.$store.state.question,
          backgroundColor: [
            '#fff',
            '#1AB49C',
            '#F3672C',
            '#D45954',
            '#560DE3'
          ],
          data: []
        }
      ]
    }
    
    this.$store.state.options.forEach(option => {
      dataCollection.labels.push(option.content)
    })

    dataCollection.datasets[0].data = new Array(len).fill(0);

    return {
      showResult: false,
      dataCollection: dataCollection,
    }
  },
  mounted() {
    socket.on('ask', content => {
      this.$store.dispatch("popVote", content)
    })

    socket.on('vote', id => {
      this.dataCollection.datasets[0].data[id] += 1
    })

    // setInterval(() => {
    //   this.dataCollection.datasets[0].data[0] += 1
    //   this.$refs.chart.update()
    // }, 3000)
  },
  computed: {
    question: {
      get() {
        return this.$store.state.question
      }
    },
    options: {
      get() {
        return this.$store.state.options
      }
    }
  },
  methods: {
    vote(id) {
      socket.emit(id)
      this.showResult = true
    },
    cancel() {
      this.$store.dispatch('doneVote')
    }
  },
  components: {
    'app-chart': Chart
  },
}
</script>

<style lang="less">

@import "~styles/init.less";

#vote-pop-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}

#vote-inside-container {
  display: flex;
  flex-direction: row;
  align-items: stretch;
  justify-content: space-between;

  width: 800px;
  height: 600px;
}

/* ============================= Vote Area ================================= */

.vote-area {
  flex: 1 0 0;

  display: flex;
  flex-direction: column;
  align-items: stretch;
  justify-content: space-between;

  button {
    position: absolute;
    bottom: 0;
  }
}

.vote-area-top {
  flex: 0 0 100px;

  h1 {
    font-size: 100px;
    color: @gray;
  }
}

.vote-area-middle {
  flex: 1 0 0;

  display: flex;
  flex-direction: column;
  align-items: stretch;
  justify-content: space-around;
}

.vote-area-bottom {
  flex: 0 0 100px;

  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;

  position: relative;
}

/* ============================= Vote Item ================================= */

.vote-item {
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;

  height: 100px;
  border: 3px solid #aaa;
  border-radius: 10px;

  transition: .1s;
  cursor: pointer;

  p {
    color: #ccc;
    font-size: 30px;
  }

  &:hover {
    background-color: #ccc;

    p {
      color: black;
      font-size: 30px;
    }
  }
}

.selected-vote-item {
  background-color: #ccc;

  p { color: black; }
}

.result-area {
  flex: 1 0 0;

  display: flex;
  flex-direction: column;
  align-items: stretch;
  justify-content: flex-start;

  /*transition: 1s;*/
}

.result-area-bottom {
  flex: 1 0 0;
  background-color: #222;

  border-radius: 10px;
}

#cancel {
  position: absolute;
  top: 20px;
  right: 20px;

  height: 40px;
  width: 40px;

  transition: .2s;
  filter: invert(100%);
  cursor: pointer;

  &:hover {
    height: 45px;
    width: 45px;
  }
}

</style>
