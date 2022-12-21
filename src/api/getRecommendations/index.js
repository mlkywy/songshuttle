import axios from "axios";
import { SPOTIFY_ENDPOINTS } from "../constants";

const getRecommendations = async (auth, songId) => {
  const headers = { Authorization: `Bearer ${auth}` };
  const params = { seed_tracks: songId, limit: 20 };

  try {
    const { data } = await axios.get(SPOTIFY_ENDPOINTS.GET_RECOMMENDATIONS, {
      headers,
      params,
    });
    return data;
  } catch (error) {
    console.error(error);
  }
};

export default getRecommendations;
