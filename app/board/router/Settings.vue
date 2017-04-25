<template>
  <div id="settings-container">
    <div id="settings-content">
      <h2 class="center">Settings</h2>
      <hr class="line">
      <h2>Image</h2>
      <h2>Name</h2>
      <h2>Name</h2>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {}
  },
  computed: {
    /* TODO */
  },
  methods: {
    /* TODO */
  }
}
</script>

<style>
#settings-container {
  flex: 1 0 0;
  width: 800px;

  padding-left: 50px;
  padding-right: 50px;

  margin-top: 10px;
  border: 1px solid #eee;
  border-radius: 10px;

  background-color: white;
}

#settings-content {
  height: 100%;
  width: 100%;

  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-start;

  padding-top: 25px;
}

.center {
  align-self: center;
}

.line {
  display: block;
  border: 1px solid #eee;
  width: 100%;
  margin-top: 15px;
  margin-bottom: 20px;
}
</style>
