import React, { useState } from "react";
import PlaylistTrack from "../PlaylistTrack";
import { usePlaylist } from "../../context/PlaylistContext";
import { Secondary, ToggleButton } from "../Buttons";
import createPlaylist from "../../api/createPlaylist";
import addTracksToPlaylist from "../../api/addTracksToPlaylist";
import useUser from "../../hooks/useUser";
import { Square, CheckSquare } from "phosphor-react";

const Playlist = () => {
  const {
    songList,
    playlistTitle,
    setPlaylistTitle,
    playlistDescription,
    setPlaylistDescription,
  } = usePlaylist();
  const { userId, token } = useUser();
  const [visibility, setVisibility] = useState(false);

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

  return (
    <>
      <div className="overflow-y-auto w-1/4 h-full bg-primary rounded-lg shadow-lg">
        <div className="p-4 gap-2 flex flex-col items-center justify-between">
          <input
            type="text"
            placeholder="enter playlist title..."
            onChange={(e) => setPlaylistTitle(e.target.value)}
            className="w-full px-2 py-1 text-lg font-medium leading-tight placeholder-accent text-main focus:outline-none focus:shadow-outline bg-transparent"
          />
          <textarea
            type="text"
            placeholder="enter playlist description..."
            onChange={(e) => setPlaylistDescription(e.target.value)}
            className="w-full px-2 py-1 text-sm font-medium leading-tight placeholder-accent text-main focus:outline-none focus:shadow-outline bg-transparent"
          />
        </div>

        {songList.map((song, index) => (
          <PlaylistTrack key={index} song={song} index={index} />
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
      </div>
    </>
  );
};

export default Playlist;
