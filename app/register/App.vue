<template>
  <div id="root-container">
    <div id="top-container">
      <a class="app-link" href="/">GODS</a>
    </div>

    <div id="middle-container">
      <form @submit.prevent="submit" id="register-form" class="background-white">
        <h1>Sign up</h1>
        <p class="purple" :class="isError()">{{ promptMessage }}</p>

        <input ref="username" class="input" v-model="username" id="username" type="text" placeholder="username" autofocus>
        <input ref="email" class="input" v-model="email" id="email" type="email" placeholder="email">
        <input ref="password" class="input" v-model="password" id="password" type="password" placeholder="password">
        <input ref="password-repeat" class="input" v-model="passwordRepeat" id="password-repeat" type="password" placeholder="password again">

        <button class="button-trans" type="submit">sign up</button>
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
      email: '',
      password: '',
      passwordRepeat: '',

      errorType: '',
      promptMessage: 'Enter your username, email and password'
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
      if (this.username === '') {
        this.errorType = 'username'
        this.promptMessage = 'please fill in your username'
        this.$refs.username.focus()
        this.$refs.username.select()
        return
      }

      if (this.email === '') {
        this.errorType = 'email'
        this.promptMessage = 'please fill in your email address'
        this.$refs.email.focus()
        this.$refs.email.select()
        return
      }

      if (this.password === '') {
        this.errorType = 'password'
        this.promptMessage = 'please fill in your password'
        this.$refs.password.focus()
        this.$refs.password.select()
        return
      }

      if (this.password.length <= 8) {
        this.errorType = 'password'
        this.promptMessage = 'password must be more than 8 characters'
        this.$refs.password.focus()
        this.$refs.password.select()
        return
      }

      if (this.passwordRepeat === '') {
        this.errorType = 'repeat'
        this.promptMessage = 'please fill in your password again'
        this.$refs['password-repeat'].focus()
        this.$refs['password-repeat'].select()
        return
      }

      if (this.password !== this.passwordRepeat) {
        this.errorType = 'repeat'
        this.promptMessage = 'password repeat not correct'
        this.$refs['password-repeat'].focus()
        this.$refs['password-repeat'].select()
        return
      }

      axios.post('/register', {
        username: this.username,
        email: this.email,
        password: this.password
      }).then(response => {
        const body = response.data

        if (body.success) {
          document.location.href = "/board"
        } else {
          this.promptMessage = body.message
          this.errorType = 'register'
        }
      }).catch(error => {
        this.promptMessage = error.message
        this.errorType = 'request'

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

#register-form {
  flex: 0 0 400px;

  width: 650px;

  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  border: 2px solid #eee;
  border-radius: 5px;

  background-color: @white;

  h1 { font-size: 40px; }
  input { width: 70%; }
  button {
   width: 200px;
   margin-top: 30px;
  }

  @media all and (max-width: 650px) {
    height: 525px;
    width: 100%;
  }
}

#username {
  margin-top: 20px;
}

#email {
  margin-top: 8px;
}

#password {
  margin-top: 8px;
}

#password-repeat {
  margin-top: 8px;
}

</style>
