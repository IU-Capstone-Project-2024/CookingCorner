import { useQuery, useQueryClient } from "@tanstack/react-query";
import {
  findByRecipeName,
  getBestRatedRecipes,
  getCategories,
  getFile,
  getMe,
  getMyRecipes,
  getRecentRecipes,
  getRecipeById,
} from "./api";
import { FilterConditions } from "@/types/types";

export function useMyRecipes(filters: FilterConditions) {
  const queryClient = useQueryClient();
  queryClient.invalidateQueries({ queryKey: ["my-recipes"] });
  return useQuery({
    queryKey: ["my-recipes", filters],
    queryFn: () => getMyRecipes(filters),
    staleTime: 60000,
    initialData: () => {
      return queryClient.getQueryData(["my-recipes"]);
    },
  });
}

export function useAuth() {
  const queryClient = useQueryClient();
  return useQuery({
    queryKey: ["userMe"],
    queryFn: getMe,
    staleTime: Infinity,
    initialData: () => {
      return queryClient.getQueryData(["userMe"]);
    },
  });
}

export function useRecipe(id: number) {
  const queryClient = useQueryClient();
  return useQuery({
    queryKey: ["recipe", id],
    queryFn: () => getRecipeById(id),
    initialData: () => {
      return queryClient.getQueryData(["recipe", id]);
    },
  });
}

export function useSearch(search: string, filters: FilterConditions) {
  const queryClient = useQueryClient();
  return useQuery({
    queryKey: ["search", search, filters],
    queryFn: () => findByRecipeName(search, filters),
    staleTime: 60000,
    initialData: () => {
      return queryClient.getQueryData(["recipe", search, filters]);
    },
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
    queryKey: ["recent"],
    queryFn: getRecentRecipes,
  });
}

export function useFile() {
  return useQuery({
    queryKey: ["file"],
    queryFn: getFile,
  });
}

export function useCategories() {
  return useQuery({
    queryKey: ["categories"],
    queryFn: getCategories,
  });
}
