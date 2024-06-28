import { User } from "@/types/types";
import { FaStar } from "react-icons/fa6";

interface RecipeEvaluationsProps {
  rating: number;
  author: User;
  reviews: number;
}

const RecipeEvaluations = ({
  rating,
  author,
  reviews,
}: RecipeEvaluationsProps) => {
  return (
    <div className="flex items-center justify-between gap-2">
      <div className="flex items-center gap-1 font-bold">
        <FaStar size={20} className="text-hover" />
        {rating}
      </div>
      <p className="text-sm font-light">{reviews}k reviews</p>
      <div className="font-bold">Author: {author.name}</div>
    </div>
  );
};

export default RecipeEvaluations;
