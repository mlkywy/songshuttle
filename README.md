# songshuttle

## About

SongShuttle is a simple application that makes use of the Spotify API to search for songs, find recommendations, and create playlists on your account on the fly!

### Built With

- [JavaScript](https://developer.mozilla.org/en-US/docs/Web/JavaScript)
- [Node](https://nodejs.org/en/)
- [Spotify Web API](https://developer.spotify.com/documentation/web-api/)

## Getting Started

In order to login to the application, you must have a Spotify developer account and create an `.env` file with your credentials. You can create a dev account [here](https://developer.spotify.com/). Navigate to your [dashboard](https://developer.spotify.com/dashboard/applications) to find the client ID of your app. Ensure that your Redirect Uri is `http://localhost:3000` or whatever port you intend use locally.

The `.env` file should be in the root directory of the project. The following is an example of how it should be set up:

```
REACT_APP_CLIENT_ID = "your client ID here"
REACT_APP_CLIENT_SECRET = "your client secret here"
```

Run `npm i` to install dependencies, and then run `npm start` to boot up the React application.
