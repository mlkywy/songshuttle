import axios from "axios";
import { SPOTIFY_ENDPOINTS } from "../constants";
import convertEndpointParams from "../../utils/convertEndpointParams";
import getPlaylistTracks from "../getPlaylistTracks";

const removeTracksFromPlaylist = async (auth, playlistId, uris) => {
  const headers = { Authorization: `Bearer ${auth}` };
  const params = { playlistId: playlistId };
  const tracks = [];

  try {
    // Get the position of each track within the playlist
    const allTracks = await getPlaylistTracks(auth, playlistId);

    // Find the position of each track within the playlist
    allTracks.forEach((item, index) => {
      const uri = item.uri;
      if (uris.includes(uri)) {
        let trackToDelete = {
          uri: uri,
          positions: [index],
        };

        // If this track has not already been added to the tracks array, add it
        if (!tracks.some((track) => track.uri === uri)) {
          tracks.push(trackToDelete);
        }
      }
    });

    // Send the request to remove the tracks by their position
    const { data } = await axios.delete(
      convertEndpointParams(
        SPOTIFY_ENDPOINTS.REMOVE_TRACKS_FROM_PLAYLIST,
        params
      ),
      {
        headers,
        data: { tracks },
      }
    );
    return data;
  } catch (error) {
    console.error(error);
  }
};

export default removeTracksFromPlaylist;
