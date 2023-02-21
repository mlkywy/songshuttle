import axios from "axios";
import { SPOTIFY_ENDPOINTS } from "../constants";
import convertEndpointParams from "../../utils/convertEndpointParams";
import getPlaylistTracks from "../getPlaylistTracks";

const removeTracksFromPlaylist = async (auth, playlistId, songUris) => {
  const headers = { Authorization: `Bearer ${auth}` };
  const params = { playlistId: playlistId };
  const tracks = [];

  try {
    // Get the position of each track within the playlist
    const allTracks = await getPlaylistTracks(auth, playlistId);

    // Find the position of each track within the playlist
    for (const uri of songUris) {
      const positions = [];
      const uriOccurrences = songUris.filter((u) => u === uri).length;
      for (const [i, track] of allTracks.entries()) {
        if (track.uri === uri) {
          positions.push(i);
          if (positions.length === uriOccurrences) break;
        }
      }
      tracks.push({ uri, positions });
    }

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
