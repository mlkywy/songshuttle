import React, { useState, useEffect } from "react";
import getUsersPlaylists from "../../api/getUsersPlaylists";
import useUser from "../../hooks/useUser";
import UserPlaylistResults from "../UserPlaylistResults";

const UserPlaylist = () => {
  const { userId, token } = useUser();
  const [playlists, setPlaylists] = useState([]);

  const getPlaylists = async () => {
    const data = await getUsersPlaylists(token);
    const playlists = data.items.filter((item) => item.owner.id === userId);
    setPlaylists(playlists);
  };

  return (
    <div>
      <button onClick={getPlaylists}>Click me!</button>
      {playlists.length > 0 && (
        <div className="playlist-dropdown">
          {playlists.map((playlist) => (
            <UserPlaylistResults key={playlist.id} playlist={playlist} />
          ))}
        </div>
      )}
    </div>
  );
};

export default UserPlaylist;
