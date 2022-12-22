import React from "react";
import { Link } from "react-router-dom";

export const NavLink = (props) => {
  return (
    <>
      {props.link ? (
        <Link to={props.link}>
          <button
            className="flex items-center rounded-lg px-5 py-3 font-bold hover:bg-primary text-main"
            type={props.type}
          >
            {props.option}
          </button>
        </Link>
      ) : (
        <button
          className="flex items-center rounded-lg px-5 py-3 font-bold hover:bg-primary text-main"
          type={props.type}
          onClick={props.onClick}
        >
          {props.option}
        </button>
      )}
    </>
  );
};

export const Primary = (props) => {
  return (
    <>
      {props.link ? (
        <a href={props.link}>
          <button
            className="flex items-center rounded-lg px-5 py-3 font-bold bg-accent hover:bg-secondary hover:shadow-highlight text-main justify-center"
            type={props.type}
          >
            {props.option}
          </button>
        </a>
      ) : (
        <button
          className="flex items-center rounded-lg px-5 py-3 font-bold bg-accent hover:bg-secondary hover:shadow-highlight text-main justify-center"
          type={props.type}
          onClick={props.onClick}
        >
          {props.option}
        </button>
      )}
    </>
  );
};

export const Secondary = (props) => {
  return (
    <>
      {props.link ? (
        <a href={props.link}>
          <button
            className="flex items-center rounded-lg px-5 py-3 font-bold bg-main hover:bg-highlight hover:shadow-highlight text-secondary hover:text-main justify-center"
            type={props.type}
          >
            {props.option}
          </button>
        </a>
      ) : (
        <button
          className="flex items-center rounded-lg px-5 py-3 font-bold bg-main hover:bg-highlight hover:shadow-highlight text-secondary hover:text-main justify-center"
          type={props.type}
          onClick={props.onClick}
        >
          {props.option}
        </button>
      )}
    </>
  );
};

export const ToggleButton = (props) => {
  return (
    <button
      className="px-5 py-3 text-sm font-medium text-highlight hover:text-main bg-primary hover:bg-accent border-0 rounded-full focus:outline-none focus:shadow-outline flex flex-row gap-2 justify-center items-center"
      type={props.type}
      onClick={props.onClick}
    >
      {props.option}
    </button>
  );
};
