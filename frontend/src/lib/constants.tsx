import { Page } from "@/modules/types";
import { FaHouse, FaBook, FaUser } from "react-icons/fa6";

export const pages: Page[] = [
  {
    icon: FaHouse,
    description: "Home",
    path: "/home",
  },
  {
    icon: FaBook,
    description: "Recipes",
    path: "/recipes",
  },
  {
    icon: FaUser,
    description: "Profile",
    path: "/profile",
  },
];
