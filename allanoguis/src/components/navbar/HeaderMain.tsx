"use client";
import React from "react";
import Link from "next/link";
import { useSelectedLayoutSegment } from "next/navigation";
import useScroll from "@/hooks/use-scroll";
import { cn } from "@/lib/utils";
import { WebhookIcon } from "@primer/octicons-react";
import FullscreenMode from "@/lib/useFullscreen";

const brand: string = `///\).tkn`; //too edgy bro

// THIS IS THE MOBILE HEADER refactor gotta refactor the whole code. too much coffee

const HeaderMain = () => {
  const scrolled = useScroll(5);
  const selectedLayout = useSelectedLayoutSegment();

  return (
    <div
      //STICKY BAR ON TOP!
      className={cn(
        `sticky inset-x-0 top-0 z-30 w-full transition-all border-b border-gray-200`,
        {
          "border-b border-gray-200 bg-white/75 backdrop-blur-lg": scrolled,
          "border-b border-gray-200 bg-white": selectedLayout,
        }
      )}
    >
      <div className="flex h-[47px] items-center justify-between ml-4 px-4">
        {/* // MOBILE MODE!! RIGHT SIDE FULL SCREEN LOGO */}
        <div className="group flex items-center w-full space-x-4">
          <Link
            href="/"
            className="flex flex-row space-x-4 items-center justify-center md:flex"
          >
            <span className="group-hover:animate-spin">
              <WebhookIcon size={24} />
            </span>
            <FullscreenMode />
          </Link>
        </div>

        {/* // DESKTOP MODE!!! LEFT SIDE LOGO -- don't be confused */}
        <div className="flex-initial group hidden md:grid [grid-template-areas:'stack'] pr-4">
          <span className="[grid-area:stack] fixed top-1 right-4 h-10 w-10 m-0 p-0  rounded-full bg-red-600 group-hover:animate-ping" />
          <span className="[grid-area:stack] fixed top-2.5 right-5 p-0 m-0 font-mono font-extrabold text-xl outline-1">
            {brand}
          </span>
        </div>
      </div>
    </div>
  );
};

export default HeaderMain;
