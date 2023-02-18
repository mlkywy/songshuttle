import React from "react";
import { Link } from "react-router-dom";
import { RocketLaunch } from "phosphor-react";

import Dropdown from "../Dropdown";
import { Primary, NavLink } from "../Buttons";

import useUser from "../../hooks/useUser";

// Theme options
const options = [
  { label: "spaceship", value: "dark" },
  { label: "blossom", value: "light" },
  { label: "dreamy", value: "custom1" },
  { label: "retro", value: "custom2" },
];

const Header = () => {
  const { token, redirectToAuthorization, logout } = useUser();

  return (
    <div className="fixed w-full flex flex-row items-center justify-between text-main h-20 z-10 md:px-32 lg:px-64">
      <Link to="/">
        <div className="text-3xl font-bitter font-bold flex flex-row items-center gap-1">
          <RocketLaunch size="2.5rem" /> songshuttle
        </div>
      </Link>

      <div className="flex flex-row items-center gap-5 justify-between">
        {!token ? (
          <Primary
            option="login to spotify"
            onClick={redirectToAuthorization}
          />
        ) : (
          <Primary option="logout of spotify" onClick={logout} />
        )}
        <NavLink option="how it works" link="documentation" />
        <div>
          <Dropdown options={options} />
        </div>
      </div>
    </div>
  );
};

export default Header;
