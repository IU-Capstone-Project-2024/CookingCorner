interface RecipeTimeProps {
  cookingTime: number;
  preparationTime: number;
  portions: number;
}

const RecipeTime = ({
  cookingTime,
  preparationTime,
  portions,
}: RecipeTimeProps) => {
  return (
    <div className="flex items-center justify-between text-center">
      <div className="flex flex-col font-inter font-normal">
        Prep. time <span className="font-bold">{preparationTime} mins</span>
      </div>
      <div className="flex flex-col font-inter font-normal">
        Cooking time <span className="font-bold">{cookingTime} mins</span>
      </div>
      <div className="flex flex-col font-inter font-normal">
        Portion <span className="font-bold">{portions} meals</span>
      </div>
    </div>
  );
};

export default RecipeTime;
