<template>
  <div id="root-container">
    <div id="top-container">
      <a href="/">Corna</a>
    </div>

    <div id="middle-container">
      <form @submit.prevent="submit" id="login-form">
        <h1>Sign in</h1>
        <p :class="isError()">{{ this.promptMessage }}</p>

        <input v-model="username" id="username" :class="isError('username')" type="text" placeholder="username or email">
        <input v-model="password" id="password" :class="isError('password')" type="password" placeholder="password">

        <div id="button-container">
          <button type="button" onclick="location.href='/register'">create account</button>
          <button type="submit">sign in</button>
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
          'error-input': fieldName === this.errorType
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
        return
      }

      if (this.password === '') {
        this.errorType = 'password'
        this.promptMessage = 'please fill in your password'
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

<style>

#root-container {
  height: 100vh;

  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;

  background-color: black;
}

#top-container {
  flex: 0 0 60px;
  width: 100%;

  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;

  background-color: white;
}

#middle-container {
  width: 100%;
  flex: 1 0 0;

  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  background-color: #fafafa;
}

#bottom-container {
  flex: 0 0 150px;
  width: 100%;

  background-color: #222;
}

#login-form {
  flex: 0 0 400px;
  width: 650px;

  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  border: 2px solid #eee;
  border-radius: 5px;

  background-color: white;
}

#button-container {
  width: 70%;

  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
}

#top-container a {
  font-size: 30px;
}

#login-form h1 {
  font-size: 40px;
}

#login-form input {
  height: 40px;
  width: 70%;

  border: 1px solid #ddd;
  border-radius: 5px;
  padding-left: 10px;

  font-size: 20px;
}

#login-form input::placeholder {
  color: #ccc;
}

#login-form input:focus {
  border: 2px solid #888;
  padding-left: 9px;
}

#login-form .error-input {
  border: 2px solid pink;
  padding-left: 9px;
}

#login-form .error-input::placeholder {
  color: pink;
}

#login-form .error-input:focus {
  border: 2px solid pink;
}

#username {
  margin-top: 30px;
}

#password {
  margin-top: 10px;
}

#button-container button {
  height: 50px;
  flex: 0 0 47%;

  margin-top: 30px;

  border: none;
  border-radius: 5px;

  background-color: #333;
  font-size: 20px;
  color: white;
}

#button-container button:hover {
  background-color: #512DA8;
  transition: .2s;
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

  #login-form {
    height: 525px;
    width: 100%;
  }
}
</style>
