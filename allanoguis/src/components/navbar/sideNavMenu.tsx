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
  icon?: JSX.Element;
  submenu?: boolean;
  subMenuItems?: Omit<SideNavItem, "icon" | "submenu" | "subMenuItems">[];
}

// Helper function to create submenu items
const createSubMenuItems = (items: { title: string; path: string }[]) => {
  return items.map((item) => ({ title: item.title, path: item.path }));
};

export const SIDENAV_ITEMS: SideNavItem[] = [
  {
    title: "Home",
    path: "/",
    icon: <CodespacesIcon size={24} />,
  },
  {
    title: "Games",
    path: "/games",
    icon: <RocketIcon size={24} />,
    submenu: true,
    subMenuItems: createSubMenuItems([
      { title: "Game of Life", path: "/pages/games/conway" },
      { title: "Tic Tac Toe", path: "/pages/games/tictactoe" },
      { title: "Battle Ship", path: "/pages/games/battleship" },
      { title: "Anonymous Chat", path: "/pages/games/anonymous" },
    ]),
  },
  {
    title: "Projects",
    path: "/pages/projects/",
    icon: <HubotIcon size={24} />,
  },
  {
    title: "Bored?",
    path: "/links",
    icon: <CodeOfConductIcon size={24} />,
    submenu: true,
    subMenuItems: createSubMenuItems([
      { title: "Join our Discord", path: "https://discord.gg/JbKrWDaN7Q" },
      {
        title: "Add me on Steam",
        path: "https://steamcommunity.com/id/madtoken2/",
      },
      { title: "Wargames 101", path: "https://overthewire.org/" },
    ]),
  },
  {
    title: "About",
    path: "/about",
    icon: <DependabotIcon size={24} />,
    submenu: true,
    subMenuItems: createSubMenuItems([
      { title: "GitHub", path: "https://github.com/allanoguis" },
      { title: "Behance", path: "https://www.behance.net/theallanoguis" },
    ]),
  },
];
