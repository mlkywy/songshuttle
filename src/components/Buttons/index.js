import React from "react";
import { Link } from "react-router-dom";

export const NavLink = (props) => {
  return (
    <>
      {props.link ? (
        <Link to={props.link}>
          <button
            className="flex items-center rounded-lg pr-5 pl-5 pt-3 pb-3 font-bold hover:bg-primary text-main"
            type={props.type}
          >
            {props.option}
          </button>
        </Link>
      ) : (
        <button
          className="flex items-center rounded-lg pr-5 pl-5 pt-3 pb-3 font-bold hover:bg-primary text-main"
          type={props.type}
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
            className="flex items-center rounded-lg pr-5 pl-5 pt-3 pb-3 font-bold bg-accent shadow-accent shadow-sm hover:bg-highlight hover:shadow-highlight text-main"
            type={props.type}
          >
            {props.option}
          </button>
        </a>
      ) : (
        <button
          className="flex items-center rounded-lg pr-5 pl-5 pt-3 pb-3 font-bold bg-accent shadow-accent shadow-sm hover:bg-highlight hover:shadow-highlight text-main"
          type={props.type}
          onClick={props.onClick}
        >
          {props.option}
        </button>
      )}
    </>
  );
};
