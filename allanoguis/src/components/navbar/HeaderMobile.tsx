"use client";
import React, { useRef, useState } from "react";
import Link from "next/link";
import useDimensions from "@/hooks/useDimensions";
import { usePathname } from "next/navigation";
import { useCallback } from "react";
import { SIDENAV_ITEMS } from "./NavElements";
import { SideNavItem } from "./NavElements";
import { AiModelIcon } from "@primer/octicons-react";
import { motion, useCycle } from "framer-motion";

type MenuItemWithSubMenuProps = {
  item: SideNavItem;
  toggleOpen: () => void;
};

const mobileMenu = {
  open: (height = 1000) => ({
    clipPath: `circle(${height * 2 + 200}px at 100% 0)`,
    transition: {
      type: "spring",
      stiffness: 20,
      restDelta: 2,
    },
  }),
  closed: {
    clipPath: "circle(0px at 100% 0)",
    transition: {
      type: "spring",
      stiffness: 400,
      damping: 40,
    },
  },
};

const HeaderMobile = () => {
  const pathname = usePathname();
  const containerRef = useRef<HTMLElement>(null);
  const { height } = useDimensions(containerRef);
  const [isOpen, toggleOpen] = useCycle(false, true);

  const handleToggle = useCallback(() => toggleOpen(), [toggleOpen]);

  return (
    <motion.nav
      initial={false}
      animate={isOpen ? "open" : "closed"}
      custom={height}
      className={`fixed inset-0 z-50 w-full md:hidden ${
        isOpen ? "" : "pointer-events-none"
      }`}
      ref={containerRef}
    >
      <motion.div
        className="absolute inset-0 right-0 w-full bg-background dark:bg-slate-900/95"
        variants={mobileMenu}
      />
      <motion.ul
        variants={variants}
        className="absolute grid w-full gap-3 px-10 py-16 max-h-screen overflow-y-auto z-10"
      >
        {SIDENAV_ITEMS.map((item, idx) => {
          const isLastItem = idx === SIDENAV_ITEMS.length - 1; // Check if it's the last item

          return (
            <React.Fragment key={item.title}>
              {item.submenu ? (
                <MenuItemWithSubMenu item={item} toggleOpen={handleToggle} />
              ) : (
                <MenuItem>
                  <Link
                    href={item.path}
                    onClick={handleToggle}
                    className={`flex w-full text-2xl ${
                      item.path === pathname ? "font-bold" : ""
                    }`}
                  >
                    {item.title}
                  </Link>
                </MenuItem>
              )}

              {!isLastItem && (
                <MenuItem className="my-3 h-px w-full bg-border" />
              )}
            </React.Fragment>
          );
        })}
      </motion.ul>
      <MenuToggle toggle={handleToggle} />
    </motion.nav>
  );
};

export default HeaderMobile;

//Mobile hamburger icon
const MenuToggle: React.FC<{ toggle: () => void }> = ({ toggle }) => (
  <button
    onClick={toggle}
    className="pointer-events-auto absolute right-4 top-2 z-30 bg-background dark:bg-border"
  >
    <svg width="30" height="30" viewBox="-5 -6 31 30">
      <Path
        variants={{
          closed: { d: "M 2 2.5 L 20 2.5" },
          open: { d: "M 3 16.5 L 17 2.5" },
        }}
      />
      <Path
        d="M 2 9.423 L 20 9.423"
        variants={{
          closed: { opacity: 1 },
          open: { opacity: 0 },
        }}
        transition={{ duration: 0.1 }}
      />
      <Path
        variants={{
          closed: { d: "M 2 16.346 L 20 16.346" },
          open: { d: "M 3 2.5 L 17 16.346" },
        }}
      />
    </svg>
  </button>
);

// Mobile Menu bg animation
const Path: React.FC<React.ComponentProps<typeof motion.path>> = (props) => (
  <motion.path
    fill="transparent"
    strokeWidth="2"
    stroke="hsl(0, 0%, 18%)"
    strokeLinecap="round"
    {...props}
  />
);

// Replace the any type with a more specific type
const MenuItem = ({
  className,
  children,
}: {
  className?: string;
  children?: React.ReactNode;
}) => {
  return (
    <motion.li variants={MenuItemVariants} className={className}>
      {children}
    </motion.li>
  );
};

const MenuItemWithSubMenu: React.FC<MenuItemWithSubMenuProps> = ({
  item,
  toggleOpen,
}) => {
  const pathname = usePathname();
  const [subMenuOpen, setSubMenuOpen] = useState(false);

  const handleSubMenuToggle = useCallback(() => {
    setSubMenuOpen((prev) => !prev);
  }, []);

  return (
    <>
      <MenuItem>
        <button className="flex w-full text-2xl" onClick={handleSubMenuToggle}>
          <div className="flex flex-row justify-between w-full items-center">
            <span
              className={`${pathname.includes(item.path) ? "font-bold" : ""}`}
            >
              {item.title}
            </span>
            <span className={`${subMenuOpen && "animate-pulse"}`}>
              <AiModelIcon size={24} />
            </span>
          </div>
        </button>
      </MenuItem>
      <div className="flex flex-col mx-2 space-y-2">
        {subMenuOpen && (
          <>
            {item.subMenuItems?.map((subItem, subIdx) => {
              return (
                <MenuItem key={subIdx}>
                  <Link
                    href={subItem.path}
                    onClick={toggleOpen}
                    className={` ${
                      subItem.path === pathname ? "font-bold" : ""
                    }`}
                  >
                    {subItem.title}
                  </Link>
                </MenuItem>
              );
            })}
          </>
        )}
      </div>
    </>
  );
};

// Replace the any type with a more specific type
const MenuItemVariants: {
  open: {
    y: number;
    opacity: number;
    transition: {
      y: { stiffness: number; velocity: number };
    };
  };
  closed: {
    y: number;
    opacity: number;
    transition: {
      y: { stiffness: number };
      duration: number;
    };
  };
} = {
  open: {
    y: 0,
    opacity: 1,
    transition: {
      y: { stiffness: 1000, velocity: -100 },
    },
  },
  closed: {
    y: 50,
    opacity: 0,
    transition: {
      y: { stiffness: 1000 },
      duration: 0.02,
    },
  },
};

// Replace the any type with a more specific type
const variants: {
  open: {
    transition: { staggerChildren: number; delayChildren: number };
  };
  closed: {
    transition: { staggerChildren: number; staggerDirection: number };
  };
} = {
  open: {
    transition: { staggerChildren: 0.02, delayChildren: 0.15 },
  },
  closed: {
    transition: { staggerChildren: 0.01, staggerDirection: -1 },
  },
};
