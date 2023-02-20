import { Pencil } from "phosphor-react";
import { Link } from "react-router-dom";
import { usePlaylist } from "../../context/PlaylistContext";
import getPlaylistTracks from "../../api/getPlaylistTracks";
import useUser from "../../hooks/useUser";

const UserPlaylistResults = ({ playlist }) => {
  const id = playlist.id;
  const cover = playlist.images[0]?.url;
  const title = playlist.name;
  const description = playlist.description;
  const isVisible = playlist.public;

  const { userId, token } = useUser();
  const {
    addToPlaylist,
    updatePlaylistId,
    updateTitle,
    updateDescription,
    updatePlaylistFlag,
    makePlaylistVisible,
    clearPlaylist,
  } = usePlaylist();

  const setTracks = async () => {
    clearPlaylist();

    const songs = await getPlaylistTracks(token, id);
    songs.forEach((song) => addToPlaylist(song));

    updatePlaylistId(id);
    updateTitle(title);
    updateDescription(description);
    makePlaylistVisible(isVisible);
    updatePlaylistFlag(true);
  };

  return (
    <div className="p-4 border-b border-primary flex items-center justify-between gap-2">
      <div className="flex items-center w-5/6">
        <img src={cover} alt="" className="w-12 h-12 mr-4" />
        <div className="flex flex-col">
          <div className="font-bold text-main text-sm py-1">{title}</div>
          <div className="text-main text-xs font-medium">{description}</div>
        </div>
      </div>
      <div className="flex flex-row gap-3">
        <Link to="/songshuttle/">
          <Pencil
            size="1.5rem"
            className="text-main hover:text-primary cursor-pointer"
            onClick={setTracks}
          />
        </Link>
      </div>
    </div>
  );
};

export default UserPlaylistResults;
