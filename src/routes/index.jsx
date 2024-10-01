import { Navigate, useRoutes } from "react-router-dom";
import Template from "../pages/Template";
import { Home } from "../pages/Home";
import { Direct } from "../pages/Direct";
import { Explore } from "../pages/Explore";
import { Favorite } from "../pages/Favorites";
import { Profile } from "../pages/Profile";
import { SignUp } from "../pages/Redister/SignUp";
import { Login } from "../pages/Login/Login";
import { auth } from "../firebase";
import { AddPost } from "../components/AddPost";


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
          path: "Favorites",
          element: <Favorite />,
        },
        {
          path: "Profile",
          element: <Profile />,
        },
        {
          path: "/Login",
          element: <Login />,
        },
        {
          path: "/Register",
          element: <SignUp />,
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
 