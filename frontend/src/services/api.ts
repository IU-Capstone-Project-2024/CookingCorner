import { API } from "@/lib/utils";
import { Recipe } from "@/types/types";

export const getMyRecipes = async () => {
  return (await API.get<Recipe[]>("/recipes/get_my_recipes")).data.map(
    (recipe) => recipe,
  );
};
