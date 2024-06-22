import { User } from "@/modules/types";
import { memo } from "react";
import { FaStar, FaClock, FaUser } from "react-icons/fa6";

interface RecipeDescriptionProps {
  rating: number;
  cookingTime: number;
  author: User;
}

const RecipeDescription = memo(
  ({ rating, cookingTime, author }: RecipeDescriptionProps) => {
    return (
      <div className="flex flex-col">
        <div className="grid grid-cols-2 gap-1 font-inter font-semibold">
          <div className="flex items-center gap-1 truncate text-wrap">
            <FaStar className="text-hover" />
            {rating}
          </div>
          <div className="flex items-center gap-1 truncate text-wrap">
            <FaClock className="text-hover" />
            {cookingTime + " min"}
          </div>
          <div className="flex items-center gap-1 truncate text-wrap">
            <FaUser className="text-hover" />
            {author.username}
          </div>
        </div>
      </div>
    );
  },
);

export default RecipeDescription;
