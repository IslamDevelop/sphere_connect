import { Navigate, useRoutes } from "react-router-dom";
import Template from "../pages/Template";
import { Home } from "../pages/Home";
import { Direct } from "../pages/Direct";
import { Explore } from "../pages/Explore";
import { AddPost } from "../pages/AddPost";
import { Favorite } from "../pages/Favorites";
import { Profile } from "../pages/Profile";
import { Register } from "../pages/Register";
import { Login } from "../pages/Login";

export const Routing = () => {
  const element = useRoutes([
    {
      path: "/",
      element: <Template />,
      children: [
        {
          index: true,
          element: <Home />,
        },
        {
          path: "Direct",
          element: <Direct />,
        },
        {
          path: "Explore",
          element: <Explore />,
        },
        {
          path: "AddPost",
          element: <AddPost />,
        },
        {
          path: "Favorites",
          element: <Favorite />,
        },
        {
          path: "Login",
          element: <Login />,
        },
        {
          path: "Register",
          element: <Register />,
        },
        {
          path: "Profile",
          element: <Profile />,
        },
        {
          path: "*",
          element: <Navigate to="/" replace />,
        },
      ],
    },
  ]);
  return element;
};
