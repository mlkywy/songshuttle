import axios from "axios";
import { SPOTIFY_ENDPOINTS } from "../constants";
import convertEndpointParams from "../../utils/convertEndpointParams";

const addCustomPlaylistCover = async (auth, playlistId, img) => {
  const headers = {
    Authorization: `Bearer ${auth}`,
    "Content-Type": "image/jpeg",
  };

  const params = { playlistId: playlistId };

  try {
    const { data } = await axios.put(
      convertEndpointParams(
        SPOTIFY_ENDPOINTS.ADD_CUSTOM_PLAYLIST_COVER,
        params
      ),
      img,
      {
        headers,
      }
    );
    return data;
  } catch (error) {
    console.error(error);
  }
};

export default addCustomPlaylistCover;
