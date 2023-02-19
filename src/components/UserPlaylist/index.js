import React, { useState, useEffect } from "react";
import getUsersPlaylists from "../../api/getUsersPlaylists";
import useUser from "../../hooks/useUser";

const UserPlaylist = () => {
  const { userId, token } = useUser();

  const getPlaylists = async () => {
    const data = await getUsersPlaylists(token);
    const playlists = data.items.filter((item) => item.owner.id === userId);
    console.log(playlists);
  };

  return (
    <div>
      <button onClick={getPlaylists}>Click me!</button>
    </div>
  );
};

export default UserPlaylist;
