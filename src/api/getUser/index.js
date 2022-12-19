import axios from "axios";
import { SPOTIFY_ENDPOINTS } from "../constants";

const getUser = async (auth) => {
  const headers = { Authorization: `Bearer ${auth}` };

  try {
    const { data } = await axios.get(SPOTIFY_ENDPOINTS.GET_USER, {
      headers,
    });
    return data;
  } catch (error) {
    console.error(error);
  }
};

export default getUser;
