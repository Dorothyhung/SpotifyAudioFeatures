<template>
  <h1>{{ title }}</h1>
  <div>
    <Modal v-if="showModal" @close="toggleModal"/>
  </div>
  <button @click="toggleModal">Show Modal</button>
  <input id="input" type="text" placeholder="Enter a track">
  <button id="search" @click="clickEvent">Search</button>
  <p>{{ text }}</p>
</template>

<script>
import Modal from './components/Modal.vue'

export default {
  name: 'App',
  components: { Modal },
  data() {
    return {
      title: 'Spotify Audio Features',
      text: 'Hi',
      showModal: false
    }
  },
  methods: {
    clickEvent() {
      this.text=''
    },
    toggleModal() {
      this.showModal = !this.showModal
    }
  }
}

</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
