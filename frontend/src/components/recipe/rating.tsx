import { FaStar } from "react-icons/fa6";
import { Input } from "../ui/input";
import { useState } from "react";
import { useRating } from "@/services/mutations";

interface RatingProps {
  id: number;
}

const Rating = ({ id }: RatingProps) => {
  const [rate, setRate] = useState(0);
  const ratingMutation = useRating();

  function handleRatingChange(id: number, rating: number) {
    setRate(rating);
    ratingMutation.mutate({ id, rating });
  }

  return (
    <div className="flex justify-between">
      {[...Array(5)].map((item, idx) => {
        const rating = idx + 1;

        return (
          <label key={`${item}-${idx}`}>
            <Input
              type="radio"
              name="rating"
              className="hidden"
              value={rating}
              onClick={() => handleRatingChange(id, rating)}
            />
            <FaStar
              size={30}
              className={`${rating <= rate ? "text-hover" : "text-black"} cursor-pointer`}
            />
          </label>
        );
      })}
    </div>
  );
};

export default Rating;
