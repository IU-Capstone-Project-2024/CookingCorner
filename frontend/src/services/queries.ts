import { useQuery } from "@tanstack/react-query";
import { getBestRatedRecipes, getMe, getMyRecipes, getRecipeById } from "./api";

export function useMyRecipes() {
  return useQuery({
    queryKey: ["my-recipes"],
    queryFn: getMyRecipes,
  });
}

export function useAuth() {
  return useQuery({
    queryKey: ["userMe"],
    queryFn: getMe,
  });
}

export function useRecipe(id: number) {
  return useQuery({
    queryKey: ["recipe", id],
    queryFn: () => getRecipeById(id),
  });
}

export function useSearch() {
  return useQuery({
    queryKey: ["best-rated"],
    queryFn: getBestRatedRecipes,
  });
}
