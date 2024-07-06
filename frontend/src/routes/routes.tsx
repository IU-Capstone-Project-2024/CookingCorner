import { RouteObject, createBrowserRouter } from "react-router-dom";
import ErrorPage from "../pages/error";
import SignIn from "../pages/sign-in";
import SignUp from "../pages/sign-up";
import Root from "../pages/root";
import Profile from "@/pages/profile";
import Search from "@/pages/search";
import Home from "@/pages/home";
import Recipe from "@/pages/recipe";
import CreateRecipe from "@/pages/create-recipe";
import Upload from "@/pages/upload";
import ProfileEdit from "@/pages/profile-edit";

const routes: RouteObject[] = [
  {
    path: "/",
    element: <Root />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: "home",
        element: <Home />,
      },
      {
        path: "recipes",
        element: <Search />,
      },
      {
        path: "recipes/:recipeId",
        element: <Recipe />,
      },
      {
        path: "recipes/create",
        element: <CreateRecipe />,
      },
      {
        path: "recipes/upload",
        element: <Upload />,
      },
      {
        path: "profile",
        element: <Profile />,
      },
      {
        path: "profile/edit",
        element: <ProfileEdit />,
      },
    ],
  },
  {
    path: "/sign-in",
    element: <SignIn />,
    errorElement: <ErrorPage />,
  },
  {
    path: "/sign-up",
    element: <SignUp />,
    errorElement: <ErrorPage />,
  },
];

export const router = createBrowserRouter(routes);
