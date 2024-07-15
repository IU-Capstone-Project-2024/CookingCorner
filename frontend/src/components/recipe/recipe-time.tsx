import { Recipe } from "@/types/types";
import { useState } from "react";

interface RecipeTimeProps {
  recipe: Recipe;
}

const RecipeTime = ({ recipe }: RecipeTimeProps) => {
  const [isOpenDesc, setIsOpenDesc] = useState(false);

  return (
    <div>
      <div
        className="flex cursor-pointer items-center justify-between gap-4 text-center"
        onClick={() => setIsOpenDesc((prev) => !prev)}
      >
        <div className="flex flex-col font-inter font-normal">
          Prep. time{" "}
          <span className="font-bold">
            {recipe.preparing_time ? recipe.preparing_time : 0} mins
          </span>
        </div>
        <div className="flex flex-col font-inter font-normal">
          Cooking time{" "}
          <span className="font-bold">
            {recipe.cooking_time ? recipe.cooking_time : 0} mins
          </span>
        </div>
        <div className="flex flex-col font-inter font-normal">
          Portion{" "}
          <span className="font-bold">
            {recipe.portions ? recipe.portions : 0} meals
          </span>
        </div>
      </div>
      {isOpenDesc && (
        <div className="flex flex-col items-center justify-between gap-4 text-center">
          <div className="flex w-full items-center justify-between gap-4 text-center">
            <div className="flex flex-col font-inter font-normal">
              Category{" "}
              <span className="font-bold">
                {recipe.category_name ? recipe.category_name : 0}
              </span>
            </div>
            <div className="flex flex-col font-inter font-normal">
              Total time{" "}
              <span className="font-bold">
                {recipe.total_time ? recipe.total_time : 0} mins
              </span>
            </div>
            <div className="flex flex-col font-inter font-normal">
              Rest time <span className="font-bold">{0} mins</span>
            </div>
          </div>
          <div className="flex w-full flex-col items-start">
            <h3 className="font-inter font-semibold">Description:</h3>
            <p>{recipe.description}</p>
          </div>
          <div className="flex w-full flex-col items-start">
            <h3 className="font-inter font-semibold">Comments:</h3>
            <p>
              {recipe.comments ? recipe.comments : "No comments were added"}
            </p>
          </div>
          <div className="flex w-full items-center justify-between gap-4 text-center">
            <div className="flex flex-col font-inter font-normal">
              Nutritional{" "}
              <span className="font-bold">
                {recipe.nutritional_value ? recipe.nutritional_value : 0} kcal
              </span>
            </div>
            <div className="flex flex-col font-inter font-normal">
              Proteins{" "}
              <span className="font-bold">
                {recipe.proteins_value ? recipe.proteins_value : 0} g
              </span>
            </div>
            <div className="flex flex-col font-inter font-normal">
              Fats{" "}
              <span className="font-bold">
                {recipe.fats_value ? recipe.fats_value : 0} g
              </span>
            </div>
            <div className="flex flex-col font-inter font-normal">
              Carbs{" "}
              <span className="font-bold">
                {recipe.carbohydrates_value ? recipe.carbohydrates_value : 0} g
              </span>
            </div>
          </div>
          <div className="flex w-full flex-col items-start">
            <h3 className="font-inter font-semibold">Dishes:</h3>
            <p>{recipe.dishes ? recipe.dishes : "No dishes were added"}</p>
          </div>
          <div className="flex w-full items-start">
            <h3 className="font-inter font-semibold">Video link: </h3>
            <p>{recipe.video_link ? recipe.video_link : "..."}</p>
          </div>
          <div className="flex w-full items-start">
            <h3 className="font-inter font-semibold">Source: </h3>
            <a
              href={recipe.source ? recipe.source : ""}
              className="line-clamp-1"
            >
              {recipe.source ? recipe.source : "..."}
            </a>
          </div>
        </div>
      )}
    </div>
  );
};

export default RecipeTime;
