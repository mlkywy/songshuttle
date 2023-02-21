import React from "react";
import { Link } from "react-router-dom";
import { RocketLaunch, Info } from "phosphor-react";

import Dropdown from "../Dropdown";
import { Primary, NavLink } from "../Buttons";

import useUser from "../../hooks/useUser";
import { usePlaylist } from "../../context/PlaylistContext";

// Theme options
const options = [
  { label: "spaceship", value: "dark" },
  { label: "cherry blossom", value: "light" },
  { label: "daydream", value: "custom1" },
  { label: "retro", value: "custom2" },
  { label: "coral reef", value: "custom3" },
  { label: "sunset sky", value: "custom4" },
  { label: "forest cottage", value: "custom5" },
  { label: "cloudy", value: "custom6" },
];

const Header = () => {
  const { token, redirectToAuthorization, logout } = useUser();
  const { updatePlaylistFlag } = usePlaylist();

  const createNewPlaylist = () => {
    updatePlaylistFlag(false);
    window.location.href = "/songshuttle/";
  };

  return (
    <div className="fixed w-full flex flex-row items-center justify-between text-main h-20 z-10 md:px-32 lg:px-64">
      <div className="flex flex-row items-center gap-8">
        <Link to="/songshuttle/">
          <div className="text-3xl font-bitter font-bold flex flex-row items-center gap-1">
            <RocketLaunch size="2.5rem" /> songshuttle
          </div>
        </Link>

        {!token ? (
          <Primary
            option="login to spotify"
            onClick={redirectToAuthorization}
          />
        ) : (
          <Primary option="logout of spotify" onClick={logout} />
        )}
      </div>

      <div className="flex flex-row items-center gap-5 justify-end">
        <NavLink option="new playlist" onClick={createNewPlaylist} />
        <NavLink option="your playlists" link="/songshuttle/update" />

        <div>
          <Link to="/songshuttle/documentation">
            <Info size="2rem" />
          </Link>
        </div>
        <div>
          <Dropdown options={options} />
        </div>
      </div>
    </div>
  );
};

export default Header;
