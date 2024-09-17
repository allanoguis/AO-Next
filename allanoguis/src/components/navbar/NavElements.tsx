import {
  HomeIcon,
  RocketIcon,
  HubotIcon,
  CodeOfConductIcon,
  DependabotIcon,
} from "@primer/octicons-react";

export interface SideNavItem {
  title: string;
  path: string;
  icon?: JSX.Element; // Changed from string to JSX.Element
  submenu?: boolean;
  subMenuItems?: Omit<SideNavItem, "icon" | "submenu" | "subMenuItems">[];
}

export const SIDENAV_ITEMS: SideNavItem[] = [
  {
    title: "Home",
    path: "/",
    icon: <HomeIcon size={24} />,
  },
  {
    title: "Stuff",
    path: "/stuff",
    icon: <HubotIcon size={24} />,
  },
  {
    title: "Projects",
    path: "/projects",
    icon: <RocketIcon size={24} />,
    submenu: true,
    subMenuItems: [
      { title: "Game of Life", path: "/projects/game-of-life" },
      { title: "Web Design", path: "/projects/web-design" },
      { title: "Graphic Design", path: "/projects/graphic-design" },
    ],
  },
  {
    title: "Merch",
    path: "/merch",
    icon: <CodeOfConductIcon size={24} />,
    submenu: true,
    subMenuItems: [
      // { title: "Shirts", path: "/merch/shirts" },
      // { title: "Coffee", path: "/merch/coffee" },
      // { title: "Wellness", path: "/merch/wellness" },
    ],
  },
  {
    title: "About",
    path: "../../app/about",
    icon: <DependabotIcon size={24} />,
  },
  // Uncomment and update the About section if needed
  // {
  //   title: "About",
  //   path: "/about",
  //   icon: <DependabotIcon size={24} />,
  //   submenu: true,
  //   subMenuItems: [
  //     { title: "GitHub", path: "https://github.com/allanoguis" },
  //     { title: "Behance", path: "https://www.behance.net/theallanoguis" },
  //   ],
  // },
];
