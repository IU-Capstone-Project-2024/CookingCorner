import { API } from "@/lib/utils";
import { Recipe } from "@/typings/types";
import { useEffect, useState } from "react";

const useRecipes = () => {
  const [lastRecipes, setLastRecipes] = useState<Recipe[]>([]);
  const [recommendedRecipes, setRecommendedRecipes] = useState<Recipe[]>([]);

  useEffect(() => {
    const fetchRecipes = () => {
      try {
        API.get("/recipes/last").then(res => setLastRecipes(res.data)
      } catch {
      } finally {
      }
    };

    fetchRecipes();
  }, []);

  return {
    lastRecipes,
    recommendedRecipes,
  };
};

export default useRecipes;
