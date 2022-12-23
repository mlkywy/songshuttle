import { createContext, useContext, useState } from "react";
// import PlaylistTrack from "../../components/PlaylistTrack";

const PlaylistContext = createContext(null);

export const PlaylistProvider = ({ children }) => {
  const [songList, setSongList] = useState([]);
  const [expanded, setExpanded] = useState(true);
  const [playlistTitle, setPlaylistTitle] = useState(null);
  const [playlistDescription, setPlaylistDescription] = useState(null);

  const updateTitle = (title) => setPlaylistTitle(title);
  const addToPlaylist = (song) => setSongList((prev) => [...prev, song]);

  const removeFromPlaylist = (index) => {
    setSongList(songList.filter((song, i) => i !== index));
  };

  return (
    <PlaylistContext.Provider
      value={{
        expanded,
        setExpanded,
        songList,
        playlistTitle,
        setPlaylistTitle,
        playlistDescription,
        setPlaylistDescription,
        addToPlaylist,
        updateTitle,
        removeFromPlaylist,
      }}
    >
      {children}
      {/* <div
        id="playlist"
        className={`absolute flex flex-col overflow-y-auto gap-2 grow bottom-24 rounded-xl shadow-2xl p-4 right-8 ${
          expanded ? "h-96" : "h-20"
        } w-1/4 bg-accent text-main transition-all`}
      >
        <div className="border-b flex flex-row justify-between px-4 pb-2 border-primary">
          <p>{playlistTitle}</p>
          <button onClick={() => setExpanded(!expanded)}>
            {expanded ? "close" : "expand"}
          </button>
        </div>
        {expanded ? (
          songList.map((song, index) => (
            <PlaylistTrack key={index} song={song} index={index} />
          ))
        ) : (
          <></>
        )}
      </div> */}
    </PlaylistContext.Provider>
  );
};

export const usePlaylist = () => useContext(PlaylistContext);
