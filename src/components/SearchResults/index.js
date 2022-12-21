import React, { useState, useEffect } from "react";
import Track from "../Track";

const SearchResults = ({ results, addSong }) => {
  return (
    <div className="overflow-y-auto w-1/4 h-full bg-primary rounded-lg shadow-lg">
      {results.map((result) => (
        <Track key={result.id} song={result} addSong={addSong} />
      ))}
    </div>
  );
};

export default SearchResults;
