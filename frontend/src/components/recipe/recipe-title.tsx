interface RecipeTitleProps {
  children: React.ReactNode;
}

const RecipeTitle = ({ children }: RecipeTitleProps) => {
  return (
    <div className="text-mainBlack line-clamp-2 min-w-44 font-inter text-xl font-bold">
      {children}
    </div>
  );
};

export default RecipeTitle;
