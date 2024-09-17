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
    path: "/pages/stuff",
    icon: <HubotIcon size={24} />,
  },
  {
    title: "Projects",
    path: "/projects",
    icon: <RocketIcon size={24} />,
    submenu: true,
    subMenuItems: [
      { title: "Game of Life", path: "/pages/projects/conway" },
      { title: "Tic Tac Toe", path: "/projects/tictactoe" },
      { title: "Battle Ship", path: "/projects/battleship" },
      { title: "Anonymous Messaging", path: "/projects/anonymous" },
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
    path: "/pages/about",
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
