import { useState } from "react";

interface IngredientCardProps {
  portion: string;
  title: string;
}

const IngredientCard = ({ title, portion }: IngredientCardProps) => {
  const [checked, setChecked] = useState(false);

  return (
    <div
      className={`flex w-screen max-w-[335px] flex-col items-center gap-2 text-wrap rounded-full border-2 ${checked ? "border-green-400" : "border-mainBlack"} p-1`}
      onClick={() => setChecked((prev) => !prev)}
    >
      <p className={`text-center ${checked ? "line-through" : ""}`}>
        <span className="font-bold">{title}:</span> {portion}
      </p>
    </div>
  );
};

export default IngredientCard;
