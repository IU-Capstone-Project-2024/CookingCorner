import { useMutation, useQueryClient } from "@tanstack/react-query";
import { addToFavourites, addToMyRecipes, changePrivacy, changeProfileData, createRecipe, deleteRecipe, login, register, removeFromFavourites, uploadFile } from "./api";
import { SignInFields } from "@/schemas/sign-in.schema";
import { useNavigate } from "react-router-dom";
import { User } from "@/types/types";
import { RecipeSchemaFields } from "@/schemas/recipe.schema";

export function useRegister() {
  const navigate = useNavigate();
  return useMutation({
    mutationFn: (data: { username: string; password: string }) =>
      register(data),

    onError: (err) => {
      console.log(`Error occured while registering. ${err}`);
    },

    onSuccess: () => {
      console.log("Successfully signed up");
      navigate("/sign-in");
    },
  });
}

export function useLogin() {
  const navigate = useNavigate();
  return useMutation({
    mutationFn: (data: SignInFields) => login(data),

    onError: (err) => {
      console.log(`Error occured while trying to log in. ${err}`);
    },

    onSuccess: (data) => {
      console.log("Successfully logged in");
      const {
        access_token,
        access_token_expires,
        refresh_token,
        refresh_token_expires,
      } = data.data;
      localStorage.setItem("accessToken", JSON.stringify(`${access_token}`));
      localStorage.setItem(
        "accessTokenExpires",
        JSON.stringify(`${access_token_expires}`),
      );
      localStorage.setItem("refreshToken", JSON.stringify(`${refresh_token}`));
      localStorage.setItem(
        "refreshTokenExpires",
        JSON.stringify(`${refresh_token_expires}`),
      );
      navigate("/home");
    },
  });
}

export function useAddFavourite() {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: (id: number) => addToFavourites(id),

    onSettled: async (_, err) => {
      if (err) {
        console.log(`Error occured while adding recipe to favourites. ${err}`)
      } else {
        await queryClient.invalidateQueries({queryKey: ['my-recipes']})
      }
    }
  });
}

export function useRemoveFavourite() {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: (id: number) => removeFromFavourites(id),

    onSettled: async (_, err) => {
      if (err) {
        console.log(`Error occured while removing recipe from favourites. ${err}`)
      } else {
        await queryClient.invalidateQueries({queryKey: ['my-recipes']})
      }
    }
  })
}

export function useCreateRecipe() {
  return useMutation({
    mutationFn: (data: RecipeSchemaFields) => createRecipe(data),

    onError: (err) =>
      console.log(`Error occured while creating new recipe. ${err}`),
    onSuccess: () => console.log("New recipe successfully created!"),
  });
}

export function useUploadFile() {
  return useMutation({
    mutationFn: (file: FormData) => uploadFile(file),

    onError: (err) =>
      console.log(`Error occured while uploading file . ${err}`),
    onSuccess: () => console.log("File successfully uploaded!"),
  }) 
}

export function useAddRecipe() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (id: number) => addToMyRecipes(id),
    onSuccess: () => console.log("New recipe successfully added!"),

    onSettled: async (_, err) => {
      if (err) {
        console.log(`Error occured while adding recipe to my recipes. ${err}`)
      } else {
        await queryClient.invalidateQueries({queryKey: ['my-recipes']})
      }
    }
  })
}

export function useDeleteRecipe() {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: (id: number) => deleteRecipe(id),
    onSuccess: () => console.log("Recipe successfully deleted!"),

    onSettled: async (_, err) => {
      if (err) {
        console.log(`Error occured while removing recipe from my recipes. ${err}`)
      } else {
        await queryClient.invalidateQueries({queryKey: ['my-recipes']})
      }
    }
  })
}

export function useProfileEdit() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (data: User) => changeProfileData(data),

    onSettled: async (_, err) => {
      if (err) {
        console.log(`Error occured while changing profile data. ${err}`)
      } else {
        await queryClient.invalidateQueries({queryKey: ['userMe']})
      }
    }
  })
}

export function usePublish() {
  return useMutation({
    mutationFn: (id: number) => changePrivacy(id),
    
    onError: (err) =>
      console.log(`Error occured while publishing recipe. ${err}`),
    onSuccess: () => console.log("Recipe successfully published!"),

    // onSettled: async (_, err, variables) => {
    //   if (err) {
    //     console.log(`Error occured while changing profile data. ${err}`)
    //   } else {
    //     await queryClient.invalidateQueries({queryKey: ['recipe', {id: variables.id}]})
    //   }
    // }
  })
}