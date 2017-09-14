<template>
  <div id="files-container">
    <button id="start-dropping-button">Drop</button>
  </div>
</template>

<script>
export default {
  data() {
    return {}
  },
  mounted() {
    // TODO
  },
  methods: {
    // TODO
  }
}
</script>

<style lang="less">

@import "~styles/init.less";

#files-container {
  flex: 1 0 0;

  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;

  background-color: @dark-black;
}

#start-dropping-button {
  height: 400px;
  width: 400px;

  border-radius: 50%;
  background-color: @light-black;
  color: white;

  font-size: 75px;

  &:hover {
    height: 500px;
    width: 500px;
    transition: .1s;
  }
}
</style>
