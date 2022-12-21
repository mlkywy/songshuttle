import React from "react";
import PlaylistTrack from "../PlaylistTrack";

const Playlist = ({ songs, removeSong, setTitle, setDescription }) => {
  return (
    <div className="overflow-y-auto w-1/4 h-full bg-primary rounded-lg shadow-lg">
      <div className="p-4 gap-2 flex flex-col items-center justify-between">
        <input
          type="text"
          placeholder="enter playlist title..."
          onChange={(e) => setTitle(e.target.value)}
          className="w-full px-2 py-1 text-lg font-medium leading-tight placeholder-accent text-main focus:outline-none focus:shadow-outline bg-transparent"
        />
        <textarea
          type="text"
          placeholder="enter playlist description..."
          onChange={(e) => setDescription(e.target.value)}
          className="w-full px-2 py-1 text-sm font-medium leading-tight placeholder-accent text-main focus:outline-none focus:shadow-outline bg-transparent"
        />
      </div>

      {songs.map((song, index) => (
        <PlaylistTrack
          key={song.id}
          song={song}
          index={index}
          removeSong={removeSong}
        />
      ))}
    </div>
  );
};

export default Playlist;
