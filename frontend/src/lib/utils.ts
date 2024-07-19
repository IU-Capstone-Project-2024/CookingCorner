import { RecipeSchemaFields } from "@/schemas/recipe.schema";
import {  User } from "@/types/types";
import axios from "axios";
import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

const BASE_URL = "http://51.250.112.178:8000";

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

export function checkAuth() {
  const token = localStorage.getItem("accessTokenExpires");
  if (token) {
    const time = JSON.parse(token).split(" ");
    const updatedTime = convertDataToGMT(time);
    return !(updatedTime.getTime() < new Date().getTime());
  }
}

export function prepareDataForEdit(data: User) {
  let res: any = {}
  for (let [key, value] of Object.entries(data)) {
    if (value === '' || value.length == 0) {
      res[key] = null;
    } else {
      res[key] = value;
    }
  }

  return {...res, image_path: null};
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
