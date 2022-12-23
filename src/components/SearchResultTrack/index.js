import React from "react";
import { animated } from "react-spring";
import {
  MusicNotesPlus,
  PlayCircle,
  PauseCircle,
  StopCircle,
} from "phosphor-react";

import { usePlaylist } from "../../context/PlaylistContext";

const Track = ({ song, style, toggle, resetAudio, isPlaying }) => {
  const { album, name, artists } = song;
  const { addToPlaylist } = usePlaylist();

  return (
    <animated.div
      style={style}
      className="p-4 border-b border-secondary flex items-center justify-between"
    >
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

      <div className="flex flex-row gap-3">
        {!isPlaying ? (
          <PlayCircle
            size="1.5rem"
            className="text-highlight hover:text-main cursor-pointer"
            onClick={() => toggle()}
          />
        ) : (
          <PauseCircle
            size="1.5rem"
            className="text-main hover:text-highlight cursor-pointer"
            onClick={() => toggle()}
          />
        )}
        <StopCircle
          size="1.5rem"
          className="text-highlight hover:text-main cursor-pointer"
          onClick={() => resetAudio()}
        />
        <MusicNotesPlus
          size="1.5rem"
          className="text-highlight hover:text-main cursor-pointer"
          onClick={() => addToPlaylist(song)}
        />
      </div>
    </animated.div>
  );
};

export default Track;