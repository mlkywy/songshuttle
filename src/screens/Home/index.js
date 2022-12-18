import { Primary, NavLink } from "../../components/Buttons";
import { useEffect, useState } from "react";
import Playlist from "../../components/Playlist";
import SearchResults from "../../components/SearchResults";
import axios from "axios";

const REDIRECT_URI = "http://localhost:3000";
const AUTH_ENDPOINT = "https://accounts.spotify.com/authorize";
const RESPONSE_TYPE = "token";

const Home = () => {
  const [token, setToken] = useState("");
  const scopes = ["playlist-modify-private", "playlist-modify-public"];

  useEffect(() => {
    const hash = window.location.hash;
    let token = window.localStorage.getItem("token");

    if (!token && hash) {
      token = hash
        .substring(1)
        .split("&")
        .find((elem) => elem.startsWith("access_token"))
        .split("=")[1];

      window.location.hash = "";
      window.localStorage.setItem("token", token);
    }

    setToken(token);
  }, []);

  const logout = () => {
    setToken("");
    window.localStorage.removeItem("token");
    handleSearch();
  };

  const getUserId = async () => {
    try {
      const response = await axios.get("https://api.spotify.com/v1/me", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      return response.data.id;
    } catch (error) {
      console.error(error);
    }
  };

  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);
  const [songs, setSongs] = useState([]);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [visibility, setVisibility] = useState(false);

  const handleSearch = async (e) => {
    e.preventDefault();

    if (!token) {
      setQuery("");
      setResults([]);
      return;
    }

    const { data } = await axios.get("https://api.spotify.com/v1/search", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
      params: {
        q: query,
        type: "track",
      },
    });

    console.log(data.tracks.items);
    setResults(data.tracks.items);
  };

  const addSong = (songId, cover, title, artist) => {
    setSongs([...songs, { songId, cover, title, artist }]);
  };

  const removeSong = (index) => {
    setSongs(songs.filter((song, i) => i !== index));
  };

  const createPlaylist = async (title, description, songIds, visibility) => {
    if (title == null || songIds.length == 0 || visibility == false) {
      console.log(
        "Make sure the title field is not empty and include at least one song!"
      );
      return;
    }

    const user_id = await getUserId();

    try {
      const response = await axios.post(
        `https://api.spotify.com/v1/users/${user_id}/playlists`,
        {
          name: title,
          description: description,
          public: visibility,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const playlistId = response.data.id;

      // Add songs to the playlist
      await axios.post(
        `https://api.spotify.com/v1/playlists/${playlistId}/tracks`,
        {
          uris: songIds,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      console.log(title, description, songIds, user_id, response, visibility);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center w-screen h-screen gap-10">
      {!token ? (
        <Primary
          option="Login to Spotify"
          link={`${AUTH_ENDPOINT}?client_id=${
            process.env.REACT_APP_CLIENT_ID
          }&redirect_uri=${REDIRECT_URI}&scope=${scopes.join(
            "%20"
          )}&response_type=${RESPONSE_TYPE}`}
        />
      ) : (
        <Primary option="Logout of Spotify" onClick={logout} />
      )}

      <div className="flex flex-row items-center w-1/2 justify-between gap-5">
        <form onSubmit={handleSearch} className="flex-1 mr-4">
          <input
            className="border rounded p-2"
            type="text"
            placeholder="Search for songs..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
          <button
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
            type="submit"
          >
            Search
          </button>
        </form>

        <button
          className="px-4 py-2 text-sm font-medium text-white bg-indigo-500 border-0 rounded-full focus:outline-none focus:shadow-outline"
          onClick={() => {
            setVisibility(!visibility);
          }}
        >
          {visibility ? "Show on profile" : "Don't show on profile"}
        </button>

        <NavLink
          option="Create playlist"
          onClick={() =>
            createPlaylist(
              title,
              description,
              songs.map((song) => `spotify:track:${song.songId}`),
              visibility
            )
          }
        />
      </div>

      <div className="flex flex-row items-center justify-center w-screen h-1/2 gap-10">
        <SearchResults results={results} addSong={addSong} />
        <Playlist
          songs={songs}
          removeSong={removeSong}
          setTitle={setTitle}
          setDescription={setDescription}
        />
      </div>
    </div>
  );
};

export default Home;
