<template>
  <div id="members-container">
    <div id="middle-container">
      <div id="invite-form" class="dropdown">
        <h1>Invite Members</h1>
        <p v-if="errorMessage" class="error-message">{{ errorMessage }}</p>
        <input v-model="input" type="text" placeholder="#members name">

        <div id="matched-users" class="dropdown-content">
          <li v-for="user in matchedUsers" @click="addMember(user)">{{ user.name }}</li>
        </div>
      </div>

      <div id="members">
        <div class="member" v-for="member in $store.state.members">
          <img @click="removeMember(member.id)" src="/assets/cross.png" alt="remove">
          <p>{{ member.name }}</p>
        </div>
      </div>
    </div>

    <div id="btn-area">
      <router-link to="/name">
        <button id="create-button">Back</button>
      </router-link>
      <button @click="createChatroom" id="create-button">Create</button>
    </div>
  </div>
</template>

<script>

import axios from 'axios'

export default {
  data() {
    return {
      input: '',
      errorMessage: '',
      matchedUsers: []
    }
  },
  watch: {
    input: function () {
      if (this.input === '') {
        return this.matchedUsers = ''
      }

      axios.post('/search', {
        search: this.input
      }).then(response => {

        const body = JSON.parse(response.data)

        console.log(response)
        console.log(body)
        console.log(body.users)

        this.matchedUsers = body.users.
          filter(user => { // find matched users.
            return (user.name.indexOf(this.input) === 0) ? true : false
          })
          .filter(user => {  // Prevent repeat users.
            return this.$store.state.members.every(member => {
              return user.id !== member.id
            })
          })
      })

      // These data is for frontend debug.
      // const users =  [
      //   { id: 1, name: 'yogapan' },
      //   { id: 2, name: 'yogapan_111' },
      //   { id: 3, name: 'yogapan85321' },
      //   { id: 4, name: 'yogapan_love' },
      //   { id: 5, name: 'garylai' },
      //   { id: 6, name: 'garylai_haha' },
      //   { id: 7, name: 'hank1120' },
      //   { id: 8, name: 'husky' },
      //   { id: 9, name: 'yanwai_abc' },
      //   { id: 10, name: 'official_husky_lovers' },
      //   { id: 11, name: 'aka_motherfucker' },
      //   { id: 12, name: 'lolikon' }
      // ]
      //
      // this.matchedUsers = users.
      //   filter(user => { // find matched users.
      //     return (user.name.indexOf(this.input) === 0) ? true : false
      //   })
      //   .filter(user => {  // Prevent repeat users.
      //     return this.$store.state.members.every(member => {
      //       return user.id !== member.id
      //     })
      //   })
    }
  },
  methods: {
    addMember(newMember) {
      this.$store.commit('addMember', newMember)
      this.input = ''

      // Delay to wait data push to list.
      setTimeout(() => {
        const memberContainer = this.$el.querySelector("#members")
        memberContainer.scrollTop = memberContainer.scrollHeight
      }, 100)
    },
    removeMember(id) {
      this.$store.commit('removeMember', id)
    },
    createChatroom() {
      if (this.$store.state.members.length === 0) {
        return this.errorMessage = 'Please add members.'
      }

      axios.post('/create-chatroom', {
        name: this.$store.state.roomName,
        users: this.$store.state.members
      }).then(response => {
        const body = response.data

        if (body.success) {
          document.location.href = '/board'
        } else {
          this.errorMessage = 'Create chatroom Failed!'
        }
      }).catch(error => {
        this.errorMessage = error.message
        console.error(error)
      })
    }
  }
}

</script>

<style>

#members-container {
  height: 100%;
  width: 100%;

  display: flex;
  flex-direction: column;
  align-items: stretch;
}

#invite-form {
  width: 80%;
}

#invite-form h1 {
  font-weight: 100;
}

#invite-form input {
  height: 50px;
  width: 100%;

  margin-top: 10px;

  border: 2px solid #ddd;
  border-radius: 5px;
  padding-left: 10px;

  font-size: 20px;
  font-weight: 300;
  color: #444;
}

#invite-form input:focus {
  border: 2px solid #888;
}

#invite-form input::placeholder {
  color: #ccc;
}

.dropdown {
  position: relative;
  display: inline-block;
}

.dropdown-content {
  /*display: none;*/
  position: absolute;
  background-color: #f9f9f9;
  min-width: 160px;
  box-shadow: 0px 8px 16px 0px rgba(0,0,0,0.2);
  z-index: 1;
}

.dropdown-content li {
  padding: 12px 16px;
  display: block;

  color: black;
  cursor: pointer;
}

.dropdown-content li:hover {
  background-color: #f1f1f1
}

/*.show {
  display: block;
}*/

#members {
  flex: 0 0 400px;
  width: 80%;

  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: stretch;

  margin-top: 15px;

  overflow: scroll;
}

.member {
  flex: 0 0 60px;

  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: center;

  margin-top: 5px;

  border: 1px solid #ddd;
  border-radius: 5px;

  padding-left: 15px;
}

.member img {
  width: 20px;
  height: 20px;
}

.member img:hover {
  transition: .2s;
  /*filter: sepia() saturate(10000%) hue-rotate(30deg);*/
  cursor: pointer;
}

.member p {
  font-size: 20px;
  margin-left: 10px;
}

#btn-area {
  width: 100%;
  flex: 0 0 150px;

  padding-left: 100px;
  padding-right: 100px;

  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-around;
}

#create-button {
  height: 50px;
  width: 130px;

  border: none;
  border-radius: 5px;

  background-color: #333;

  font-size: 20px;
  color: white;
}

#create-button:hover {
  background-color: #512DA8;
  transition: .2s;
}

.error-message {
  margin-top: 15px;
  color: red;
}

@media all and (max-width: 770px) {
  #members {
    flex: 0 0 275px;
  }

  #btn-area {
    padding-left: 20px;
    padding-right: 20px;
  }
}

</style>
