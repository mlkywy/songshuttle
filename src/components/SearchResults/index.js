import React from "react";
import { MusicNotesPlus } from "phosphor-react";

const SearchResults = ({ results, addSong }) => {
  return (
    <div className="overflow-y-auto w-1/4 h-full bg-white rounded-lg shadow-lg">
      {results.map((result) => (
        <div
          key={result.id}
          className="p-4 border-b border-gray-200 flex items-center justify-between"
        >
          <div className="flex items-center">
            <img
              src={result.album.images[0].url}
              className="w-10 h-10 rounded-full mr-4"
            />
            <div className="flex flex-col">
              <div className="font-bold text-sm mb-2">{result.name}</div>
              <div className="text-gray-700 text-xs">
                {result.artists[0].name}
              </div>
            </div>
          </div>
          <MusicNotesPlus
            size="1.5rem"
            className="text-gray-600 hover:text-gray-800 cursor-pointer"
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

//    <button
//      className="text-sm"
//      onClick={() =>
//        addSong(
//          result.name,
//          result.artists[0].name,
//          result.album.images[0].url
//        )
//      }
//    >
//      Add to Playlist
//    </button>;
