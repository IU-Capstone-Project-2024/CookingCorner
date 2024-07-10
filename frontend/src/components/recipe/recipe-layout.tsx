import React from "react";
import RecipeNavigation from "./recipe-navigation";
import { cn } from "@/lib/utils";

interface RecipeLayoutProps {
  isPrivate?: boolean;
  children: React.ReactNode;
  className?: string;
  isPending?: boolean;
}

const RecipeLayout = ({
  children,
  className,
  isPending,
  isPrivate,
}: RecipeLayoutProps) => {
  return (
    <section
      className={cn(
        "container flex flex-col items-center gap-4 px-7 font-inter",
        className,
      )}
    >
      <RecipeNavigation isPending={isPending} isPrivate={isPrivate} />
      {children}
    </section>
  );
};

export default RecipeLayout;
