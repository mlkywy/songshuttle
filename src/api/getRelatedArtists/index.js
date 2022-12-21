import axios from "axios";
import { SPOTIFY_ENDPOINTS } from "../constants";
import convertEndpointParams from "../../utils/convertEndpointParams";

const getRelatedArtists = async (auth, artistId) => {
  const headers = { Authorization: `Bearer ${auth}` };
  const params = { artistId: artistId };

  try {
    const { data } = await axios.get(
      convertEndpointParams(SPOTIFY_ENDPOINTS.GET_RELATED_ARTISTS, params),
      {
        headers,
      }
    );
    return data;
  } catch (error) {
    console.error(error);
  }
};

export default getRelatedArtists;
