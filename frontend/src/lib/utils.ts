import { RecipeSchemaFields } from "@/schemas/recipe.schema";
import axios from "axios";
import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

const BASE_URL = "http://158.160.134.200:8000";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function prepareRecipeData(
  data: RecipeSchemaFields,
  file?: File,
): FormData {
  const formData = new FormData();

  if (file) {
    formData.append("file", file);
  }

  formData.append("data", JSON.stringify({ ...data, private: true }));

  return formData;
}

export const API = axios.create({
  baseURL: BASE_URL,
});

API.interceptors.request.use((config) => {
  const accessToken = localStorage.getItem("accessToken");

  config.headers.Authorization = accessToken
    ? `Bearer ${JSON.parse(accessToken)}`
    : "";
  return config;
});
