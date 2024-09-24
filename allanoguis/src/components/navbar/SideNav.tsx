"use client";
import React, { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { SIDENAV_ITEMS } from "./NavElements";
import { SideNavItem } from "./NavElements";
import { AiModelIcon } from "@primer/octicons-react";
import styles from "../../css/nav.module.css";

// SideNav Component
const SideNav = () => {
  return (
    //main sidebar
    <div
      className={`${styles.spacefont} md:w-60 bg-background h-screen flex-1 fixed backdrop-blur-lg hidden md:flex z-10`}
    >
      <div className="flex flex-col space-y-6 pt-3 w-full">
        <div className="flex flex-col space-y-2 md:px-6 ">
          {SIDENAV_ITEMS.map((item, keyIndex) => {
            return <MenuItem key={keyIndex} item={item} />;
          })}
        </div>
      </div>
    </div>
  );
};

export default SideNav;

const MenuItem = ({ item }: { item: SideNavItem }) => {
  const pathname = usePathname();
  const [isActive, setIsActive] = useState(false);
  const toggleSubMenu = () => {
    setIsActive(!isActive);
  };

  return (
    <div className={styles.spacefont}>
      {item.submenu ? (
        <>
          {/* Menu Item with Dropdown */}
          <button
            onClick={toggleSubMenu}
            // Menu Item isActive => accent color
            className={`group flex flex-row items-center p-2 rounded-md w-full justify-between hover:bg-zinc-100 ${
              pathname.includes(item.path) ? "bg-red-100" : ""
            } ${styles.hover}`}
          >
            <div className="flex flex-row space-x-4 items-center">
              <span className="group-hover:animate-bounce ">{item.icon}</span>

              <span className="font-medium text-xl flex">{item.title}</span>
            </div>

            {/* Menu item dropdown icon */}

            <div
              className={`${
                isActive ? `duration-200 ease-in ${styles.rotate}` : ""
              } flex`}
            >
              <AiModelIcon size={16} />
            </div>
          </button>

          {/* Submenu item */}

          {isActive && (
            <div className="my-2 text-right flex flex-col space-y-4">
              {item.subMenuItems?.map((subItem, keyIndex) => {
                return (
                  <Link
                    key={keyIndex}
                    href={subItem.path}
                    className={`${
                      // Submenu link is active => font-weight: semibold

                      subItem.path === pathname ? "bg-red-100" : ""
                    }`}
                  >
                    <span className="block p-2 py-1 rounded-md w-full font-medium hover:bg-zinc-100">
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

        <Link
          href={item.path}
          className={`group flex flex-row space-x-4 items-center p-2 rounded-lg hover:bg-zinc-100 ${
            item.path === pathname ? "bg-zinc-100" : ""
          }`}
        >
          {/* Menu items without Submenu */}
          <span className="group-hover:animate-bounce">{item.icon}</span>
          <span className="font-medium text-xl flex">{item.title}</span>
        </Link>
      )}
    </div>
  );
};
