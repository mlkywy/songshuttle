import { createContext, useContext, useState } from "react";

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
    </PlaylistContext.Provider>
  );
};

export const usePlaylist = () => useContext(PlaylistContext);
