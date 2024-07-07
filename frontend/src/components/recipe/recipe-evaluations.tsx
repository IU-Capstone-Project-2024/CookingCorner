import { User } from "@/types/types";
import { FaStar } from "react-icons/fa6";

interface RecipeEvaluationsProps {
  rating: number | null;
  author: string;
  reviews: number | null;
}

const RecipeEvaluations = ({
  rating,
  author,
  reviews,
}: RecipeEvaluationsProps) => {
  return (
    <div className="flex items-center justify-between gap-4">
      <div className="flex items-center gap-1 font-semibold">
        <FaStar size={20} className="text-hover" />
        {rating ? rating : "-"}
      </div>
      <p className="text-sm font-light">{reviews ? reviews : 0} reviews</p>
      <div className="font-semibold">Author: {author}</div>
    </div>
  );
};

export default RecipeEvaluations;
