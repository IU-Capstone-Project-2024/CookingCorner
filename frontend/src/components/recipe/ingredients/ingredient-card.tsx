interface IngredientCardProps {
  ingredientNumber: number;
  img: string | null;
  title: string;
}

const IngredientCard = ({
  ingredientNumber,
  img,
  title,
}: IngredientCardProps) => {
  return (
    <div className="flex w-full max-w-[335px] flex-col items-center gap-2 text-wrap rounded-lg border-2 border-mainBlack p-1">
      <h2 className="font-bold">Ingredient {ingredientNumber}</h2>
      <img
        src={`${img === null ? "no_image.png" : "/" + img}`}
        className="max-h-[200px] w-full max-w-[300px] object-cover"
      />
      <p className="max-w-[320px] truncate text-center">{title}</p>
    </div>
  );
};

export default IngredientCard;
