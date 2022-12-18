import axios from "axios";
import { SPOTIFY_ENDPOINTS } from "../constants";
import convertEndpointParams from "../../utils/convertEndpointParams";

const addTracksToPlaylist = async (auth, playlistId, songIds) => {
  const headers = { Authorization: `Bearer ${auth}` };
  const params = { playlistId: playlistId };

  try {
    const { data } = await axios.post(
      convertEndpointParams(SPOTIFY_ENDPOINTS.ADD_TRACKS_TO_PLAYLIST, params),
      {
        uris: songIds,
      },
      {
        headers,
        params,
      }
    );
    return data;
  } catch (error) {
    console.error(error);
  }
};

export default addTracksToPlaylist;
