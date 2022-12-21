import React from "react";
import { Trash } from "phosphor-react";

const PlaylistTrack = ({ song, removeSong, index }) => {
  const { id, cover, title, artist } = song;

  return (
    <div className="p-4 border-b border-secondary flex items-center justify-between gap-2">
      <div className="flex items-center w-5/6">
        <img src={cover} alt="" className="w-10 h-10 rounded-full mr-4" />
        <div className="flex flex-col">
          <div className="font-bold text-main text-sm mb-2">{title}</div>
          <div className="text-main text-xs font-medium">{artist}</div>
        </div>
      </div>

      <Trash
        size="1.5rem"
        className="text-highlight hover:text-main cursor-pointer"
        onClick={() => removeSong(index)}
      />
    </div>
  );
};

export default PlaylistTrack;
