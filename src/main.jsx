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
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import UpdateTask from "./components/UpdateTask";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";

const queryClient = new QueryClient()


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
      },
      {
        path: "taskDetails/:id",
        element: <UpdateTask />
      },
    ]
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <DndProvider backend={HTML5Backend}>
        <AuthProvider>
          <RouterProvider router={router} />
        </AuthProvider>
      </DndProvider>
    </QueryClientProvider>
  </React.StrictMode>
);