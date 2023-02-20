import axios from "axios";
import { SPOTIFY_ENDPOINTS } from "../constants";
import convertEndpointParams from "../../utils/convertEndpointParams";
import getPlaylistTracks from "../getPlaylistTracks";

const removeTracksFromPlaylist = async (auth, playlistId, uris) => {
  const headers = { Authorization: `Bearer ${auth}` };
  const params = { playlistId: playlistId };
  const trackPositions = [];
  const tracks = [];

  try {
    // Get the position of each track within the playlist
    const allTracks = await getPlaylistTracks(auth, playlistId);

    // Find the position of each track within the playlist
    for (const uri of uris) {
      const positions = [];
      const uriOccurrences = uris.filter((u) => u === uri).length;
      for (
        let i = 0;
        i < allTracks.length && positions.length < uriOccurrences;
        i++
      ) {
        if (allTracks[i].uri === uri) {
          positions.push(i);
        }
      }
      tracks.push({ uri, positions });
    }

    console.log(tracks);

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
    console.log(data);
    return data;
  } catch (error) {
    console.error(error);
  }
};

export default removeTracksFromPlaylist;
