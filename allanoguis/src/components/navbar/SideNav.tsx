"use client";
import React, { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { SIDENAV_ITEMS } from "./NavElements";
import { SideNavItem } from "./NavElements";
import { AiModelIcon } from "@primer/octicons-react";
import { WebhookIcon } from "@primer/octicons-react";
import styles from "./nav.module.css";

// SideNav Component
const SideNav = () => {
  return (
    <div
      className={`${styles.spacefont} md:w-60 bg-white h-screen flex-1 fixed border-r border-zinc-200 hidden md:flex`}
    >
      <div className="flex flex-col space-y-6 w-full">
        {/* Logo section */}

        <Link
          href="/"
          className="group flex flex-row space-x-3 items-center justify-center md:justify-start md:px-8 border-b border-zinc-200 h-12 w-full"
        >
          <span className="group-hover:animate-spin">
            <WebhookIcon size={24} />
          </span>
          <span className="font-semibold text-xl hidden md:flex">Home</span>
        </Link>

        {/* Menu items */}

        <div className=" flex flex-col space-y-2 md:px-6 ">
          {SIDENAV_ITEMS.map((item, idx) => {
            return <MenuItem key={idx} item={item} />;
          })}
        </div>
      </div>
    </div>
  );
};

export default SideNav;

const MenuItem = ({ item }: { item: SideNavItem }) => {
  const pathname = usePathname();
  const [subMenuOpen, setSubMenuOpen] = useState(false);
  const toggleSubMenu = () => {
    setSubMenuOpen(!subMenuOpen);
  };

  return (
    <div className={styles.spacefont}>
      {item.submenu ? (
        <>
          {/* Menu Iten with Dropdown */}
          <button
            onClick={toggleSubMenu}
            className={`group flex flex-row items-center p-2 rounded-md w-full justify-between hover:bg-zinc-100 ${
              pathname.includes(item.path) ? "bg-zinc-100" : ""
            } ${styles.hover}`}
          >
            <div className="flex flex-row space-x-4 items-center">
              <span className="group-hover:animate-bounce ">{item.icon}</span>

              <span className="font-medium text-xl flex">{item.title}</span>
            </div>

            {/* Menu item dropdown icon */}

            <div
              className={`${
                subMenuOpen ? `duration-200 ease-in ${styles.rotate}` : ""
              } flex`}
            >
              <AiModelIcon size={16} />
            </div>
          </button>

          {/* Submenu item */}

          {subMenuOpen && (
            <div className="my-2 text-center flex flex-col space-y-4">
              {item.subMenuItems?.map((subItem, idx) => {
                return (
                  <Link
                    key={idx}
                    href={subItem.path}
                    className={`${
                      // Submenu link is active => font-weight: semibold

                      subItem.path === pathname ? "font-semibold" : ""
                    }`}
                  >
                    <span>{subItem.title}</span>
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
