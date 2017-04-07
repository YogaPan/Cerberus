<template>
  <div id="room-container">
    <div class="room" v-for="room in rooms">
      <div class="room-content">
        <h1>{{ room.name }}</h1>
        <p>{{ room.description }}</p>
      </div>
    </div>

    <div class="room">
      <div class="room-content">
        <img id="room-add" src="/assets/plus-sign.svg" alt="add">
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      rooms: [
        { name: 'Final-project', description: 'test', src: '' },
        { name: 'Android', description: 'test', src: '' },
        { name: 'General', description: 'test', src: '' },
        { name: 'Random', description: 'test', src: '' },
        { name: 'Random', description: 'test', src: '' }
      ]
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
  height: 100%;
  width: 100%;
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
  width: 200px;
  height: 200px;
  border: 2px solid #ccc;
  border-radius: 10px;
  background-color: white;
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
