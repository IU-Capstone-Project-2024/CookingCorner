import { memo } from "react";

interface RecipeTitleProps {
  children: React.ReactNode;
}

const RecipeTitle = memo(({ children }: RecipeTitleProps) => {
  return (
    <div className="line-clamp-2 max-w-44 font-inter text-xl font-bold text-mainBlack">
      {children}
    </div>
  );
});

export default RecipeTitle;
