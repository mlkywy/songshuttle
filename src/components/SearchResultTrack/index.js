import React, { useState, useMemo } from "react";
import {
  MusicNotesPlus,
  PlayCircle,
  PauseCircle,
  StopCircle,
} from "phosphor-react";

const Track = ({ song, addSong }) => {
  console.log(song);

  const { id, album, name, artists, preview_url } = song;
  const [isPlaying, setIsPlaying] = useState(false);
  const songAudio = useMemo(() => new Audio(preview_url), [preview_url]);

  const handlePlay = () => {
    setIsPlaying(true);
    songAudio.volume = 0.5;
    songAudio?.play();

    songAudio.addEventListener("ended", (event) => {
      setIsPlaying(false);
    });
  };

  const handlePause = () => {
    setIsPlaying(false);
    songAudio?.pause();
  };

  const handleStop = () => {
    setIsPlaying(false);
    songAudio.currentTime = "0";
    songAudio?.pause();
  };

  return (
    <div className="p-4 border-b border-secondary flex items-center justify-between gap-2">
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
        <PauseCircle
          size="1.5rem"
          className="text-main hover:text-highlight cursor-pointer"
          onClick={() => handlePause()}
        />
      )}
      <StopCircle
        size="1.5rem"
        className="text-highlight hover:text-main cursor-pointer"
        onClick={() => handleStop()}
      />
      <MusicNotesPlus
        size="1.5rem"
        className="text-highlight hover:text-main cursor-pointer"
        onClick={() =>
          addSong(id, artists[0].id, album.images[0].url, name, artists[0].name)
        }
      />
    </div>
  );
};

export default Track;
