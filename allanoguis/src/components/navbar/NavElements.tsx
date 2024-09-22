import {
  RocketIcon,
  HubotIcon,
  CodeOfConductIcon,
  DependabotIcon,
  CodespacesIcon,
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
    icon: <CodespacesIcon size={24} />,
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
      { title: "Tic Tac Toe", path: "/pages/projects/tictactoe" },
      { title: "Battle Ship", path: "/pages/projects/battleship" },
      { title: "Anonymous Chat", path: "/pages/projects/anonymous" },
    ],
  },
  {
    title: "Bored?",
    path: "/merch",
    icon: <CodeOfConductIcon size={24} />,
    submenu: true,
    subMenuItems: [
      {
        title: "Join our Discord",
        path: "https://discord.gg/8efXHN6E",
      },
      {
        title: "Add me on Steam",
        path: "https://steamcommunity.com/id/madtoken2/",
      },
      { title: "Learn Hacking 101", path: "https://overthewire.org/" },
    ],
  },
  {
    title: "About",
    path: "/about",
    icon: <DependabotIcon size={24} />,
    submenu: true,
    subMenuItems: [
      { title: "GitHub", path: "https://github.com/allanoguis" },
      { title: "Behance", path: "https://www.behance.net/theallanoguis" },
    ],
  },
];
