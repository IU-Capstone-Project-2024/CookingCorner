import React from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

import "./index.css";

import App from "./App";
import ErrorPage from "./pages/error";
import SignIn from "./pages/sign-in";
import SignUp from "./pages/sign-up";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    errorElement: <ErrorPage />,
    children: [],
  },
  {
    path: "/sign-in",
    element: <SignIn />,
    errorElement: <ErrorPage />,
  },
  {
    path: "/sign-up",
    element: <SignUp />,
  },
]);

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
);
