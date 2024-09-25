"use client";
import React from "react";
import { useSelectedLayoutSegment } from "next/navigation";
import useScroll from "@/hooks/useScroll";
import { cn } from "@/lib/utils";
import { WebhookIcon } from "@primer/octicons-react";
import FullscreenMode from "./useFullscreen";
import DarkMode from "./darkMode";

const brand: string = `///\).tkn`; //too edgy bro

// THIS IS THE MOBILE HEADER refactor gotta refactor the whole code. too much coffee

const HeaderMain = () => {
  const scrolled = useScroll(5);
  const selectedLayout = useSelectedLayoutSegment();

  return (
    <div
      //STICKY BAR ON TOP!
      className={cn(`sticky inset-x-0 top-0 z-30 w-full transition-all`, {
        "bg-background backdrop-blur-lg": scrolled,
        "border-b border-border bg-background": selectedLayout,
      })}
    >
      <div className="flex h-[50px] items-center justify-between ml-4 px-4">
        {/* // MOBILE MODE!! RIGHT SIDE FULL SCREEN LOGO */}
        <div className="flex items-center w-full space-x-4">
          <div className="group flex flex-row space-x-4 items-center justify-center">
            <WebhookIcon size={24} className="group-hover:animate-spin" />
            <FullscreenMode />
          </div>
          <DarkMode />
        </div>

        {/* // DESKTOP MODE!!! LEFT SIDE LOGO -- don't be confused */}
        <div className="flex-initial hidden  md:flex pr-4">
          <div className="group [grid-template-areas:'stack'] items-center">
            <span className="[grid-area:stack] absolute top-1 right-4 h-10 w-10 m-0 p-0  rounded-full bg-bglogo group-hover:animate-ping" />
            <span className="[grid-area:stack] absolute top-2.5 right-5 p-0 m-0 font-mono font-extrabold text-logotext text-xl outline-1">
              {brand}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeaderMain;
