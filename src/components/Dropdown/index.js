import React, { useState, useContext } from "react";
import { Palette } from "phosphor-react";
import { ThemeContext } from "../../helper/ThemeContext";
import ClickAwayListener from "react-click-away-listener";

const Dropdown = ({ options }) => {
  const [showOptions, setShowOptions] = useState(false);
  const handleClick = () => {
    setShowOptions(!showOptions);
  };

  const { setTheme } = useContext(ThemeContext);

  const handleClickAway = () => {
    setShowOptions(false);
  };

  const handleThemeOptions = (theme) => {
    if (theme) {
      localStorage.setItem("theme-choice", theme);
    } else {
      localStorage.clear("theme-choice");
    }
    setTheme(theme);
  };

  return (
    <div className="flex items-center justify-end">
      <div className="relative inline-block text-left">
        <Palette className="cursor-pointer" size="2rem" onClick={handleClick} />

        {showOptions && (
          <div
            className="origin-top-right absolute right-0 mt-2 w-32 rounded-md shadow-lg bg-primary ring-1 ring-black ring-opacity-5 focus:outline-none"
            role="menu"
            aria-orientation="vertical"
            aria-labelledby="menubutton"
            tabIndex="-1"
          >
            <ClickAwayListener onClickAway={handleClickAway}>
              <div className="py-1" role="none">
                {options &&
                  options.map((option) => (
                    <button
                      onClick={() => handleThemeOptions(option.value)}
                      className="text-white px-4 py-2 text-sm hover:bg-secondary w-full flex"
                      role="menuitem"
                      tabIndex="-1"
                    >
                      {option.label}
                    </button>
                  ))}
              </div>
            </ClickAwayListener>
          </div>
        )}
      </div>
    </div>
  );
};

export default Dropdown;
