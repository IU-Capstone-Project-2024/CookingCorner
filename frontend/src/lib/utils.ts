import { RecipeSchemaFields } from "@/schemas/recipe.schema";
import {  User } from "@/types/types";
import axios from "axios";
import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

const BASE_URL = "http://51.250.112.178:8000";

export const imageRegex = /^recipes\/.*/;

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function createFormData(
  file: File,
): FormData {
  const formData = new FormData();
  formData.append("file", file);

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

export function getDataWithImages(images: any[], data: RecipeSchemaFields) {
  if (images[0] !== undefined) {
    data.icon_path = images[0].file_name
  }
  
  for (let i = 1; i < images.length; i++) {
    if (data.steps !== undefined && data.steps !== null) {
      for (let j = i; j <= data.steps.length; j++) {
        if (images[i] !== undefined) {
          data.steps[j - 1].image_path = images[i].file_name;
          break;
        }
      }
    }
  }

  return data;
}

export function compareImages(oldData: RecipeSchemaFields, newData: RecipeSchemaFields): any[] {
  let res: any[] = []

  if (newData.icon_path === undefined) { 
    res.push({file_name: oldData.icon_path})
  } else {
    res.push(createFormData(newData.icon_path[0]))
  }

  if (newData.steps !== undefined && oldData.steps !== undefined) {
    for (let i = 0; i < newData.steps.length; i++) {
      if (newData.steps[i].image_path === undefined) {
        res.push({file_name: oldData.steps[i].image_path})
      } else {
        res.push(createFormData(newData.steps[i].image_path![0]))
      }
    }
  }

  return res;
}

export function getImages(data: RecipeSchemaFields): FormData[] {
  let res: FormData[] = []

  if (data.icon_path !== undefined) { 
    res.push(createFormData(data.icon_path[0]))
  }

  if (data.steps !== undefined) {
    data.steps.map(step => {
      if (step.image_path !== undefined) {
        res.push(createFormData(step.image_path[0]))
      }
    })
  }

  return res;
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
