import { useQuery } from "@tanstack/react-query";
import { getBestRatedRecipes, getCategories, getMe, getMyRecipes, getRecentRecipes, getRecipeById } from "./api";

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
    staleTime: Infinity
  });
}

export function useRecipe(id: number) {
  return useQuery({
    queryKey: ["recipe", id],
    queryFn: () => getRecipeById(id),
    staleTime: Infinity
  });
}

export function useBestRated() {
  return useQuery({
    queryKey: ["best-rated"],
    queryFn: getBestRatedRecipes,
  });
}

export function useRecent() {
  return useQuery({
    queryKey: ['recent'],
    queryFn: getRecentRecipes,
  })
}

export function useCategories() {
  return useQuery({
    queryKey: ['categories'],
    queryFn: getCategories,
  })
}