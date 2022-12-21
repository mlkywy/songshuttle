import { useState } from "react";
import { MagnifyingGlass, Square, CheckSquare } from "phosphor-react";

// Components
import { Secondary } from "../../components/Buttons";
import Playlist from "../../components/Playlist";
import SearchResults from "../../components/SearchResults";

// API
import getTracks from "../../api/getTracks";
import createPlaylist from "../../api/createPlaylist";
import addTracksToPlaylist from "../../api/addTracksToPlaylist";
import getRecommendations from "../../api/getRecommendations";

// Hooks
import useUser from "../../hooks/useUser";

const Home = () => {
  const { userId, token } = useUser();
  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);
  const [songs, setSongs] = useState([]);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [visibility, setVisibility] = useState(false);

  const addSong = (songId, artistId, cover, title, artist) => {
    setSongs([...songs, { songId, artistId, cover, title, artist }]);
  };

  const removeSong = (index) => {
    setSongs(songs.filter((song, i) => i !== index));
  };

  const handleSearch = async (e) => {
    e.preventDefault();

    if (query === "") {
      setResults([]);
      return;
    }

    if (!token) {
      setQuery("");
      setResults([]);
      return;
    }

    const data = await getTracks(query, token);
    const tracks = data.tracks.items;

    setResults(tracks);
  };

  const handleCreatePlaylist = async (
    title,
    description,
    songIds,
    visibility
  ) => {
    if (title === null || songIds.length === 0) {
      console.log(
        "Make sure the title field is not empty and include at least one song!"
      );
      return;
    }

    // Create new playlist
    const data = await createPlaylist(
      userId,
      token,
      title,
      description,
      visibility
    );

    const playlistId = data.id;

    // Add songs to the playlist
    await addTracksToPlaylist(token, playlistId, songIds);
  };

  const handleRecs = async (songId) => {
    setQuery("");
    setResults([]);

    const data = await getRecommendations(token, songId);
    const tracks = data.tracks;

    setResults(tracks);
  };

  return (
    <div className="flex flex-col items-center justify-center w-screen h-screen gap-10">
      <div className="flex flex-row items-center w-1/2 justify-between">
        <form onSubmit={handleSearch} className="flex">
          <input
            className="flex px-5 py-3 rounded focus:outline-none bg-accent placeholder-primary text-main font-medium"
            type="text"
            placeholder="search for songs..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
          <button
            className="bg-primary hover:bg-accent text-highlight hover:text-main font-bold p-3 rounded-full ml-5"
            type="submit"
          >
            <MagnifyingGlass size="1.5rem" />
          </button>
        </form>

        <div className="flex flex-row gap-5">
          <button
            className="px-5 py-3 text-sm font-medium text-highlight hover:text-main bg-primary hover:bg-accent border-0 rounded-full focus:outline-none focus:shadow-outline flex flex-row gap-2 justify-center items-center"
            onClick={() => {
              setVisibility(!visibility);
            }}
          >
            {visibility ? (
              <CheckSquare size="1.5rem" />
            ) : (
              <Square size="1.5rem" />
            )}
            show on profile
          </button>

          <Secondary
            option="create playlist"
            onClick={() =>
              handleCreatePlaylist(
                title,
                description,
                songs.map((song) => `spotify:track:${song.songId}`),
                visibility
              )
            }
          />
        </div>
      </div>

      <div className="flex flex-row items-center justify-center w-screen h-1/2 gap-10">
        <SearchResults results={results} addSong={addSong} />
        <Playlist
          songs={songs}
          removeSong={removeSong}
          setTitle={setTitle}
          setDescription={setDescription}
          handleRecs={handleRecs}
        />
      </div>
    </div>
  );
};

export default Home;
