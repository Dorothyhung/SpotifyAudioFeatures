import { createApp } from 'vue'
import App from './App.vue'
import './assets/global.css'

createApp(App).mount('#app')


const APIController = (function() {
    const clientId = '54df636a716a4694a62016ca346e68a5';
    const clientSecret = '0bd1cdbec71e4bdcbddd79e0e15b3e6b';

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
        console.log(data)
        let token =  data.access_token;
        console.log("token= "+ token);
        return token;
    }

    const token = _getToken()

    async function getArtistID(artist_name) {
        console.log("searching for " + artist_name)
        var token = await _getToken();
        var artistData = await fetch("https://api.spotify.com/v1/search?q=" + artist_name + "&type=artist", {
            method: 'GET',
            headers: {
                'Content-Type':'application/json',
                'Authorization': 'Bearer ' + token
            }
        });
        var jsonResult = await artistData.json();
        var artistID = jsonResult.artists.items[0].id;
        console.log(artistID)
        return artistID
    }
    console.log("results for Ed Sheeran ="+ getArtistID('Ed Sheeran'));
})();