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
import LoginPage from "./components/LoginPage";
import PrivateRoute from "./PrivateRoute/PrivateRoute";
import Dashboard from "./layout/Dashboard";
import Add from "./components/Add";
import DashboardHome from "./components/DashboardHome";

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
        path: "/login",
        element: <LoginPage />
      },
      {
        path: "/signup",
        element: <SignupPage />
      },
    ]
  },
  {
    path: "dashboard",
    element: <PrivateRoute><Dashboard /></PrivateRoute>,
    children: [
      {
        path: "dashboardhome",
        element: <DashboardHome />
      },
      {
        path: "add",
        element: <Add />
      }
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