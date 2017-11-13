<template>
  <div id="settings-container">
    <div id="settings-content">
      <h2 class="center">Settings</h2>
      <hr class="line">

      <div id="profile">

        <div id="profile-left">
          <input type="file" accept="image/gif,image/jpeg,image/jpg,image/png" style="display: none;" @change="changeImage($event)" ref="avatarInput">
          <div id="avatar" v-bind:style="{ backgroundImage: 'url(' + avatar + ')' }" @click="setAvatar"></div>
        </div>

        <div id="profile-right">
          <h2 id="username">Username</h2>
          <input class="input" type="text" v-bind:value="this.$store.state.username">
          <h2 id="nickname">Nick Name</h2>
          <input class="input" type="text" v-bind:value="this.$store.state.nickname">
        </div>

      </div>

      <div id="button-container">
        <button id="save-button" class="button-trans" @click="saveAvatar">Save Change</button>
      </div>

    </div>
  </div>
</template>

<script>
import axios from 'axios'

export default {
  data() {
    return {
      avatar: this.$store.state.avatar
    }
  },
  mounted() {
    axios.get('/avatar')
      .then(response => {
        this.$store.state.avatar = response.data.avatar
      })
      .catch(error => {
        console.error(error)
      })
  },
  methods: {
    setAvatar() {
      this.$refs.avatarInput.click()
    },
    changeImage(e) {
      const file = e.target.files[0]
      const reader = new FileReader()
      const that = this

      reader.readAsDataURL(file)
      reader.onload = function(e) {
        that.avatar = this.result
      }
    },
    saveAvatar() {
      if (this.$refs.avatarInput.files.length !== 0) {
        const image = new FormData()

        image.append('avatar', this.$refs.avatarInput.files[0])
        axios.post('/avatar', image, {
          headers: {
            "Content-Type": "multipart/form-data"
          }
        })
      } 
    }
  }
}
</script>

<style lang="less">

@import "~styles/init.less";

#settings-container {
  flex: 1 0 0;
  width: 800px;

  padding-left: 50px;
  padding-right: 50px;

  margin-top: 10px;
  border: 1px solid @dark-white;
  border-radius: 10px;

  background-color: @white;

  @media all and (max-width: 1225px) {
    width: 80%;
  }

  @media all and (max-width: 975px) {
    padding-left: 20px;
    padding-right: 20px;
  }
}

#settings-content {
  height: 100%;
  width: 100%;

  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;

  padding-top: 25px;
}

#profile {
  flex: 0 0 250px;
  width: 100%;

  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: flex-start;

  @media all and (max-width: 700px) {
    flex: 0 0 450px;

    display: flex;
    flex-direction: column;
    /*flex-wrap: wrap;*/
    justify-content: flex-start;
    align-items: center;
  }
}

#profile-left {
  flex: 0 0 32%;
  height: 100%;

  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  @media all and (max-width: 700px) {
    flex: 0 0 250px;
    width: 100%;
  }

  @media all and (max-width: 550px) {
    flex: 0 0 250px;
  }
}

#profile-right {
  flex: 1 0 0;
  height: 100%;

  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: flex-start;

  padding-top: 30px;
  padding-left: 10%;

  h2 {
    font-weight: 100;
  }

  input {
    width: 100%;
    margin-top: 10px;
  }

  @media all and (max-width: 700px) {
    flex: 0 0 200px;
    width: 100%;

    padding-left: 0;
    padding-top: 0;
  }
}

#avatar {
  width: 90%;
  padding-top: 90%;  /* height is same as width */

  border-radius: 50%;

  background-color: @light-gray;
  background-size: cover;
  background-position: center;

  &:hover {
    cursor: pointer;
  }

  @media all and (max-width: 700px) {
    width: 50%;
    padding-top: 50%;
  }
}

#username {

}

#nickname {
  margin-top: 25px;
}

.center {
  align-self: center;
}

.line {
  display: block;
  border: 1px solid @dark-white;
  width: 100%;
  margin-top: 15px;
  margin-bottom: 20px;
}

#button-container {
  width: 100%;

  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;

  padding-top: 50px;
}

#save-button {
  width: 200px;
}

</style>
