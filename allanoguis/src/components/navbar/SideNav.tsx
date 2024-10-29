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
    // sidebar
    <aside
      className={
        "md:w-60 bg-background h-full fixed backdrop-blur-lg hidden sm: md:flex"
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

const MenuItem = React.memo(({ item }: { item: SideNavItem }) => {
  // Memoized component
  MenuItem.displayName = "MenuItem"; // Added display name for the component
  const pathname = usePathname();
  const [isActive, setIsActive] = useState(false);
  const toggleSubMenu = () => {
    setIsActive(!isActive);
  };

  const getButtonClass = () => {
    return `group flex flex-row items-center p-2 rounded-sm w-full justify-between hover:bg-slate-700/50 ${
      pathname.includes(item.path) ? "bg-accent-primary text-white" : ""
    }`;
  };

  const getLinkClass = (subItemPath: string) => {
    return `${
      subItemPath === pathname ? "bg-accent-secondary text-white" : ""
    }`;
  };

  return (
    <div>
      {item.submenu ? (
        <>
          {/* Menu Item with Dropdown */}
          <button
            onClick={toggleSubMenu}
            className={getButtonClass()} // Use helper function for class names
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
                    className={getLinkClass(subItem.path)} // Use helper function for class names
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
}); // Memoized component
