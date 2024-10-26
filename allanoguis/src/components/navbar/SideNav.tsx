"use client";
import React, { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { SIDENAV_ITEMS } from "./sideNavMenu";
import { SideNavItem } from "./sideNavMenu";
import { AiModelIcon } from "@primer/octicons-react";

// SideNav Component
const SideBar = () => {
  return (
    //main sidebar
    <aside
      className={
        "md:w-60 bg-background h-screen flex-1 fixed backdrop-blur-lg hidden md:flex z-50"
      }
    >
      <div className="flex flex-col space-y-6 pt-3 w-full">
        <div className="flex flex-col space-y-2 md:px-6 ">
          {SIDENAV_ITEMS.map((item, keyIndex) => {
            return <MenuItem key={keyIndex} item={item} />;
          })}
        </div>
      </div>
    </aside>
  );
};

export default SideBar;

const MenuItem = ({ item }: { item: SideNavItem }) => {
  const pathname = usePathname();
  const [isActive, setIsActive] = useState(false);
  const toggleSubMenu = () => {
    setIsActive(!isActive);
  };

  return (
    <div>
      {item.submenu ? (
        <>
          {/* Menu Item with Dropdown */}
          <button
            onClick={toggleSubMenu}
            // Menu Item isActive => accent color
            className={`group flex flex-row items-center p-2 rounded-sm w-full justify-between hover:bg-slate-700/50 ${
              pathname.includes(item.path) ? "bg-accent-primary text-white" : ""
            } `}
          >
            <div className="flex flex-row space-x-4 items-center">
              <span className="group-hover:animate-bounce ">{item.icon}</span>

              <span className="font-medium text-xl flex">{item.title}</span>
            </div>

            {/* Menu item dropdown icon */}

            <div className={`${isActive ? `duration-200 ease-in ` : ""} flex`}>
              <AiModelIcon size={16} />
            </div>
          </button>

          {/* Submenu item */}

          {isActive && (
            <div className="my-2 text-right flex flex-col space-y-4 ">
              {item.subMenuItems?.map((subItem, keyIndex) => {
                return (
                  <Link
                    key={keyIndex}
                    href={subItem.path}
                    className={`${
                      // Submenu link is active => font-weight: semibold

                      subItem.path === pathname
                        ? "bg-accent-secondary text-white"
                        : ""
                    }`}
                  >
                    <span className="block p-2 py-1 rounded-sm w-full font-medium hover:bg-slate-700/50">
                      {subItem.title}
                    </span>
                  </Link>
                );
              })}
            </div>
          )}
        </>
      ) : (
        // if submenu link is not active => should enable on hover effects
        <>
          <Link
            href={item.path}
            className={`group flex flex-row space-x-4 items-center p-2 rounded-sm hover:bg-slate-700/50 ${
              item.path === pathname ? "bg-accent-primary text-white" : ""
            }`}
          >
            {/* Menu items without Submenu */}
            <span className="group-hover:animate-bounce">{item.icon}</span>
            <span className="font-medium text-xl flex">{item.title}</span>
          </Link>
        </>
      )}
    </div>
  );
};
