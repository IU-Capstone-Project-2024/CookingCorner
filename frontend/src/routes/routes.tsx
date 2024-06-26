import { RouteObject, createBrowserRouter } from "react-router-dom";
import ErrorPage from "../pages/error";
import SignIn from "../pages/sign-in";
import SignUp from "../pages/sign-up";
import Root from "../pages/root";
import Profile from "@/pages/profile";
import Search from "@/pages/search";
import Home from "@/pages/home";
import { loader as searchLoader, action as searchAction } from "@/pages/search";
import { loader as homeLoader, action as homeAction } from "@/pages/home";
import { action as signUpAction } from "@/pages/sign-up";
import { loader as profileLoader } from "@/pages/profile";
import { loader as recipeLoader } from "@/pages/recipe";
import Recipe from "@/pages/recipe";

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
        element: <Search />,
        loader: searchLoader,
        action: searchAction,
      },
      {
        path: "recipes/:recipeId",
        element: <Recipe />,
        loader: recipeLoader,
      },
      {
        path: "profile",
        element: <Profile />,
        loader: profileLoader,
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
    action: signUpAction,
  },
];

export const router = createBrowserRouter(routes);
