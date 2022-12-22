import React, { useMemo } from "react";
import SearchResultTrack from "../SearchResultTrack";
import { useTransition } from "react-spring";
import useAudio from "../../hooks/useAudio";
import { usePlaylist } from "../../context/PlaylistContext";

const TrackPlaceholder = () => (
  <div className="p-4 border-b border-secondary flex items-center justify-between animate-pulse">
    <div className="flex items-center w-5/6">
      <div className="w-11 h-11 rounded-full mr-4 bg-accent"></div>
      <div className="flex flex-col">
        <div className="w-36 h-2 mb-2 rounded-full bg-accent"></div>
        <div className="w-13 h-2 rounded-full bg-accent"></div>
      </div>
    </div>
    <div className="flex flex-row gap-3">
      <div className="w-6 h-6 rounded-full bg-accent"></div>
      <div className="w-6 h-6 rounded-full bg-accent"></div>
      <div className="w-6 h-6 rounded-lg bg-accent"></div>
    </div>
  </div>
);

const SearchLoader = ({ amount }) => {
  const placeholders = new Array(amount ?? 8).fill(true, 0, amount ?? 8);

  return (
    <div className="overflow-y-auto w-full h-96 bg-primary rounded-lg shadow-lg transition-all">
      {placeholders.map((v, i) => (
        <TrackPlaceholder key={`placeholder-${i}`} />
      ))}
    </div>
  );
};

const SearchResults = ({ results, addSong, isLoading }) => {
  const { songList } = usePlaylist();
  const { playing, toggle, resetAudio, updateSource, currentTrack } =
    useAudio();
  const transitions = useTransition(results, {
    from: { opacity: 0, transform: "translateX(100%, 0, 0)" },
    enter: { opacity: 1, transform: "translateX(0%, 0, 0" },
    leave: { opacity: 1 },
  });

  console.log("SONG LIST", songList);

  if (isLoading) {
    return <SearchLoader amount={8} />;
  }

  return (
    <div className="flex flex-col overflow-y-auto w-full h-96 bg-primary rounded-lg shadow-lg transition-all">
      {transitions((style, item) => (
        <SearchResultTrack
          style={style}
          key={item.id}
          song={item}
          addSong={addSong}
          isPlaying={currentTrack === item.id && playing}
          toggle={() =>
            currentTrack === item.id
              ? toggle()
              : updateSource(item.preview_url, item.id)
          }
          resetAudio={resetAudio}
        />
      ))}
    </div>
  );
};

export default SearchResults;
