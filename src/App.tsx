import { createBrowserRouter } from "react-router-dom"

import Home from "./pages/home"
import Admin from "./pages/admin"
import Network from "./pages/networks"
import Login from "./pages/login"
import { Private } from "./routes/Private"
import { ErrorPage } from "./pages/error"

const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
  },
  {
    path: "/admin",
    element: <Private><Admin /></Private>
  },
  {
    path: "/admin/networks",
    element: <Private><Network /></Private>
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "*",
    element: <ErrorPage />
  }
]);

export { router }
