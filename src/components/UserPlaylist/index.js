import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { ArrowClockwise, ArrowUUpLeft } from "phosphor-react";
import { InvertedOptionButton } from "../Buttons";
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
    <div className="flex justify-center">
      <div>
        <div className="p-2 flex flex-row gap-2">
          <InvertedOptionButton
            option={
              <>
                <ArrowClockwise size="1.3rem" /> refresh playlists
              </>
            }
            onClick={getPlaylists}
          />
          <Link to="/songshuttle/">
            <InvertedOptionButton
              option={
                <>
                  <ArrowUUpLeft size="1.3rem" /> go back to create playlist
                </>
              }
            />
          </Link>
        </div>

        {playlists.length > 0 && (
          <div className="max-h-64 overflow-y-auto">
            {playlists.map((playlist) => (
              <UserPlaylistResults key={playlist.id} playlist={playlist} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default UserPlaylist;
