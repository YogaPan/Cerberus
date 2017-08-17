<template>
  <div id="vote-container">

    <div class="inside-container">
      <h1>Vote Title</h1>
      <input class="input-big" type="text" />

      <h1>Options</h1>
      <input class="input" type="text" />

      <h1>Options</h1>
      <input class="input" type="text" />
    </div>
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

<style>
#vote-container {
  flex: 1 0 0;

  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  /* box model */
  /*padding: 100px 100px;*/
  padding-top: 100px;

  background-color: #fff;
}

.inside-container {
  background-color: #fdfdfd;
  height: 100%;
  width: 500px;
}
</style>
