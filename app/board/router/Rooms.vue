<template>
  <div id="room-container">
    <div class="room" v-for="room in rooms" @click="toChatroom">
      <div class="room-content">
        <div class="room-description">
          <h1>{{ room.name }}</h1>
          <p>{{ room.description }}</p>
        </div>
        <div class="room-people">
          <div class="person"></div>
          <div class="person"></div>
          <div class="person"></div>
          <div class="person"></div>
        </div>
      </div>
    </div>

    <div class="room" @click="createChatroom">
      <div id="room-add">
        <img src="/assets/plus-sign.svg" alt="add">
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      rooms: [
        { name: '期末專題', description: '期末專題的討論', src: '' },
        { name: '讀書會', description: 'Come on, you just jerk', src: '' },
        { name: '普通頻道', description: '一個不小心', src: '' },
        { name: '期末專題', description: '哈囉你好嗎', src: '' },
        { name: '旅遊討論', description: 'test', src: '' }
      ]
    }
  },
  computed: {
    /* TODO */
  },
  methods: {
    toChatroom() {
      document.location.href = '/chatroom'
    },
    createChatroom() {
      document.location.href = '/create-chatroom'
    }
  }
}
</script>

<style>
#room-container {
  flex: 1 0 0;

  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  align-items: flex-start;
  justify-content: flex-start;

  padding: 30px;
}

#room-add {
  width: 200px;
  height: 200px;
  border: 1px solid #ccc;
  border-radius: 10px;
  background-color: white;

  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}

#room-add:hover {
  cursor: pointer;
}

#room-add img {
  width: 100px;
  height: 100px;
}

.room {
  width: calc(100% / 4);

  margin-bottom: 40px;

  display: flex;
  flex-direction: column;
  align-items: center;

  /*background-color: #f8f8f8;*/
}

.room-content {
  display: flex;
  flex-direction: column;
  align-items: flex-stretch;
  justify-content: center;

  width: 200px;
  height: 200px;
  border: 1px solid #ccc;
  border-radius: 10px;
  background-color: white;
}

.room-content:hover {
  cursor: pointer;
}

.room-description {
  flex: 3 0 10px;

  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: flex-start;

  padding-top: 15px;
  padding-left: 15px;
  padding-right: 15px;
}

.room-description h1 {
  font-weight: 100;
}

.room-description p {
  font-family: 'helvetica';
  color: #666;
  margin-top: 10px;
}

.room-people {
  flex: 1 0 10px;

  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: flex-start;

  padding-left: 5px;
  padding-right: 5px;

  border-top: 1px solid #eee;
  border-bottom-left-radius: 10px;
  border-bottom-right-radius: 10px;

  background-color: #222;
}

.person {
  height: 30px;
  width: 30px;

  border-radius: 100%;
  background-color: #eee;

  margin-left: 5px;
  margin-right: 5px;
}

@media all and (max-height: 625px) {
  /* TODO */
}

/*@media all and (max-width: 1225px) {
  .room {
    width: calc(100% / 3);
  }
}

@media all and (max-width: 975px) {
  .room {
    width: calc(100% / 2);
  }
}*/
</style>
