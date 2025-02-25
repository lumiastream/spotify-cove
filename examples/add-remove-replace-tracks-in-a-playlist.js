const SpotifyWebApi = require('../');

/**
 * This example demonstrates adding tracks, removing tracks, and replacing tracks in a playlist. At the time of writing this
 * documentation, this is the available playlist track modification feature in the Spotify Web API.
 *
 * Since authorization is required, this example retrieves an access token using the Authorization Code Grant flow,
 * documented here: https://developer.spotify.com/documentation/general/guides/authorization-guide/#authorization-code-flow
 *
 * Codes are given for a set of scopes. For this example, the scopes are playlist-modify-public.
 * Scopes are documented here:
 * https://developer.spotify.com/documentation/general/guides/scopes/
 */

/* Obtain the `authorizationCode` below as described in the Authorization section of the README.
 */
const authorizationCode =
  '<insert authorization code with playlist-modify-public scope>';

/**
 * Get the credentials from Spotify's Dashboard page.
 * https://developer.spotify.com/dashboard/applications
 */
const spotifyApi = new SpotifyWebApi({
  clientId: '<insert client id>',
  clientSecret: '<insert client secret>',
  redirectUri: '<insert redirect URI>'
});

let playlistId;

// First retrieve an access token
spotifyApi
  .authorizationCodeGrant(authorizationCode)
  .then(function (data) {
    // Save the access token so that it's used in future requests
    spotifyApi.setAccessToken(data['access_token']);

    // Create a playlist
    return spotifyApi.createPlaylist(
      'lumiastream',
      'My New Awesome Playlist'
    );
  })
  .then(function (data) {
    console.log('Ok. Playlist created!');
    playlistId = data.body['id'];

    // Add tracks to the playlist
    return spotifyApi.addTracksToPlaylist(playlistId, [
      'spotify:track:4iV5W9uYEdYUVa79Axb7Rh',
      'spotify:track:6tcfwoGcDjxnSc6etAkDRR',
      'spotify:track:4iV5W9uYEdYUVa79Axb7Rh'
    ]);
  })
  .then(function (data) {
    console.log('Ok. Tracks added!');

    // Woops! Made a duplicate. Remove one of the duplicates from the playlist
    return spotifyApi.removeTracksFromPlaylist('lumiastream', playlistId, [
      {
        uri: 'spotify:track:4iV5W9uYEdYUVa79Axb7Rh',
        positions: [0]
      }
    ]);
  })
  .then(function (data) {
    console.log('Ok. Tracks removed!');

    // Actually, lets just replace all tracks in the playlist with something completely different
    return spotifyApi.replaceTracksInPlaylist('lumiastream', playlistId, [
      'spotify:track:5Wd2bfQ7wc6GgSa32OmQU3',
      'spotify:track:4r8lRYnoOGdEi6YyI5OC1o',
      'spotify:track:4TZZvblv2yzLIBk2JwJ6Un',
      'spotify:track:2IA4WEsWAYpV9eKkwR2UYv',
      'spotify:track:6hDH3YWFdcUNQjubYztIsG'
    ]);
  })
  .then(function (data) {
    console.log('Ok. Tracks replaced!');
  })
  .catch(function (err) {
    console.log('Something went wrong:', err.message);
  });
