import React from "react";

const SearchResults = ({ results }) => {
  return (
    <div className="overflow-y-auto w-1/4 h-full bg-white rounded-lg shadow-lg">
      {results.map((result) => (
        <div key={result.id} className="p-4 border-b border-gray-200">
          <img
            src={result.cover}
            alt={`Cover for ${result.title} by ${result.artist}`}
          />
          <div className="font-bold text-sm mb-2">{result.title}</div>
          <div className="text-gray-700 text-xs">{result.artist}</div>
        </div>
      ))}
    </div>
  );
};

export default SearchResults;
