<template>
  <div id="members-container">
    <div id="middle-container">
      <div id="invite-form">
        <h1>Invite Members</h1>
        <input type="text" placeholder="#members name">
      </div>

      <div id="members">
        <div id="member"></div>
        <div id="member"></div>
        <div id="member"></div>
        <div id="member"></div>
        <div id="member"></div>
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

export default {
  data() {
    return {
      /* TODO */
    }
  },
  computed: {
    /* TODO */
  },
  methods: {
    /* TODO */
  }
}

</script>

<style>

#members-container {
  height: 100%;
  width: 100%;

  display: flex;
  flex-direction: column;
  justify-content: stretch;
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

#members {
  flex: 0 0 400px;
  width: 80%;

  display: flex;
  flex-direction: column;
  justify-content: stretch;

  border: 2px solid #ddd;
  border-radius: 5px;
}

#member {
  flex: 0 0 60px;

  border: 1px solid #ddd;
  border-radius: 5px;
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
