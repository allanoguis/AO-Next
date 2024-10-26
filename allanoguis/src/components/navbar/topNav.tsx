"use client";
import React from "react";
import { WebhookIcon } from "@primer/octicons-react";
import FullscreenMode from "./useFullscreen";
import DarkMode from "./darkMode";

const brand: string = `///\).tkn`; //too edgy bro

const HeaderMain = () => {
  return (
    <div
      //STICKY BAR ON TOP!
      className="sticky inset-x-0 top-0 w-full transition-all bg-background backdrop-blur-lg"
    >
      <div className="flex h-[50px] items-center justify-between ml-4 px-4">
        {/* left side */}
        <div className="flex items-center w-full space-x-4">
          <div className="group flex items-center space-x-4">
            <>
              <WebhookIcon size={24} className="group-hover:animate-spin" />
            </>
            <>
              <FullscreenMode />
            </>
          </div>
          <DarkMode />
        </div>

        {/* right side */}

        <div className="sm: hidden group relative items-center md:flex pr-4">
          <span className="absolute z-0 top-0 right-9 h-9 w-9 rounded-full bg-bglogo group-hover:animate-ping" />
          <span className="top-1.5 z-20 right-1 font-mono font-extrabold text-logotext text-xl">
            {brand}
          </span>
        </div>
      </div>
    </div>
  );
};

export default HeaderMain;
