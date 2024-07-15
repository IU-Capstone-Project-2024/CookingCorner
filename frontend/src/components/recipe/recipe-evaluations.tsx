import { Dispatch, SetStateAction } from "react";
import { FaStar } from "react-icons/fa6";

interface RecipeEvaluationsProps {
  rating: number | null;
  author: string;
  reviews: number | null;
  setIsOpenRating: Dispatch<SetStateAction<boolean>>;
}

const RecipeEvaluations = ({
  rating,
  author,
  reviews,
  setIsOpenRating,
}: RecipeEvaluationsProps) => {
  return (
    <div className="flex items-center justify-between gap-4">
      <button
        className="flex items-center gap-1 font-semibold"
        onClick={() => setIsOpenRating((prev) => !prev)}
      >
        <FaStar size={20} className="text-hover" />
        {rating ? rating : "-"}
      </button>
      <p className="text-sm font-light">{reviews ? reviews : 0} reviews</p>
      <div className="font-semibold">Author: {author}</div>
    </div>
  );
};

export default RecipeEvaluations;
