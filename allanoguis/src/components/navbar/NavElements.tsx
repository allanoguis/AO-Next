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

const createNavItem = (
  title: string,
  path: string,
  icon: JSX.Element,
  subMenuItems?: SideNavItem["subMenuItems"]
): SideNavItem => ({
  title,
  path,
  icon,
  ...(subMenuItems && { submenu: true, subMenuItems }),
});

export const SIDENAV_ITEMS: SideNavItem[] = [
  createNavItem("Home", "/", <HomeIcon size={24} />),

  createNavItem("Merlin", "/merlin", <HubotIcon size={24} />),
  createNavItem("Projects", "/projects", <RocketIcon size={24} />, [
    { title: "3D Design", path: "/projects/3d-design" },
    { title: "Web Design", path: "/projects/web-design" },
    { title: "Graphic Design", path: "/projects/graphic-design" },
  ]),
  createNavItem("Merch", "/merch", <CodeOfConductIcon size={24} />, [
    { title: "Shirts", path: "/merch/shirts" },
    { title: "Coffee", path: "/merch/coffee" },
    { title: "Wellness", path: "/merch/wellness" },
  ]),
  // Uncomment and update the About section if needed
  createNavItem("About", "/about", <DependabotIcon size={24} />),
  // , [
  //   { title: "GitHub", path: "https://github.com/allanoguis" },
  //   { title: "Behance", path: "https://www.behance.net/theallanoguis" },
  // ]),
];
