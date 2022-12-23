import React, { useState } from "react";
import { Square, CheckSquare } from "phosphor-react";

import { Secondary, ToggleButton } from "../Buttons";
import PlaylistTrack from "../PlaylistTrack";

import createPlaylist from "../../api/createPlaylist";
import addTracksToPlaylist from "../../api/addTracksToPlaylist";
import getRecommendations from "../../api/getRecommendations";

import { usePlaylist } from "../../context/PlaylistContext";
import { useSearch } from "../../context/SearchContext";
import { useAudio } from "../../context/AudioContext";
import useUser from "../../hooks/useUser";

const Playlist = () => {
  const [visibility, setVisibility] = useState(false);
  const { userId, token } = useUser();
  const { resetAudio } = useAudio();
  const { setTracks } = useSearch();
  const {
    expanded,
    setExpanded,
    songList,
    playlistTitle,
    setPlaylistTitle,
    playlistDescription,
    setPlaylistDescription,
  } = usePlaylist();

  const handleCreatePlaylist = async (
    title,
    description,
    songIds,
    visibility
  ) => {
    if (title === null || songIds.length === 0) {
      console.log(
        "Make sure the title field is not empty and include at least one song!"
      );
      return;
    }

    // Create new playlist
    const data = await createPlaylist(
      userId,
      token,
      title,
      description,
      visibility
    );

    const playlistId = data.id;

    // Add songs to the playlist
    await addTracksToPlaylist(token, playlistId, songIds);
  };

  const handleRecs = async (songId) => {
    resetAudio();
    setTracks([]);
    const data = await getRecommendations(token, songId);
    const recTracks = data.tracks;
    setTracks(recTracks);
  };

  return (
    <>
      {/* <div className="overflow-y-auto w-1/4 h-full bg-primary rounded-lg shadow-lg">
        <div className="p-4 gap-2 flex flex-col items-center justify-between">
          <input
            type="text"
            placeholder="enter playlist title..."
            onChange={(e) => setPlaylistTitle(e.target.value)}
            className="w-full px-2 py-2 text-lg font-medium placeholder-accent text-main focus:outline-none focus:shadow-outline bg-transparent"
          />
          <textarea
            type="text"
            placeholder="enter playlist description..."
            onChange={(e) => setPlaylistDescription(e.target.value)}
            className="w-full px-2 py-2 text-sm font-medium placeholder-accent text-main focus:outline-none focus:shadow-outline bg-transparent"
          />
        </div>

        {songList.map((song, index) => (
          <PlaylistTrack
            key={index}
            song={song}
            index={index}
            handleRecs={handleRecs}
          />
        ))}
      </div>
      <div className="flex flex-col gap-4">
        <ToggleButton
          option={
            <>
              {visibility ? (
                <CheckSquare size="1.5rem" />
              ) : (
                <Square size="1.5rem" />
              )}
              show on profile
            </>
          }
          onClick={() => {
            setVisibility(!visibility);
          }}
        />
        <Secondary
          option="create playlist"
          onClick={() =>
            handleCreatePlaylist(
              playlistTitle,
              playlistDescription,
              songList.map((song) => `spotify:track:${song.id}`),
              visibility
            )
          }
        />
      </div> */}

      <div
        id="playlist"
        className={`absolute flex flex-col overflow-y-auto gap-4 grow bottom-24 rounded-xl shadow-2xl p-4 left-32 ${
          expanded ? "h-1/2" : "h-20"
        } w-1/4 bg-primary text-main transition-all`}
      >
        <div className="border-b flex flex-row justify-between border-primary">
          <input
            type="text"
            placeholder="enter playlist title..."
            onChange={(e) => setPlaylistTitle(e.target.value)}
            className="w-full px-2 py-3 text-lg font-medium placeholder-accent text-main focus:outline-none focus:shadow-outline bg-transparent"
          />

          <button
            className="px-2 py-3 text-sm"
            onClick={() => setExpanded(!expanded)}
          >
            {expanded ? "close" : "expand"}
          </button>
        </div>
        <textarea
          type="text"
          placeholder="enter playlist description..."
          onChange={(e) => setPlaylistDescription(e.target.value)}
          className="resize-none h-10 w-full px-2 text-sm font-medium placeholder-accent text-main focus:outline-none focus:shadow-outline bg-transparent"
        />
        {expanded ? (
          songList.map((song, index) => (
            <PlaylistTrack
              key={index}
              song={song}
              index={index}
              handleRecs={handleRecs}
            />
          ))
        ) : (
          <></>
        )}
      </div>
    </>
  );
};

export default Playlist;
