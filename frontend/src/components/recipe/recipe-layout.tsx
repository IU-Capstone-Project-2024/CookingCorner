import React from "react";
import RecipeNavigation from "./recipe-navigation";
import { cn } from "@/lib/utils";

interface RecipeLayoutProps {
  isPrivate?: boolean;
  children: React.ReactNode;
  className?: string;
}

const RecipeLayout = ({
  isPrivate,
  children,
  className,
}: RecipeLayoutProps) => {
  return (
    <section
      className={cn(
        "container flex flex-col items-center gap-4 px-7 font-inter",
        className,
      )}
    >
      <RecipeNavigation privateRecipe={isPrivate} />
      {children}
    </section>
  );
};

export default RecipeLayout;
