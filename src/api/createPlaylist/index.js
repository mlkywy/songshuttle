import axios from "axios";
import { SPOTIFY_ENDPOINTS } from "../constants";
import convertEndpointParams from "../../utils/convertEndpointParams";

const createPlaylist = async (userId, auth, title, description, visibility) => {
  const headers = { Authorization: `Bearer ${auth}` };
  const params = { userId: userId };

  try {
    const { data } = await axios.post(
      convertEndpointParams(SPOTIFY_ENDPOINTS.CREATE_PLAYLIST, params),
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

export default createPlaylist;
