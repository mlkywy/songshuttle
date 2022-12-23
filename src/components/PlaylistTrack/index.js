import React from "react";
import { Trash, Sparkle } from "phosphor-react";
import { usePlaylist } from "../../context/PlaylistContext";

const PlaylistTrack = ({ song, index, handleRecs }) => {
  const cover = song?.album.images[0].url;
  const title = song?.name;
  const artist = song?.artists[0]?.name;
  const { removeFromPlaylist } = usePlaylist();

  return (
    <div className="p-4 border-b border-secondary flex items-center justify-between gap-2">
      <div className="flex items-center w-5/6">
        <img src={cover} alt="" className="w-10 h-10 rounded-full mr-4" />
        <div className="flex flex-col">
          <div className="font-bold text-main text-sm mb-2">{title}</div>
          <div className="text-main text-xs font-medium">{artist}</div>
        </div>
      </div>

      <div className="flex flex-row gap-3">
        <Sparkle
          size="1.5rem"
          className="text-highlight hover:text-main cursor-pointer"
          onClick={() => handleRecs(song.id)}
        />
        <Trash
          size="1.5rem"
          className="text-highlight hover:text-main cursor-pointer"
          onClick={() => removeFromPlaylist(index)}
        />
      </div>
    </div>
  );
};

export default PlaylistTrack;