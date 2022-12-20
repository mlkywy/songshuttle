import React from "react";
import { Trash } from "phosphor-react";

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
          className="w-full px-2 py-1 text-sm font-medium border-b border-secondary leading-tight placeholder-accent text-main focus:outline-none focus:shadow-outline bg-transparent"
        />
      </div>

      {songs.map((song, index) => (
        <div
          key={song.id}
          className="p-4 border-b border-secondary flex items-center justify-between"
        >
          <div className="flex items-center w-5/6">
            <img
              src={song.cover}
              alt={`Cover art for ${song.title}`}
              className="w-10 h-10 rounded-full mr-4"
            />
            <div className="flex flex-col">
              <div className="font-bold text-main text-sm mb-2">
                {song.title}
              </div>
              <div className="text-main text-xs font-medium">{song.artist}</div>
            </div>
          </div>
          <Trash
            size="1.5rem"
            className="text-highlight hover:text-main cursor-pointer"
            onClick={() => removeSong(index)}
          />
        </div>
      ))}
    </div>
  );
};

export default Playlist;
