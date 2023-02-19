import axios from "axios";
import { SPOTIFY_ENDPOINTS } from "../constants";

const getUsersPlaylists = async (auth) => {
  const headers = { Authorization: `Bearer ${auth}` };
  const params = { offset: 0, limit: 50 };

  try {
    const { data } = await axios.get(SPOTIFY_ENDPOINTS.GET_USERS_PLAYLISTS, {
      headers,
      params,
    });
    return data;
  } catch (error) {
    console.error(error);
  }
};

export default getUsersPlaylists;
