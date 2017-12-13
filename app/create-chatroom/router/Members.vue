<template>
  <div id="members-container">
    <div id="middle-container">
      <div id="invite-form" class="dropdown">
        <h1>Invite Members</h1>
        <p v-if="errorMessage" class="error-message">{{ errorMessage }}</p>
        <input ref="member-form" class="input-big" v-model="input" type="text" placeholder="#members name" autofocus>

        <div id="matched-users" class="dropdown-content">
          <li v-for="user in this.$store.state.matchedUsers" @click="addMember(user)">
            <img class="circle-image" :src="'getavatar/' + user.id" alt="head">
            <p>{{ user.name }}</p>
          </li>
        </div>
      </div>

      <div id="members">
        <div class="member" v-for="member in $store.state.members">
          <img class="circle-image" src="/assets/snake.jpg" alt="head">
          <p>{{ member.name }}</p>
          <img class="cancel" @click="removeMember(member.id)" src="/assets/cross.png" alt="remove">
        </div>
      </div>
    </div>

    <div id="btn-area">
      <router-link to="/name">
        <button id="create-button" class="button-trans">Back</button>
      </router-link>
      <button id="create-button" class="button-trans" @click="createChatroom" >Create</button>
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
    }
  },
  mounted() {
    // Add global event listener
    document.addEventListener('click', this.hideDropdown)
  },
  watch: {
    input: function () {
      this.$store.dispatch('getMatchedUsers', this.input)
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
    hideDropdown() {
      this.$store.state.matchedUsers = []
    },
    createChatroom() {
      if (this.$store.state.members.length === 0) {
        this.$refs['member-form'].focus()

        return this.errorMessage = 'Please add members.'
      }

      axios.post('/create-chatroom', {
        name: this.$store.state.roomName,
        users: this.$store.getters.membersId
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

<style lang="less">

@import "~styles/init.less";

#members-container {
  height: 100%;
  width: 100%;

  display: flex;
  flex-direction: column;
  align-items: stretch;
}

#invite-form {
  width: 80%;

  h1 { font-weight: 100; }
  input {
    width: 100%;
    margin-top: 10px;
  }
  .error-message { margin-top: 15px; }
}

.dropdown {
  position: relative;
  display: inline-block;
}

.dropdown-content {
  position: absolute;
  min-width: 300px;

  border-radius: 10px;
  background-color: white;
  box-shadow: 0px 8px 16px 0px rgba(0,0,0,0.2);
  z-index: 1;

  li {
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: flex-start;

    padding: 12px 16px;
    border-top: 1px solid #f8f8f8;

    font-size: 20px;
    color: black;
    cursor: pointer;

    p { padding-left: 15px; }

    &:hover { background-color: @dark-white; }
  }
}

#members {
  flex: 0 0 400px;
  width: 80%;

  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: stretch;

  margin-top: 15px;

  overflow: scroll;

  @media all and (max-width: 770px) {
    flex: 0 0 275px;
  }
}

.member {
  flex: 0 0 60px;

  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: center;
  position: relative;

  margin-top: 5px;
  border: 1px solid #ddd;
  border-radius: 5px;
  padding-left: 15px;

  p {
    font-size: 20px;
    margin-left: 10px;
  }
}

.cancel {
  position: absolute;
  right: 10px;
  top: 50%;
  transform: translateY(-50%);

  width: 20px;
  height: 20px;

  &:hover {
    transition: .2s;
    cursor: pointer;
  }
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

  @media all and (max-width: 770px) {
    padding-left: 20px;
    padding-right: 20px;
  }
}

#create-button {
  width: 130px;
}

</style>
