import { Recipe, RecipeResponse, User } from "@/types/types"
import { SignInFields } from "@/schemas/sign-in.schema"
import { SignUpFields } from "@/schemas/sign-up.schema"
import axios from "axios"
import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

const BASE_URL = "http://localhost:8000/"

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
        img: "no_image.png",
        username: "dsae",
        name: "Jack",
        surname: "Davidson",
        email: "jdavid@gmail.com",
        experience: 3,
      },
      cookingTime: 20,
      rating: 4.5,
      title: "Boiled shrimps ",
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
        img: "no_image.png",
        username: "dsae",
        name: "Jack",
        surname: "Davidson",
        email: "jdavid@gmail.com",
        experience: 3,
      },
      cookingTime: 20,
      rating: 4.5,
      title: "Easy Lasagna Lasagna Lasagna Lasagna",
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
        img: "no_image.png",
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
        img: "no_image.png",
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
        img: "no_image.png",
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

export async function getRecipe(id: number) {

  console.log(id)
  const recipe: Recipe = 
    {
      id: 1,
      img: "image2.png",
      author: {
        img: "no_image.png",
        username: "dsae",
        name: "Jack",
        surname: "Davidson",
        email: "jdavid@gmail.com",
        experience: 3,
      },
      cookingTime: 25,
      preparationTime: 5,
      portions: 5,
      rating: 4.5,
      title: "Boiled shrimps ",
      favourite: true,
      starred: false,
      reviews: 15,
      category: "warm_dishes",
      ingredients: [
        {
          ingredientNumber: 1,
          img: "image2.png",
          title: "text"
        },
        {
          ingredientNumber: 2,
          img: "image2.png",
          title: "text"
        },
        {
          ingredientNumber: 3,
          img: "image2.png",
          title: "text"
        }
      ],
      steps: [
        {
          stepNumber: 1,
          img: "image2.png",
          description: "TextTextTextTextTextTextText"
        },
        {
          stepNumber: 2,
          img: "image2.png",
          description: "TextTextTextTextTextTextTextTextText"
        },
        {
          stepNumber: 3,
          img: "image2.png",
          description: "TextTextTextTextTextTextTextTextText"
        }
      ]
    }
  
  return recipe;
}

export async function getRecipes(): Promise<RecipeResponse> {
  // const lastRecipes = await API.get('/recipes/last') as Recipe[];
  // const recommendedRecipes = await API.get('/recipes/recommended') as Recipe[];

  const lastRecipes: Recipe[] = [
    {
      id: 1,
    img: "image.png",
    author: {
      img: "no_image.png",
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
    id: 2,
    img: null,
    author: {
      img: "no_image.png",
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
    id: 3,
    img: "image.png",
    author: {
      img: "no_image.png",
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
    id: 4,
    img: "image.png",
    author: {
      img: "no_image.png",
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

export async function register(data: SignUpFields): Promise<void> {
  await API.post("/register", data).then(res => console.log(res)).catch(err => console.error(err))
}

export async function getUser() {
  // const response = await API.post('/get_User/me') as User;

  const userData: User = {
    img: null,
    username: "dsae",
    name: null,
    surname: "Davidson",
    email: "jdavid@gmail.com",
    experience: 3,
  }

  return userData;
}

function getAccessTokenFromCookies() {
  const cookies = document.cookie.split(';')
  for (const cookie of cookies) {
    const [name, value] = cookie.trim().split('=');
    if (name === 'token') {
       return value;
    }
 }

 return '';
}

export const API = axios.create({
  withCredentials: true,
  baseURL: BASE_URL,
});

API.interceptors.request.use((config) => {
  const accessToken = getAccessTokenFromCookies();

  config.headers.Authorization = accessToken ? `Bearer ${accessToken}` : ''
  return config;
})