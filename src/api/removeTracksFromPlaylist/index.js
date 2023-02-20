import axios from "axios";
import { SPOTIFY_ENDPOINTS } from "../constants";
import convertEndpointParams from "../../utils/convertEndpointParams";

const removeTracksFromPlaylist = async (auth, playlistId, songIds) => {
  const headers = { Authorization: `Bearer ${auth}` };
  const params = { playlistId: playlistId };

  console.log(auth, playlistId, songIds);

  try {
    const { data } = await axios.delete(
      convertEndpointParams(
        SPOTIFY_ENDPOINTS.REMOVE_TRACKS_FROM_PLAYLIST,
        params
      ),
      {
        headers,
        data: { uris: songIds },
      }
    );
    return data;
  } catch (error) {
    console.error(error);
  }
};

export default removeTracksFromPlaylist;
