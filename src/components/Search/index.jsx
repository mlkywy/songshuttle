import React from "react";
import { MagnifyingGlass } from "phosphor-react";

import SearchResults from "../SearchResults";
// import useAudio from "../../hooks/useAudio";
import { useAudio } from "../../context/AudioContext";
import { useSearch } from "../../context/SearchContext";

const Search = () => {
  const { input, setInput, isFocus, setIsFocus, isFetched, isLoading, tracks } =
    useSearch();

  const { playing, toggle, updateSource, currentTrack, resetAudio } =
    useAudio();

  const handleChange = (e) => {
    setInput(e.target.value);
    resetAudio();
  };

  return (
    <div className="w-3/4 flex flex-col items-center gap-6">
      <div className="grow w-full relative flex flex-row gap-2">
        <input
          className="flex relative mx-auto px-5 py-3 w-4/5 rounded focus:outline-none bg-accent placeholder-primary text-main text-md font-medium focus:w-full
      transition-all"
          type="text"
          placeholder="search for songs..."
          value={input}
          onChange={(e) => handleChange(e)}
          onFocus={() => setIsFocus(true)}
          onBlur={() => setIsFocus(false)}
        />
        <MagnifyingGlass
          className={`transition-all absolute w-18 text-main text-xl font-bold top-3.5 ${
            isFocus ? "left-[95%]" : "left-[85%]"
          }`}
        />{" "}
      </div>
      <div className="w-full">
        {input ? (
          <SearchResults
            isLoading={!isFetched || isLoading}
            results={tracks}
            addSong={() => {}}
            playing={playing}
            toggle={toggle}
            resetAudio={resetAudio}
            updateSource={updateSource}
            currentTrack={currentTrack}
          />
        ) : (
          <></>
        )}
      </div>
    </div>
  );
};

export default Search;
