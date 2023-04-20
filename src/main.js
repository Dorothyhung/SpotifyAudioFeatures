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
                body: 'grant_type=client_credentials'
            }
        );

        const data = await result.json();
        const token =  data.access_token;
        console.log(token);
        return token;
    }

    let token = _getToken()

    const _searchArtists = async (token, artist_name) => {
        const result = await fetch('https://api.spotify.com/v1/search?q=${artist_name}&type=artist&limit=1', {
                method: 'GET',
                headers: {
                    'Authorization': 'Bearer ' + token,
                },
                mode:'no-cors'
            }
        );
        const data = await result.json().artists;
        return data
    }
    console.log(_searchArtists(token, 'Ed Sheeran'))
})();