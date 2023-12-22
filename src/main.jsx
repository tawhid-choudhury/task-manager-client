import * as React from "react";
import * as ReactDOM from "react-dom/client";
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import "./index.css";
import HomePage from "./components/HomePage";
import MainLayout from "./layout/MainLayout";
import AuthProvider from "./providers/AuthProvider";
import SignupPage from "./components/SignupPage";

const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    children: [
      {
        path: "/",
        element: <HomePage />
      },
      {
        path: "/dashboard",
        element: <h1>dsah</h1>
      },
      {
        path: "/login",
        element: <h1>login</h1>
      },
      {
        path: "/signup",
        element: <SignupPage />
      },
    ]
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <AuthProvider>
      <RouterProvider router={router} />
    </AuthProvider>
  </React.StrictMode>
);