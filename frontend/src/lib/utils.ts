import { RecipeSchemaFields } from "@/schemas/recipe.schema";
import axios from "axios";
import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

const BASE_URL = "http://511.250.112.178:8000";

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

export function convertDataToGMT(time: string[]) {
  const reversedTime = time[0].split(".");

  return new Date(
    `${reversedTime[1]}.${reversedTime[0]}.${reversedTime[2]} ${time[1]}`,
  );
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
