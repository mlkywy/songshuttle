import { Primary } from "../../components/Buttons";
import { useEffect, useState } from "react";
import Playlist from "../../components/Playlist";
import SearchResults from "../../components/SearchResults";

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

  const [songs, setSongs] = useState([]);

  const addSong = (title, artist) => {
    setSongs([...songs, { title, artist }]);
  };

  const removeSong = (index) => {
    setSongs(songs.filter((song, i) => i !== index));
  };

  const [results, setResults] = useState([]);

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

      <Primary
        option="Add Song"
        onClick={() => addSong("Song Title", "Song Artist")}
      />

      <Primary
        option="Get Results"
        onClick={() =>
          setResults([
            {
              title: "Song Title",
              artist: "Song Artist",
              cover: "https://example.com/cover.jpg",
            },
          ])
        }
      />

      <div className="flex flex-row items-center justify-center w-screen h-1/2 gap-10">
        <SearchResults results={results} />
        <Playlist songs={songs} removeSong={removeSong} />
      </div>
    </div>
  );
};

export default Home;
