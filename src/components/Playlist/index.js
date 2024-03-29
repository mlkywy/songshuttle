import React, { useState, useEffect } from "react";

import {
  Square,
  CheckSquare,
  PaperPlaneTilt,
  Upload,
  XCircle,
} from "phosphor-react";

import compressImage from "../../utils/compressImage";
import convertToBase64 from "../../utils/convertToBase64";

import { OptionButton, CreateButton, ImageButton } from "../Buttons";
import PlaylistTrack from "../PlaylistTrack";

import getRecommendations from "../../api/getRecommendations";
import createPlaylist from "../../api/createPlaylist";
import addTracksToPlaylist from "../../api/addTracksToPlaylist";
import removeTracksFromPlaylist from "../../api/removeTracksFromPlaylist";
import addCustomPlaylistCover from "../../api/addCustomPlaylistCover";
import updatePlaylistDetails from "../../api/updatePlaylistDetails";

import { usePlaylist } from "../../context/PlaylistContext";
import { useSearch } from "../../context/SearchContext";
import { useAudio } from "../../context/AudioContext";
import useUser from "../../hooks/useUser";

const Playlist = () => {
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
    updatingPlaylist,
    playlistId,
    addedSongList,
    removedSongList,
    clearUpdatedPlaylist,
    playlistVisibility,
    setPlaylistVisibility,
  } = usePlaylist();

  const [image, setImage] = useState(null);
  const [url, setUrl] = useState(null);
  const [imageText, setImageText] = useState(null);
  const [errorText, setErrorText] = useState(null);

  useEffect(() => {}, [image]);

  const handleSetImage = async (e) => {
    setErrorText(null);

    let file = e.target.files[0];

    if (file.size > 4000000) {
      setImage(null);
      setErrorText("Image must be less than 4 MB in size.");
    }

    while (file.size < 4000000 && file.size > 100000) {
      file = await compressImage(file, file.size);
    }

    if (file.size <= 100000) {
      let base64 = await convertToBase64(file);
      base64 = base64.split("base64,")[1];
      setImage(base64);
      setImageText(file.name);
    }
  };

  const handleResetImage = async () => {
    setImage(null);
    setImageText(null);
  };

  const handleCreatePlaylist = async (
    title,
    description,
    songUris,
    visibility
  ) => {
    console.log("CREATING PLAYLIST!");
    setUrl(null);
    setErrorText(null);

    if (title === null || songUris.length === 0) {
      return setErrorText(
        "Make sure the title field is not empty and include at least one song!"
      );
    }

    // Create new playlist
    const data = await createPlaylist(
      userId,
      token,
      title,
      description,
      visibility
    );

    const id = data.id;

    if (!id) {
      return setErrorText("Uh oh... something went wrong!");
    }

    setUrl(`https://open.spotify.com/playlist/${id}`);

    // Add songs to the playlist
    await addTracksToPlaylist(token, id, songUris);

    // Add image to playlist (if exists)
    if (image && id) {
      await addCustomPlaylistCover(token, id, image);
    }
  };

  const handleUpdatePlaylist = async (
    playlistId,
    title,
    description,
    addedSongUris,
    removedSongUris,
    visibility
  ) => {
    console.log("UPDATING PLAYLIST!");
    setUrl(null);
    setErrorText(null);

    if (playlistId === null) {
      return setErrorText(
        "It's possible that this playlist no longer exists; if this error persists, try refreshing your playlist list."
      );
    }

    const id = playlistId;

    setUrl(`https://open.spotify.com/playlist/${id}`);

    // Update playlist details
    await updatePlaylistDetails(token, id, title, description, visibility);

    // Remove songs from playlist
    if (removedSongUris.length > 0) {
      await removeTracksFromPlaylist(token, id, removedSongUris);
    }

    // Add songs to the playlist
    if (addedSongUris.length > 0) {
      await addTracksToPlaylist(token, id, addedSongUris);
    }

    // Update image to playlist (if exists)
    if (image && id) {
      await addCustomPlaylistCover(token, id, image);
    }

    clearUpdatedPlaylist();
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
      <div
        id="playlist"
        className={`absolute flex flex-col gap-4 grow bottom-24 rounded-lg shadow-lg p-4 right-32 ${
          expanded
            ? "h-auto max-h-[35rem] overflow-y-auto"
            : "h-20 overflow-y-hidden"
        } w-[32rem] bg-accent text-main transition-all`}
      >
        <div className="flex flex-row justify-between">
          <input
            type="text"
            placeholder="enter playlist title..."
            value={playlistTitle ? playlistTitle : ""}
            onChange={(e) => setPlaylistTitle(e.target.value)}
            className="w-full px-2 py-3 text-md font-semibold placeholder-primary text-main focus:outline-none focus:shadow-outline bg-transparent"
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
          value={playlistDescription ? playlistDescription : ""}
          onChange={(e) => setPlaylistDescription(e.target.value)}
          className="resize-none h-10 w-full px-2 text-sm font-medium placeholder-primary text-main focus:outline-none focus:shadow-outline bg-transparent"
        />
        <div className="flex flex-col gap-4">
          <div className="flex flex-row gap-4 items-center justify-center">
            <ImageButton
              option={
                <>
                  <Upload size="1.3rem" />
                  upload cover
                  <input
                    type="file"
                    name="filename"
                    style={{ display: "none" }}
                    accept="image/jpeg, image/png"
                    onChange={(e) => handleSetImage(e)}
                  />
                </>
              }
            />

            <OptionButton
              option={
                <>
                  {playlistVisibility ? (
                    <CheckSquare size="1.3rem" />
                  ) : (
                    <Square size="1.3rem" />
                  )}
                  show on profile
                </>
              }
              onClick={() => {
                setPlaylistVisibility(!playlistVisibility);
              }}
            />
            <CreateButton
              option={
                <>
                  <PaperPlaneTilt size="1.5rem" />{" "}
                  {updatingPlaylist ? "update playlist" : "create playlist"}
                </>
              }
              onClick={() =>
                updatingPlaylist
                  ? handleUpdatePlaylist(
                      playlistId,
                      playlistTitle,
                      playlistDescription,
                      addedSongList.map((song) => `spotify:track:${song.id}`),
                      removedSongList.map((song) => `spotify:track:${song.id}`),
                      playlistVisibility
                    )
                  : handleCreatePlaylist(
                      playlistTitle,
                      playlistDescription,
                      songList.map((song) => `spotify:track:${song.id}`),
                      playlistVisibility
                    )
              }
            />
          </div>

          {image ? (
            <button
              className="ml-2 text-xs text-semibold text-main flex flex-row gap-1"
              onClick={() => handleResetImage()}
            >
              {imageText} <XCircle />
            </button>
          ) : (
            <></>
          )}

          {errorText ? (
            <div className="ml-2 text-xs text-semibold text-main flex flex-row gap-1">
              {errorText}
            </div>
          ) : (
            <></>
          )}

          {url ? (
            <a
              href={url}
              className="ml-2 text-xs text-semibold text-main flex flex-row gap-1"
            >
              {url}
            </a>
          ) : (
            <></>
          )}
        </div>
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
