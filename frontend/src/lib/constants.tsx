import { Page } from "@/types/types";
import { FaMagnifyingGlass, FaBook, FaUser } from "react-icons/fa6";

export const pages: Page[] = [
  {
    icon: FaMagnifyingGlass,
    description: "Search",
    path: "/recipes",
  },
  {
    icon: FaBook,
    description: "Home",
    path: "/home",
  },
  {
    icon: FaUser,
    description: "Profile",
    path: "/profile",
  },
];
