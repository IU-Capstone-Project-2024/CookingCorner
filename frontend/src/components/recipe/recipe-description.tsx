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
        <div className="flex flex-col gap-2 font-inter font-semibold">
          <div className="flex items-center gap-1">
            <FaStar />
            {rating}
          </div>
          <div className="flex items-center gap-1">
            <FaClock />
            {cookingTime + " min"}
          </div>
          <div className="flex items-center gap-1">
            <FaUser />
            {author.username}
          </div>
        </div>
      </div>
    );
  },
);

export default RecipeDescription;
