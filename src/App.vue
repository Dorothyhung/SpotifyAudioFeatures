<template>
  <h1>{{ title }}</h1>
  <div>
    <Modal v-if="showModal" @close="toggleModal"/>
  </div>
  <button @click="toggleModal">Show Modal</button>
  <input id="input" type="text" placeholder="Enter a track">
  <button id="search" @click="getSpotifyData">Search</button>
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
      showModal: false,
      showTracks: []
    }
  },
  methods: {
    clickEvent() {
      this.text=''
    },
    toggleModal() {
      this.showModal = !this.showModal
    },

    getSpotifyData () {
      const clientId = '54df636a716a4694a62016ca346e68a5';
      const clientSecret = '0bd1cdbec71e4bdcbddd79e0e15b3e6b';
      var trackName = document.getElementById('input').value;
      var trackList = [];
      const _getToken = async() => {
          const result = await fetch(
              'https://accounts.spotify.com/api/token', {
                  method: 'POST',
                  headers: {
                      'Content-Type': 'application/x-www-form-urlencoded',
                      'Authorization': 'Basic ' + btoa(clientId + ':' + clientSecret)
                  },
                  body: 'grant_type=client_credentials',
              }
          );

          let data = await result.json();
          let token =  data.access_token;
          return token;
      }

      async function getTrackID(trackName) {
          console.log("searching for " + trackName)
          var token = await _getToken();
          var trackData = await fetch("https://api.spotify.com/v1/search?q=" + trackName + "&type=track&limit=20", {
              method: 'GET',
              headers: {
                  'Content-Type':'application/json',
                  'Authorization': 'Bearer ' + token
              }
          });
          var jsonResult = await trackData.json();
          for (var i = 0; i < jsonResult.tracks.items.length; i++) {
            var track = jsonResult.tracks.items[i];
            trackList.push({"id": track.id, "name": track.name});
          }

          //this.showTracks = trackList
          console.log(trackList)
          return trackList;
      }
      //getTrackID(trackName).then(result => console.log(result))
      getTrackID(trackName).then(result => this.showTracks.push(result))
      console.log("tracks = "+ getTrackID(trackName));
      console.log(typeof trackList)

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
