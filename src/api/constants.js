export const RESPONSE_TYPE = "token";

export const SPOTIFY_SCOPES = {
  PLAYLIST_MODIFY_PRIVATE: "playlist-modify-private",
  PLAYLIST_MODIFY_PUBLIC: "playlist-modify-public",
  UGC_IMAGE_UPLOAD: "ugc-image-upload",
};

export const SPOTIFY_ENDPOINTS = {
  AUTHORIZE: "https://accounts.spotify.com/authorize",
  GET_USER: "https://api.spotify.com/v1/me",
  GET_TRACKS: "https://api.spotify.com/v1/search",
  CREATE_PLAYLIST: "https://api.spotify.com/v1/users/:userId/playlists",
  ADD_TRACKS_TO_PLAYLIST:
    "https://api.spotify.com/v1/playlists/:playlistId/tracks",
  GET_RELATED_ARTISTS:
    "https://api.spotify.com/v1/artists/:artistId/related-artists",
  GET_ARTIST_TOP_TRACKS:
    "https://api.spotify.com/v1/artists/:artistId/top-tracks",
  GET_RECOMMENDATIONS: "https://api.spotify.com/v1/recommendations",
  ADD_CUSTOM_PLAYLIST_COVER:
    "https://api.spotify.com/v1/playlists/:playlistId/images",
  GET_USERS_PLAYLISTS: "https://api.spotify.com/v1/me/playlists",
};
