import React from "react";
import { Link } from "react-router-dom";

import logo from "../../assets/logo.svg";
import Dropdown from "../Dropdown";
import { Primary, NavLink } from "../Buttons";

import useUser from "../../hooks/useUser";

import {
  SPOTIFY_ENDPOINTS,
  REDIRECT_URI,
  RESPONSE_TYPE,
  SPOTIFY_SCOPES,
} from "../../api/constants";

// Theme coptions
const options = [
  { label: "spaceship", value: "dark" },
  { label: "blossom", value: "light" },
  { label: "dreamy", value: "custom1" },
  { label: "retro", value: "custom2" },
];

const scopes = [
  SPOTIFY_SCOPES.PLAYLIST_MODIFY_PRIVATE,
  SPOTIFY_SCOPES.PLAYLIST_MODIFY_PUBLIC,
  SPOTIFY_SCOPES.UGC_IMAGE_UPLOAD,
];

const Header = () => {
  const { token, logout } = useUser();

  return (
    <div className="fixed w-full flex flex-row items-center justify-between text-main h-20 z-10 md:px-32 lg:px-64">
      <div className="text-3xl font-bitter font-bold flex flex-row items-center gap-1">
        {/* <Link to="/">
          <img src={logo} alt="notepad logo" width="200px" />
        </Link> */}
        songshuttle
      </div>

      <div className="flex flex-row items-center gap-5 justify-between">
        {!token ? (
          <Primary
            option="login to spotify"
            link={`${SPOTIFY_ENDPOINTS.AUTHORIZE}?client_id=${
              process.env.REACT_APP_CLIENT_ID
            }&redirect_uri=${REDIRECT_URI}&scope=${scopes.join(
              "%20"
            )}&response_type=${RESPONSE_TYPE}&show_dialog=true`}
          />
        ) : (
          <Primary option="logout of spotify" onClick={logout} />
        )}
        <NavLink option="how it works" link="about" />
        <div>
          <Dropdown options={options} />
        </div>
      </div>
    </div>
  );
};

export default Header;
