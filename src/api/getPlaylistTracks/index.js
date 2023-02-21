import axios from "axios";
import { SPOTIFY_ENDPOINTS } from "../constants";
import convertEndpointParams from "../../utils/convertEndpointParams";

const getPlaylistTracks = async (auth, playlistId) => {
  const headers = { Authorization: `Bearer ${auth}` };
  const params = { playlistId: playlistId, offset: 0, limit: 100 };
  const tracks = [];

  try {
    while (true) {
      const { data } = await axios.get(
        convertEndpointParams(SPOTIFY_ENDPOINTS.GET_PLAYLIST_TRACKS, params),
        {
          headers,
          params,
        }
      );
      const items = data.items;

      items.forEach((item) => {
        tracks.push(item.track);
      });

      if (data.next) {
        params.offset += params.limit;
      } else {
        break;
      }
    }
    return tracks;
  } catch (error) {
    console.error(error);
  }
};

export default getPlaylistTracks;
