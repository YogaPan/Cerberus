<template>
  <div id="root-container">
    <div id="top-container" class="background-white">
      <a class="app-link" href="/">Cerberus</a>
    </div>

    <div id="middle-container" class="background-gray">
      <form @submit.prevent="submit" id="register-form" class="background-white">
        <h1>Sign up</h1>
        <p :class="isError()">{{ promptMessage }}</p>

        <input class="input" v-model="username" id="username" :class="isError('username')" type="text" placeholder="username" autofocus>
        <input class="input" v-model="email" id="email" :class="isError('email')" type="email" placeholder="email">
        <input class="input" v-model="password" id="password" :class="isError('password')" type="password" placeholder="password">
        <input class="input" v-model="passwordRepeat" id="password-repeat" :class="isError('repeat')" type="password" placeholder="password again">

        <button class="background-black-light trans-purple" type="submit">sign up</button>
      </form>
    </div>

    <div id="bottom-container" class="background-black">

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
        return
      }

      if (this.email === '') {
        this.errorType = 'email'
        this.promptMessage = 'please fill in your email address'
        return
      }

      if (this.password === '') {
        this.errorType = 'password'
        this.promptMessage = 'please fill in your password'
        return
      }

      if (this.password.length <= 8) {
        this.errorType = 'password'
        this.promptMessage = 'password must be more than 8 characters'
        return
      }

      if (this.passwordRepeat === '') {
        this.errorType = 'repeat'
        this.promptMessage = 'please fill in your password again'
        return
      }

      if (this.password !== this.passwordRepeat) {
        this.errorType = 'repeat'
        this.promptMessage = 'password repeat not correct'

        this.passwordRepeat = ''
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

<style>
#root-container {
  height: 100vh;

  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
}

#top-container {
  flex: 0 0 60px;
  width: 100%;

  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
}

#middle-container {
  width: 100%;
  flex: 1 0 0;

  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}

#bottom-container {
  flex: 0 0 150px;
  width: 100%;
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
}

#register-form h1 {
  font-size: 40px;
  /*margin-top: 10px;*/
}

#register-form input {
  width: 70%;
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

#register-form button {
  height: 50px;
  width: 200px;

  margin-top: 30px;

  border: none;
  border-radius: 5px;

  font-size: 20px;
  color: white;
}

@media all and (max-height: 650px) {
  #root-container {
    height: 650px;
  }
}

@media all and (max-width: 650px) {
  #root-container {
    display: block;
    height: 1000px;
  }

  #top-container {
    position: fixed;
    top: 0;

    display: flex;
    height: 60px;

    border-bottom: 3px solid #fafafa;
  }

  #middle-container {
    display: block;
    margin-top: 60px;

    padding-top: 30px;
    padding-bottom: 30px;
  }

  #bottom-container {
    display: block;
    height: 450px;
  }

  #register-form {
    height: 525px;
    width: 100%;
  }
}
</style>
