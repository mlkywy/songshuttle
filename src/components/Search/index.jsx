import React, { startTransition, useEffect, useState } from "react";
import { MagnifyingGlass } from "phosphor-react";
import { useQuery } from "react-query";
import useUser from "../../hooks/useUser";
import getTracks from "../../api/getTracks";
import SearchResults from "../SearchResults";

const Search = () => {
  const [input, setInput] = useState("");
  const [query, setQuery] = useState("");
  const [isFocus, setIsFocus] = useState(false);
  const { token } = useUser();
  const { isFetched, isLoading, data } = useQuery(
    ["playlist", query],
    () => getTracks(query, token),
    {
      enabled: !!token || !!query,
    }
  );
  const [tracks, setTracks] = useState(data?.tracks?.items);

  useEffect(() => {
    if (input) {
      startTransition(() => {
        setQuery(input);
      });
    }

    if (!input) {
      startTransition(() => {
        setTracks(() => []);
      });
    }

    if (data?.tracks?.items && input) {
      setTracks(() => data?.tracks?.items);
    }
  }, [input, query, data]);

  return (
    <div className="w-1/3 flex flex-col items-center gap-6">
      <div className="grow w-full relative flex flex-row gap-2">
        <input
          className="flex relative mx-auto px-5 py-3 w-4/5 rounded focus:outline-none bg-accent placeholder-primary text-main font-medium focus:w-full
      transition-all"
          type="text"
          placeholder="search for songs..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onFocus={() => setIsFocus(true)}
          onBlur={() => setIsFocus(false)}
        />
        <MagnifyingGlass
          className={`transition-all absolute w-18 text-main text-xl font-bold top-3.5 ${
            isFocus ? "left-[93%]" : "left-[83%]"
          }`}
        />{" "}
      </div>
      <div className="w-full">
        {input ? (
          <SearchResults
            isLoading={!isFetched || isLoading}
            results={tracks}
            addSong={() => {}}
          />
        ) : (
          <></>
        )}
      </div>
    </div>
  );
};

export default Search;
