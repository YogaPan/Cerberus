<template>
  <div id="root-container">
    <div id="top-container">
      <a class="app-link" href="/">GODS</a>
    </div>

    <div id="middle-container">
      <form @submit.prevent="submit" id="login-form">
        <h1>Sign in</h1>
        <p class="purple" :class="isError()">{{ this.promptMessage }}</p>

        <input ref="username" class="input" v-model="username" id="username" type="text" placeholder="username or email" autofocus>
        <input ref="password" class="input" v-model="password" id="password" type="password" placeholder="password">

        <div id="button-container">
          <button class="button-trans" type="button" onclick="location.href='/register'">create account</button>
          <button class="button-trans" type="submit">sign in</button>
        </div>
      </form>
    </div>

    <div id="bottom-container">

    </div>
  </div>
</template>

<script>
import axios from 'axios'

export default {
  data() {
    return {
      username: '',
      password: '',

      errorType: '',
      promptMessage: 'Enter your username and password'
    }
  },
  methods: {

    isError(fieldName) {
      if (fieldName) {
        return {
          'input-error': fieldName === this.errorType
        }
      } else {
        return {
          'error-message': this.errorType === '' ? false : true
        }
      }
    },

    submit() {
      var isEmail

      if (this.username === '') {
        this.errorType = 'username'
        this.promptMessage = 'please fill in your username or email address'
        this.$refs.username.focus()
        this.$refs.username.select()
        return
      }

      if (this.password === '') {
        this.errorType = 'password'
        this.promptMessage = 'please fill in your password'
        this.$refs.password.focus()
        this.$refs.password.select()
        return
      }

      // Check use email or username.
      if (/^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/.test(this.username) === true) {
        isEmail = true
      } else {
        isEmail = false
      }

      axios.post('/login', {
        username: this.username,
        password: this.password,
        isEmail: isEmail
      }).then(response => {
        const body = response.data

        if (body.success) {
          document.location.href = '/board'
        } else {
          this.errorType = 'login'
          this.promptMessage = body.message
        }
      }).catch(error => {
        this.errorType = 'request'
        this.promptMessage = error.message

        console.error(error)
      })
    }

  }
}

</script>

<style lang="less">

@import "~styles/init.less";

#root-container {
  height: 100vh;

  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
  
  @media all and (max-height: 650px) {
    height: 650px;
  }

  @media all and (max-width: 650px) {
    display: block;
    height: 1000px;
  }
}

#top-container {
  flex: 0 0 60px;
  width: 100%;

  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;

  background-color: @white;

  @media all and (max-width: 650px) {
    position: fixed;
    top: 0;

    display: flex;
    height: 60px;

    border-bottom: 3px solid @dark-white;
  }
}

#middle-container {
  width: 100%;
  flex: 1 0 0;

  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  background-color: @dark-white;

  
  @media all and (max-width: 650px) {
    display: block;
    margin-top: 60px;

    padding-top: 30px;
    padding-bottom: 30px;
  }
}

#bottom-container {
  flex: 0 0 150px;
  width: 100%;

  background-color: @black;

  @media all and (max-width: 650px) {
    display: block;
    height: 450px;
  }
}

#login-form {
  flex: 0 0 400px;
  width: 650px;

  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  border: 1px solid @light-gray;
  border-radius: 5px;
  background-color: @white;

  @media all and (max-width: 650px) {
    height: 525px;
    width: 100%;
  }
}

#button-container {
  width: 70%;

  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;

  button {
    flex: 0 0 47%;
    margin-top: 30px;
  }
}

#login-form {
  h1 { font-size: 40px; }
  input { width: 70%; }
}

#username { margin-top: 30px; }
#password { margin-top: 10px; }

</style>
