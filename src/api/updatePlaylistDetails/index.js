import axios from "axios";
import { SPOTIFY_ENDPOINTS } from "../constants";
import convertEndpointParams from "../../utils/convertEndpointParams";

const updatePlaylistDetails = async (
  auth,
  playlistId,
  title,
  description,
  visibility
) => {
  const headers = { Authorization: `Bearer ${auth}` };
  const params = { playlistId: playlistId };

  try {
    const { data } = await axios.put(
      convertEndpointParams(SPOTIFY_ENDPOINTS.UPDATE_PLAYLIST_DETAILS, params),
      {
        name: title,
        description: description,
        public: visibility,
      },
      {
        headers,
      }
    );
    return data;
  } catch (error) {
    console.error(error);
  }
};

export default updatePlaylistDetails;
