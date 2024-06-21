import { Recipe, RecipeResponse } from "@/modules/types"
import axios from "axios"
import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

const BASE_URL = import.meta.env.VITE_REACT_APP_API_URL

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export async function addRecipe(recipe: Recipe): Promise<void> {
  console.log("favourite", recipe)
}

export async function addFavouriteRecipe(recipe: Recipe): Promise<void> {
  console.log("starred", recipe)
}

export async function getMyRecipes(): Promise<Recipe[]> {
  // const recipes = await API.get('/recipes/favourite') as Recipe[];
  
  const recipes: Recipe[] = [
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
      favourite: true,
      starred: false,
      category: "warm_dishes",
      steps: [
        {
          step_number: 1,
          step_img: "image.png",
          description: "TextTextTextTextTextTextTextTextText"
        },
        {
          step_number: 2,
          step_img: "image.png",
          description: "TextTextTextTextTextTextTextTextText"
        },
        {
          step_number: 3,
          step_img: "image.png",
          description: "TextTextTextTextTextTextTextTextText"
        }
      ]
    },
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
      title: "Easy Lasagna",
      favourite: true,
      starred: false,
      category: "warm_dishes",
      steps: [
        {
          step_number: 1,
          step_img: "image.png",
          description: "TextTextTextTextTextTextTextTextText"
        },
        {
          step_number: 2,
          step_img: "image.png",
          description: "TextTextTextTextTextTextTextTextText"
        },
        {
          step_number: 3,
          step_img: "image.png",
          description: "TextTextTextTextTextTextTextTextText"
        }
      ]
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
      title: "Charlotte",
      favourite: true,
      starred: false,
      category: "warm_dishes",
      steps: [
        {
          step_number: 1,
          step_img: "image.png",
          description: "TextTextTextTextTextTextTextTextText"
        },
        {
          step_number: 2,
          step_img: "image.png",
          description: "TextTextTextTextTextTextTextTextText"
        },
        {
          step_number: 3,
          step_img: "image.png",
          description: "TextTextTextTextTextTextTextTextText"
        }
      ]
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
      favourite: true,
      starred: false,
      category: "warm_dishes",
      steps: [
        {
          step_number: 1,
          step_img: "image.png",
          description: "TextTextTextTextTextTextTextTextText"
        },
        {
          step_number: 2,
          step_img: "image.png",
          description: "TextTextTextTextTextTextTextTextText"
        },
        {
          step_number: 3,
          step_img: "image.png",
          description: "TextTextTextTextTextTextTextTextText"
        }
      ]
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
      cookingTime: 20,
      rating: 4.2,
      title: "Chicken in soy sauce",
      favourite: true,
      starred: false,
      category: "warm_dishes",
      steps: [
        {
          step_number: 1,
          step_img: "image.png",
          description: "TextTextTextTextTextTextTextTextText"
        },
        {
          step_number: 2,
          step_img: "image.png",
          description: "TextTextTextTextTextTextTextTextText"
        },
        {
          step_number: 3,
          step_img: "image.png",
          description: "TextTextTextTextTextTextTextTextText"
        }
      ]
    }
  ]
  
  return recipes;
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
    favourite: false,
    starred: false,
    category: "warm_dishes",
    steps: [
      {
        step_number: 1,
        step_img: "image.png",
        description: "TextTextTextTextTextTextTextTextText"
      },
      {
        step_number: 2,
        step_img: "image.png",
        description: "TextTextTextTextTextTextTextTextText"
      },
      {
        step_number: 3,
        step_img: "image.png",
        description: "TextTextTextTextTextTextTextTextText"
      }
    ]
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
    favourite: false,
    starred: false,
    category: "warm_dishes",
    steps: [
      {
        step_number: 1,
        step_img: "image.png",
        description: "TextTextTextTextTextTextTextTextText"
      },
      {
        step_number: 2,
        step_img: "image.png",
        description: "TextTextTextTextTextTextTextTextText"
      },
      {
        step_number: 3,
        step_img: "image.png",
        description: "TextTextTextTextTextTextTextTextText"
      }
    ]
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
    favourite: false,
    starred: false,
    category: "warm_dishes",
    steps: [
      {
        step_number: 1,
        step_img: "image.png",
        description: "TextTextTextTextTextTextTextTextText"
      },
      {
        step_number: 2,
        step_img: "image.png",
        description: "TextTextTextTextTextTextTextTextText"
      },
      {
        step_number: 3,
        step_img: "image.png",
        description: "TextTextTextTextTextTextTextTextText"
      }
    ]
  }
]

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
    favourite: false,
    starred: false,
    category: "warm_dishes",
    steps: [
      {
        step_number: 1,
        step_img: "image.png",
        description: "TextTextTextTextTextTextTextTextText"
      },
      {
        step_number: 2,
        step_img: "image.png",
        description: "TextTextTextTextTextTextTextTextText"
      },
      {
        step_number: 3,
        step_img: "image.png",
        description: "TextTextTextTextTextTextTextTextText"
      }
    ]
  }]

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