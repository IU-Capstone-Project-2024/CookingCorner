interface RecipeTimeProps {
  cookingTime: number | null;
  preparationTime: number | null;
  portions: number | null;
}

const RecipeTime = ({
  cookingTime,
  preparationTime,
  portions,
}: RecipeTimeProps) => {
  return (
    <div className="flex items-center justify-between text-center">
      <div className="flex flex-col font-inter font-normal">
        Prep. time{" "}
        <span className="font-bold">
          {preparationTime ? preparationTime : 0} mins
        </span>
      </div>
      <div className="flex flex-col font-inter font-normal">
        Cooking time{" "}
        <span className="font-bold">{cookingTime ? cookingTime : 0} mins</span>
      </div>
      <div className="flex flex-col font-inter font-normal">
        Portion{" "}
        <span className="font-bold">{portions ? portions : 0} meals</span>
      </div>
    </div>
  );
};

export default RecipeTime;
