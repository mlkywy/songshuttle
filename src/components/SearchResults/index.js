import React from "react";
import { MusicNotesPlus } from "phosphor-react";

const SearchResults = ({ results, addSong }) => {
  return (
    <div className="overflow-y-auto w-1/4 h-full bg-primary rounded-lg shadow-lg">
      {results.map((result) => (
        <div
          key={result.id}
          className="p-4 border-b border-secondary flex items-center justify-between"
        >
          <div className="flex items-center w-5/6">
            <img
              src={result.album.images[0].url}
              alt=""
              className="w-10 h-10 rounded-full mr-4"
            />
            <div className="flex flex-col">
              <div className="font-bold text-main text-sm mb-2">
                {result.name}
              </div>
              <div className="text-main text-xs font-medium">
                {result.artists[0].name}
              </div>
            </div>
          </div>
          <MusicNotesPlus
            size="1.5rem"
            className="text-highlight hover:text-main cursor-pointer"
            onClick={() =>
              addSong(
                result.id,
                result.album.images[0].url,
                result.name,
                result.artists[0].name
              )
            }
          />
        </div>
      ))}
    </div>
  );
};

export default SearchResults;
