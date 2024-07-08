import { memo } from "react";
import { FaStar, FaClock, FaUser } from "react-icons/fa6";

interface RecipeCardDescriptionProps {
  rating: number;
  cookingTime: number;
  author: string;
}

const RecipeCardDescription = memo(
  ({ rating, cookingTime, author }: RecipeCardDescriptionProps) => {
    return (
      <div className="grid grid-cols-2 gap-1 font-inter font-semibold">
        <div className="flex items-center gap-1 truncate text-wrap">
          <FaStar className="text-hover" />
          {rating}
        </div>
        <div className="flex items-center gap-1 truncate text-wrap">
          <FaClock className="text-hover" />
          {cookingTime === null ? 0 : cookingTime} min
        </div>
        <div className="col-span-2 flex items-center gap-1 truncate text-wrap">
          <FaUser className="text-hover" />
          {author}
        </div>
      </div>
    );
  },
);

export default RecipeCardDescription;
