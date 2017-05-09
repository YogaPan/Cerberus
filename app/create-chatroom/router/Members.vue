<template>
  <div id="members-container">
    <div id="middle-container">
      <div id="invite-form" class="dropdown">
        <h1>Invite Members</h1>
        <form @submit.prevent="addMember">
          <input v-model="input" type="text" placeholder="#members name">
        </form>

        <div id="myDropdown" class="dropdown-content">
          <li v-for="defaultUser in searchUsers()" @click="addMember(defaultUser)">{{ defaultUser }}</li>
        </div>
      </div>

      <div id="members">
        <div class="member" v-for="member in members">
          <p>{{ member }}</p>
        </div>
      </div>
    </div>

    <div id="next">
      <router-link to="/members">
        <button id="next-button">Next -></button>
      </router-link>
    </div>
  </div>
</template>

<script>

import axios from 'axios'

export default {
  data() {
    return {
      input: '',
      members: [],
      defaultUsers: [
        { id: 1, name: 'yogapan' },
        { id: 2, name: 'yogapan_111' },
        { id: 3, name: 'yogapan85321' },
        { id: 4, name: 'yogapan_love' },
        { id: 5, name: 'garylai' },
        { id: 6, name: 'garylai_haha' },
        { id: 7, name: 'hank1120' },
        { id: 8, name: 'husky' }
      ]
    }
  },
  computed: {
    // TODO
  },
  methods: {
    searchUsers() {
      // axios.post('/search' ,{
          // username: this.input
        // }).then((response) => {
          // const body = response.data
          // body.users
        // })

      if (this.input === '') {
        return []
      }

      const matchedUsers = this.defaultUsers.filter(defaultUser => {
        return (defaultUser.name.indexOf(this.input) === 0) ? true : false
      })

      return matchedUsers;
    },
    addMember(defaultUser) {
      this.members.push(defaultUser)
      this.input = ''
    },
    deleteUser() {
      /* TODO */
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
  /*background-color: orange;*/
  width: 80%;
}

#invite-form h1 {
  font-weight: 100;
}

#invite-form p {
  margin-top: 20px;
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

  border: 2px solid #ddd;
  border-radius: 5px;
}

.member {
  flex: 0 0 60px;

  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: center;

  border: 1px solid #ddd;
  border-radius: 5px;
}

.member p {
  font-size: 20px;
}

#next-button {
  height: 50px;
  width: 130px;

  border: none;
  border-radius: 5px;

  background-color: #333;

  font-size: 20px;
  color: white;
}

#next-button:hover {
  background-color: #512DA8;
  transition: .2s;
}

</style>
