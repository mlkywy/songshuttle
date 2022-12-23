import axios from "axios";
import { SPOTIFY_ENDPOINTS } from "../constants";

const getTracks = async (query, auth) => {
  const headers = { Authorization: `Bearer ${auth}` };
  const params = { q: query, type: "track" };

  try {
    const { data } = await axios.get(SPOTIFY_ENDPOINTS.GET_TRACKS, {
      headers,
      params,
    });
    return data;
  } catch (error) {
    console.error(error);
  }
};

export default getTracks;
