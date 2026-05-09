import { createBrowserRouter, RouterProvider } from "react-router-dom";

import "./App.css";

import Login from "./components/Login";
import SignUp from "./components/SignUp";
import DashboardLayout from "./components/DashboardLayout";
import ProtectedRoute from "./components/ProtectedRoute";

import Dashboard from "./components/Dashboard";
import Projects from "./components/Projects";
import Tasks from "./components/Tasks";
import Teams from "./components/Teams";

function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: (
        <ProtectedRoute>
          <DashboardLayout />
        </ProtectedRoute>
      ),

      children: [
        {
          index: true,
          element: <Dashboard />,
        },

        {
          path: "projects",
          element: <Projects />,
        },
        {
          path: "tasks",
          element: <Tasks/ >
        },
        {
          path : "team",
          element : <Teams />
        }
      ],
    },

    {
      path: "/login",
      element: <Login />,
    },

    {
      path: "/signup",
      element: <SignUp />,
    },
  ]);

  return <RouterProvider router={router} />;
}

export default App;