import React from "react";

const Playlist = ({ songs, removeSong }) => {
  return (
    <div className="overflow-y-auto w-1/4 h-full bg-white rounded-lg shadow-lg">
      {songs.map((song, index) => (
        <div key={song.id} className="p-4 border-b border-gray-200">
          <div className="font-bold text-sm mb-2">{song.title}</div>
          <div className="text-gray-700 text-xs">{song.artist}</div>
          <button className="text-xs" onClick={() => removeSong(index)}>
            remove
          </button>
        </div>
      ))}
    </div>
  );
};

export default Playlist;
