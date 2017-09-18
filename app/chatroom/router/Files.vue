<template>
  <div id="files-container">
    <div v-if="!image" class="dropzone-area" drag-over="handleDragOver">
        <div class="dropzone-text">
          <span>Drop</span>
        </div>
      <input type="file" @change="onFileChange">
    </div>

    <div v-else class="dropzone-preview">
      <img :src="image" />
      <button @click="removeImage" v-if="image">Remove</button>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      image: ''
    }
  },
  mounted() {
    // TODO
  },
  methods: {
    onFileChange(e) {
      var files = e.target.files || e.dataTransfer.files;
      if (!files.length) return;
        this.createImage(files[0]);
    },
    createImage(file) {
      var image = new Image();
      var reader = new FileReader();
      var vm = this;

      reader.onload = (e) => {
        vm.image = e.target.result;
      };
      reader.readAsDataURL(file);
    },
    removeImage: function (e) {
      this.image = '';
    }
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

.dropzone-area {
  position: relative;
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

.dropzone-area input {
  position: absolute;
  top: 0px;
  right: 0;
  bottom: 0;
  left: 0;
  width: 100%;
  height: 100%;

  cursor: pointer;
  opacity: 0;
}

.dropzone-text {
  position: absolute;
  top: 50%;
  text-align: center;
  transform: translate(0, -50%);
  width: 100%;

  span {
    display: block;
    font-family: Arial, Helvetica;
    line-height: 1.9;
    color: white;
  }
}

.dropzone-preview {
  width: 80%;
  position: relative;
  &:hover .dropzone-button {
    display: block;
  }

  img {
    display: block;
    height: auto;
    max-width: 100%;
  }   
}
</style>
