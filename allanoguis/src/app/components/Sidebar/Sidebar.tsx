"use client";
import React, { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import styles from "./Sidebar.module.css";
import { Icons } from "./icons";

// Define the NavItem interface
interface NavItem {
  name: string;
  path: string;
  icon: React.ReactNode; // Assuming you're using React icons or similar
}

// Define your navigation items
const navItems: NavItem[] = [
  { name: "Home", path: "/", icon: <Icons.Home /> },
  { name: "Profile", path: "/profile", icon: <Icons.Beaker /> },
  { name: "Settings", path: "/settings", icon: <Icons.Zap /> },
  // Add more items as needed
];

const Sidebar: React.FC = () => {
  const [isMobile, setIsMobile] = useState(false);
  const [isCollapsed, setIsCollapsed] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };

    handleResize();
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const toggleSidebar = () => {
    if (!isMobile) {
      setIsCollapsed(!isCollapsed);
    }
  };

  return (
    <nav
      className={`${styles.sidebar} ${
        isMobile
          ? styles.mobile
          : isCollapsed
          ? styles.collapsed
          : styles.desktop
      }`}
    >
      <button className={styles.toggleButton} onClick={toggleSidebar}>
        {isCollapsed ? <Icons.ChevronRight /> : <Icons.ChevronLeft />}
      </button>
      <ul className={styles.nav}>
        {navItems.map((item) => (
          <li key={item.name} className={styles.navItem}>
            <Link
              href={item.path}
              className={`${styles.navLink} ${
                pathname === item.path ? styles.active : ""
              }`}
            >
              <span className={styles.icon}>{item.icon}</span>
              {!isMobile && !isCollapsed && (
                <span className={styles.name}>{item.name}</span>
              )}
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default Sidebar;
