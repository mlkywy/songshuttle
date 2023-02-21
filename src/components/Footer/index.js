import React from "react";
import { GithubLogo, LinkedinLogo, TwitterLogo } from "phosphor-react";

const Footer = () => {
  return (
    <footer>
      <div className="fixed bottom-0 bg-primary w-full flex flex-row items-center justify-center gap-20 h-20 md:px-48 lg:px-64">
        <div className="flex flex-row items-center text-main font-medium">
          <p className="text-xs">Made with ♥ by Alina!</p>
        </div>

        <div className="flex flex-row items-center justify-between gap-5 font-medium">
          <a
            href="https://github.com/mlkywy/songshuttle"
            target="_blank"
            rel="noopener noreferrer"
          >
            <p className="text-xs text-highlight hover:text-accent">
              Repository
            </p>
          </a>
          <a
            href="https://fonts.google.com/specimen/Inter"
            target="_blank"
            rel="noopener noreferrer"
          >
            <p className="text-xs text-highlight hover:text-accent">Fonts</p>
          </a>
          <a href="https://phosphoricons.com/" target="_blank" rel="noreferrer">
            <p className="text-xs text-highlight hover:text-accent">Icons</p>
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
