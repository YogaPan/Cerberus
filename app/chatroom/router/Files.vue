<template>
  <div id="files-container">
    <h1>Files here...</h1>
    <form action="/test" method="post" enctype="multipart/form-data">
      <input type="file" accept="" name="filetoupload">
      <input type="submit">
    </form>
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
#files-container {
  flex: 1 0 0;

  background-color: #fff;
}
</style>
