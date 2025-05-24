import { Newspaper, Tag, LogOut } from "lucide-react";
import { LucideIcon } from "lucide-react";

interface SidebarLink {
  icon: LucideIcon;
  route: string;
  label: string;
}

export const sidebarLinks: SidebarLink[] = [
  {
    icon: Newspaper,
    route: "/dashboard-articles",
    label: "Articles",
  },
  {
    icon: Tag,
    route: "/dashboard-category",
    label: "Category",
  },
  {
    icon: LogOut,
    route: "/logout",
    label: "Logout",
  },
];
