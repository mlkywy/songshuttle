import React, { useState, useEffect, useMemo } from "react";
import { MusicNotesPlus, PlayCircle, StopCircle } from "phosphor-react";

const Track = ({ song, addSong }) => {
  console.log(song);
  const { id, name, artists, album, preview_url } = song;
  const [isPlaying, setIsPlaying] = useState(false);
  const songAudio = useMemo(() => new Audio(preview_url), [preview_url]);

  const handlePlay = () => {
    setIsPlaying(true);
    songAudio?.play();

    songAudio.addEventListener("ended", (event) => {
      setIsPlaying(false);
    });
  };

  const handleStop = () => {
    setIsPlaying(false);
    songAudio.currentTime = "0";
    songAudio?.pause();
  };

  return (
    <div className="p-4 border-b border-secondary flex items-center justify-between">
      <div className="flex items-center w-5/6">
        <img
          src={album?.images[0]?.url}
          alt=""
          className="w-10 h-10 rounded-full mr-4"
        />
        <div className="flex flex-col">
          <div className="font-bold text-main text-sm mb-2">{name}</div>
          <div className="text-main text-xs font-medium">
            {artists[0]?.name}
          </div>
        </div>
      </div>

      {!isPlaying ? (
        <PlayCircle
          size="1.5rem"
          className="text-highlight hover:text-main cursor-pointer"
          onClick={() => handlePlay()}
        />
      ) : (
        <StopCircle
          size="1.5rem"
          className="text-highlight hover:text-main cursor-pointer"
          onClick={() => handleStop()}
        />
      )}
      <MusicNotesPlus
        size="1.5rem"
        className="text-highlight hover:text-main cursor-pointer"
        onClick={() => addSong(song)}
      />
    </div>
  );
};

export default Track;
