import { Primary } from "../../components/Buttons";
import { useEffect, useState } from "react";
import Playlist from "../../components/Playlist";
import SearchResults from "../../components/SearchResults";
import axios from "axios";

const REDIRECT_URI = "http://localhost:3000";
const AUTH_ENDPOINT = "https://accounts.spotify.com/authorize";
const RESPONSE_TYPE = "token";

const Home = () => {
  const [token, setToken] = useState("");

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
  };

  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);
  const [songs, setSongs] = useState([]);

  const handleSearch = async (e) => {
    e.preventDefault();
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

  return (
    <div className="flex flex-col items-center justify-center w-screen h-screen gap-10">
      {!token ? (
        <Primary
          option="Login to Spotify"
          link={`${AUTH_ENDPOINT}?client_id=${process.env.REACT_APP_CLIENT_ID}&redirect_uri=${REDIRECT_URI}&response_type=${RESPONSE_TYPE}`}
        />
      ) : (
        <Primary option="Logout" onClick={logout} />
      )}

      <div className="flex flex-col items-center justify-center p-4">
        <form onSubmit={handleSearch}>
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
      </div>

      <div className="flex flex-row items-center justify-center w-screen h-1/2 gap-10">
        <SearchResults results={results} addSong={addSong} />
        <Playlist songs={songs} removeSong={removeSong} />
      </div>
    </div>
  );
};

export default Home;
