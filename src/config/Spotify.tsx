import SpotifyWebApi from 'spotify-web-api-node';

const scopes = [
  'user-read-email',
  'user-read-private',
  "ugc-image-upload",
  "user-read-currently-playing",
  "user-read-playback-state",
  "user-modify-playback-state",
  "app-remote-control",
  "streaming",
  "playlist-read-private",
  "playlist-read-collaborative",
  "playlist-modify-private",
  "playlist-modify-public",
  "user-library-modify",
  "user-library-read",
  "user-read-recently-played",
].join(',');

const spotifyApi = new SpotifyWebApi({
  clientId: process.env.SPOTIFY_CLIENT_ID,
  clientSecret: process.env.SPOTIFY_CLIENT_SECRET
});

export {spotifyApi, scopes}