<template>
  <div id="root-container">
    <div id="top-container">
      <a href="#">Corna</a>
    </div>

    <div id="middle-container">
      <form @submit.prevent="submit" id="login-form">
        <h1>Sign in</h1>
        <p :class="isError">{{ promptMessage }}</p>

        <input v-model="email" id="email" type="email" placeholder="email">
        <input v-model="password" id="password" type="password" placeholder="password">

        <button>sign in -></button>
      </form>
    </div>

    <div id="bottom-container">

    </div>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  data() {
    return {
      email: '',
      password: '',
      promptMessage: 'Enter your email address and password',
      error: false
    }
  },
  computed: {
    isError() {
      return {
        'error-message': this.error
      }
    }
  },
  methods: {
    submit() {
      if (this.email === '') {
        this.promptMessage = 'fill in your email address'
        this.error = true
        return
      }

      if (this.password === '') {
        this.promptMessage = 'fill in your password'
        this.error = true
        return
      }

      axios.post('/', {
        email: this.email,
        password: this.password
      }).then(response => {
        console.log(response)
      }).catch(error => {
        console.error(error)
      })
    }
  }
}

</script>

<style>
@import url('https://fonts.googleapis.com/css?family=Roboto+Condensed');

html, body, div, h1, h2, h3, h4, h5, h6, p, a, ul, ol, li, button, input {
  margin: 0;
  padding: 0;

  color: #333;
  font-family: 'Roboto Condensed', helvetica sans-serif, serif;
}

div, input, button {
  -webkit-box-sizing: border-box;
     -moz-box-sizing: border-box;
          box-sizing: border-box;
}

a {
  text-decoration: none;
}

input:focus {
  outline: none;
}

.error-message {
  color: red;
}

#root-container {
  height: 100vh;

  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;

  background-color: black;
}

#top-container {
  flex: 0 0 75px;
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

#login-form input:focus {
  border: 2px solid #888;
  padding-left: 9px;
}

#login-form input::placeholder {
  color: #ccc;
}

#email {
  margin-top: 30px;
}

#password {
  margin-top: 10px;
}

#login-form button {
  height: 50px;
  width: 200px;

  margin-top: 30px;

  border: none;
  border-radius: 5px;

  background-color: #333;
  font-size: 20px;
  color: white;
}

#login-form button:hover {
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
    height: 75px;

    border-bottom: 3px solid #fafafa;
  }

  #middle-container {
    display: block;
    margin-top: 75px;

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
    /*background-color: black;*/
  }
}
</style>
