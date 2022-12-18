import React, { useState } from "react";
import { Trash } from "phosphor-react";

const Playlist = ({ songs, removeSong, setTitle, setDescription }) => {
  return (
    <div className="overflow-y-auto w-1/4 h-full bg-white rounded-lg shadow-lg">
      <div className="p-4 gap-2 flex flex-col items-center justify-between">
        <input
          type="text"
          placeholder="Enter playlist title"
          onChange={(e) => setTitle(e.target.value)}
          className="w-full px-2 py-1 text-lg leading-tight text-gray-700 focus:outline-none focus:shadow-outline"
        />
        <textarea
          type="text"
          placeholder="Enter playlist description"
          onChange={(e) => setDescription(e.target.value)}
          className="w-full px-2 py-1 text-sm leading-tight text-gray-700 focus:outline-none focus:shadow-outline"
        />
      </div>

      {songs.map((song, index) => (
        <div
          key={song.id}
          className="p-4 border-b border-gray-200 flex items-center justify-between"
        >
          <div className="flex items-center">
            <img
              src={song.cover}
              alt={`Cover art for ${song.title}`}
              className="w-10 h-10 rounded-full mr-4"
            />
            <div className="flex flex-col">
              <div className="font-bold text-sm mb-2">{song.songId}</div>
              <div className="font-bold text-sm mb-2">{song.title}</div>
              <div className="text-gray-700 text-xs">{song.artist}</div>
            </div>
          </div>
          <Trash
            size="1.5rem"
            className="text-gray-600 hover:text-gray-800 cursor-pointer"
            onClick={() => removeSong(index)}
          />
        </div>
      ))}
    </div>
  );
};

export default Playlist;
