import { RouteObject, createBrowserRouter } from "react-router-dom";
import ErrorPage from "../pages/error";
import SignIn from "../pages/sign-in";
import SignUp from "../pages/sign-up";
import Root from "../pages/root";
import Profile from "@/pages/profile";
import Recipes from "@/pages/recipe";
import Home from "@/pages/home";
import { loader as homeLoader, action as homeAction } from "@/pages/home";

const routes: RouteObject[] = [
  {
    path: "/",
    element: <Root />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: "home",
        element: <Home />,
        loader: homeLoader,
        action: homeAction,
      },
      {
        path: "recipes",
        element: <Recipes />,
      },
      {
        path: "recipes/:recipeId",
        element: <Recipes />,
      },
      {
        path: "profile",
        element: <Profile />,
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
