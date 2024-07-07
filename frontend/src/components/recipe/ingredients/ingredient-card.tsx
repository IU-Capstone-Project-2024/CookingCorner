interface IngredientCardProps {
  portion: string;
  title: string;
}

const IngredientCard = ({ title, portion }: IngredientCardProps) => {
  return (
    <div className="flex w-screen max-w-[335px] flex-col items-center gap-2 text-wrap rounded-full border-2 border-mainBlack p-1">
      <p>
        <span className="font-bold">{title}:</span> {portion}
      </p>
    </div>
  );
};

export default IngredientCard;
