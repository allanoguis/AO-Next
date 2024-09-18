"use client";
import React from "react";
import Link from "next/link";
import { useSelectedLayoutSegment } from "next/navigation";
import useScroll from "../../hooks/use-scroll";
import { cn } from "../../lib/utils";
import { WebhookIcon } from "@primer/octicons-react";

// THIS IS THE MOBILE HEADER refactor gotta refactor the whole code. too much coffee

const HeaderMain = () => {
  const scrolled = useScroll(5);
  const selectedLayout = useSelectedLayoutSegment();

  return (
    <div
      className={cn(
        `sticky inset-x-0 top-0 z-30 w-full transition-all border-b border-gray-200`,
        {
          "border-b border-gray-200 bg-white/75 backdrop-blur-lg": scrolled,
          "border-b border-gray-200 bg-white": selectedLayout,
        }
      )}
    >
      <div className="flex h-[47px] items-center justify-between px-4">
        <div className="flex items-center space-x-4">
          <Link
            href="/"
            className="flex flex-row space-x-3 items-center justify-center md:hidden"
          >
            <span className="animate-spin">
              <WebhookIcon size={24} />
            </span>
            <span className="font-bold text-xl flex ">Home</span>
          </Link>
        </div>

        <div className="hidden md:block">
          <div className="h-8 w-8 rounded-full bg-zinc-300 flex items-center justify-center text-center">
            <span className="font-semibold text-sm">HQ</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeaderMain;
