import { Recipe, RecipeResponse } from "@/modules/types"
import axios from "axios"
import { type ClassValue, clsx } from "clsx"
import { useMemo } from "react"
import { twMerge } from "tailwind-merge"

const BASE_URL = import.meta.env.VITE_REACT_APP_API_URL

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export async function addRecipe(recipe: Recipe): Promise<void> {
  console.log(recipe)
}

export async function getRecipes(): Promise<RecipeResponse> {
  // const lastRecipes = await API.get('/recipes/last') as Recipe[];
  // const recommendedRecipes = await API.get('/recipes/recommended') as Recipe[];

  const lastRecipes: Recipe[] = [
    {
    img: "no_image.png",
    author: {
      username: "dsae",
      name: "Jack",
      surname: "Davidson",
      email: "jdavid@gmail.com",
      experience: 3,
    },
    cookingTime: 20,
    rating: 4.5,
    title: "Boiled shrimps",
    favourite: false
  },
  {
    img: "no_image.png",
    author: {
      username: "ronin",
      name: "Daniel",
      surname: "Jordan",
      email: "djordan@gmail.com",
      experience: 3,
    },
    cookingTime: 35,
    rating: 4.8,
    title: "Chicken in soy sauce",
    favourite: false
  }].slice(0, 2)

  const recommendedRecipes: Recipe[] = [{
    img: "no_image.png",
    author: {
      username: "dsae",
      name: "Jack",
      surname: "Davidson",
      email: "jdavid@gmail.com",
      experience: 3,
    },
    cookingTime: 20,
    rating: 4.5,
    title: "Boiled shrimps",
    favourite: false
  }].slice(0, 2)

  return { lastRecipes, recommendedRecipes }
}

export const API = axios.create({
  baseURL: BASE_URL,
});

API.interceptors.request.use((config) => {
  const accessToken = localStorage.getItem("accessToken")
  config.headers.Authorization = accessToken ? `Bearer ${accessToken}` : ''
  return config;
})