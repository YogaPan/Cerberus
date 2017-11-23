<template>
  <div id="notes-container">
    <textarea id="doc" v-model="doc" @keyup="send" ref="doc"></textarea>
  </div>
</template>

<script>
const socket = require('socket.io-client')('https://cerberus.csie.fju.edu.tw:8888')

export default {
  data() {
    return {}
  },
  mounted() {
    socket.on('doc', val => {
      this.$refs.doc.value = val
    })
  },
  methods: {
    send() {
      socket.emit('doc', this.$refs.doc.value)
    }
  }
}
</script>

<style lang="less">
@import "~styles/init.less";

#notes-container {
  flex: 1 0 0;

  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;

  padding-top: 30px;

  background-color: #fafafa;

  animation: fadein .5s;
}

#doc {
  width: 80%;
  height: 1000px;

  border: 1px solid #eee;
  border-radius: 10px;

  padding: 30px;

  background-color: white;
  font-size: 25px;
  font-weight: 300;
}

</style>
