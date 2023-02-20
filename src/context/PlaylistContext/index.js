import { createContext, useContext, useState } from "react";

const PlaylistContext = createContext(null);

export const PlaylistProvider = ({ children }) => {
  const [songList, setSongList] = useState([]);
  const [expanded, setExpanded] = useState(true);
  const [playlistTitle, setPlaylistTitle] = useState(null);
  const [playlistDescription, setPlaylistDescription] = useState(null);
  const [updatingPlaylist, setUpdatingPlaylist] = useState(false);
  const [addedSongList, setAddedSongList] = useState([]);
  const [removedSongList, setRemovedSongList] = useState([]);
  const [playlistId, setPlaylistId] = useState(null);

  const updateTitle = (title) => setPlaylistTitle(title);
  const updateDescription = (description) =>
    setPlaylistDescription(description);

  const addToPlaylist = (song) => setSongList((prev) => [...prev, song]);
  const removeFromPlaylist = (index) => {
    setSongList(songList.filter((song, i) => i !== index));
  };

  const addToExistingPlaylist = (song) =>
    setAddedSongList((prev) => [...prev, song]);
  const removeFromExistingPlaylist = (song) =>
    setRemovedSongList((prev) => [...prev, song]);

  const updatePlaylistFlag = (updatingPlaylist) =>
    setUpdatingPlaylist(updatingPlaylist);

  const updatePlaylistId = (playlistId) => setPlaylistId(playlistId);

  const clearPlaylist = () => setSongList([]);

  const clearUpdatedPlaylist = () => {
    setAddedSongList([]);
    setRemovedSongList([]);
  };

  return (
    <PlaylistContext.Provider
      value={{
        expanded,
        setExpanded,
        songList,
        setSongList,
        addedSongList,
        setAddedSongList,
        removedSongList,
        setRemovedSongList,
        playlistTitle,
        setPlaylistTitle,
        playlistDescription,
        setPlaylistDescription,
        addToPlaylist,
        updateTitle,
        updateDescription,
        removeFromPlaylist,
        updatingPlaylist,
        setUpdatingPlaylist,
        updatePlaylistFlag,
        playlistId,
        setPlaylistId,
        updatePlaylistId,
        addToExistingPlaylist,
        removeFromExistingPlaylist,
        clearPlaylist,
        clearUpdatedPlaylist,
      }}
    >
      {children}
    </PlaylistContext.Provider>
  );
};

export const usePlaylist = () => useContext(PlaylistContext);
