import { useQuery } from "@tanstack/react-query";
import { getMyRecipes } from "./api";

export function useMyRecipes() {
  return useQuery({
    queryKey: ["my-recipes"],
    queryFn: getMyRecipes,
  });
}
