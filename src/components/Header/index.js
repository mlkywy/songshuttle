import React from "react";
import logo from "../../images/logo.svg";
import Dropdown from "../Dropdown";
import { NavLink } from "../Buttons";
import { Link } from "react-router-dom";

const options = [
  { label: "dark", value: "dark" },
  { label: "light", value: "light" },
  { label: "default", value: "default" },
];

const Header = () => {
  return (
    <div className="fixed w-full flex flex-row items-center justify-between text-main h-20 z-10 md:px-32 lg:px-64">
      <div>
        <Link to="/">
          <img src={logo} alt="notepad logo" width="200px" />
        </Link>
      </div>

      <div className="flex flex-row items-center gap-5 justify-between">
        <NavLink option="documentation" link="documentation" />
        <div>
          <Dropdown options={options} />
        </div>
      </div>
    </div>
  );
};

export default Header;
