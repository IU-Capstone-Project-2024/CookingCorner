import { useState } from "react";

interface IngredientCardProps {
  portion: string;
  title: string;
}

const IngredientCard = ({ title, portion }: IngredientCardProps) => {
  const [checked, setChecked] = useState(false);

  return (
    <div
      className={`flex w-screen max-w-[335px] flex-col items-center gap-2 text-wrap rounded-full border-2 ${checked ? "border-mainBlack/40" : "border-mainBlack"} p-1`}
      onClick={() => setChecked((prev) => !prev)}
    >
      <p
        className={`text-center ${checked ? "text-mainBlack/40" : "text-mainBlack"}`}
      >
        <span className="font-bold">{title}:</span> {portion}
      </p>
    </div>
  );
};

export default IngredientCard;
