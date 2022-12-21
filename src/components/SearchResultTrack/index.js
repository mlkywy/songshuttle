import React, { useState, useMemo } from 'react';
import {
  MusicNotesPlus,
  PlayCircle,
  PauseCircle,
  StopCircle,
} from 'phosphor-react';
import { animated } from 'react-spring';
import { usePlaylist } from '../../context/PlaylistContext';

const Track = ({ song, style, toggle, isPlaying }) => {
  const { id, album, name, artists, preview_url } = song;
  const { addToPlaylist } = usePlaylist();
  const songAudio = useMemo(() => new Audio(preview_url), [preview_url]);

  return (
    <animated.div
      style={style}
      className="p-4 border-b border-secondary flex items-center justify-between gap-2"
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
      {/* <StopCircle
        size="1.5rem"
        className="text-highlight hover:text-main cursor-pointer"
        onClick={() => handleStop()}
      /> */}
      <MusicNotesPlus
        size="1.5rem"
        className="text-highlight hover:text-main cursor-pointer"
        onClick={() => addToPlaylist(song)}
      />
    </animated.div>
  );
};

export default Track;
