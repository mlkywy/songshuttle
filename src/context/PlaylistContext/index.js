import { createContext, useContext, useState } from 'react';
import PlaylistTrack from '../../components/PlaylistTrack';

const PlaylistContext = createContext(null);

export const PlaylistProvider = ({ children }) => {
  const [songList, setSongList] = useState([]);
  const [expanded, setExpanded] = useState(true);
  const [playlistTitle, setPlaylistTitle] = useState('Untitled Playlist');

  const updateTitle = (title) => setPlaylistTitle(title);
  const addToPlaylist = (song) => setSongList((prev) => [...prev, song]);

  return (
    <PlaylistContext.Provider
      value={{
        songList,
        addToPlaylist,
        updateTitle,
      }}
    >
      {children}
      <div
        id="playlist"
        className={`absolute flex flex-col overflow-y-auto gap-2 grow bottom-24 rounded-xl shadow-2xl p-4 right-8 ${
          expanded ? 'h-96' : 'h-20'
        } w-96 bg-accent text-main transition-all`}
      >
        <div className="border-b flex flex-row justify-between px-4 pb-2 border-primary">
          <p>{playlistTitle}</p>
          <button onClick={() => setExpanded(!expanded)}>
            {expanded ? 'close' : 'expand'}
          </button>
        </div>
        {expanded ? (
          songList.map((song) => <PlaylistTrack key={song.id} song={song} />)
        ) : (
          <></>
        )}
      </div>
    </PlaylistContext.Provider>
  );
};

export const usePlaylist = () => useContext(PlaylistContext);
