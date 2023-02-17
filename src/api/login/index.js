import {
  SPOTIFY_ENDPOINTS,
  REDIRECT_URI,
  RESPONSE_TYPE,
  SPOTIFY_SCOPES,
} from "../constants";

const login = () => {
  const scopes = [
    SPOTIFY_SCOPES.PLAYLIST_MODIFY_PRIVATE,
    SPOTIFY_SCOPES.PLAYLIST_MODIFY_PUBLIC,
    SPOTIFY_SCOPES.UGC_IMAGE_UPLOAD,
  ];
  return `${SPOTIFY_ENDPOINTS.AUTHORIZE}?client_id=${
    process.env.REACT_APP_CLIENT_ID
  }&redirect_uri=${REDIRECT_URI}&scope=${scopes.join(
    "%20"
  )}&response_type=${RESPONSE_TYPE}&show_dialog=true`;
};

export default login;
