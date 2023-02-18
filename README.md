# songshuttle

## About

SongShuttle is a simple application that makes use of the Spotify API to search for songs, find recommendations, and create playlists on your account on the fly!

### Built With

- [JavaScript](https://developer.mozilla.org/en-US/docs/Web/JavaScript) / [Node](https://nodejs.org/en/) / [React](https://reactjs.org/)
- [Spotify Web API](https://developer.spotify.com/documentation/web-api/)

## Getting Started

In order to login to the application, you must have a Spotify developer account and create an `.env` file with your client ID, secret, and local redirect uri.

- You can create a dev account [here](https://developer.spotify.com/).
- Navigate to your [dashboard](https://developer.spotify.com/dashboard/applications) to find the client ID of your app.
- Set your redirect uri(s) in your developer dashboard.
- You will also need to change the routing in the application to match your redirect uri.

The `.env` file should be in the root directory of the project. Here's an example:

```
REACT_APP_CLIENT_ID = "your client ID here"
REACT_APP_CLIENT_SECRET = "your client secret here"
REACT_APP_REDIRECT_URI = "http://localhost:3000/songshuttle/"
```

Run `npm i` to install dependencies, and then run `npm start` to boot up the React application.
