import { createBrowserRouter } from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import InviteRecord from "./pages/InviteRecord";

export const router = createBrowserRouter([
  { path: "/", element: <Dashboard /> },
  { path: "/invite/:id", element: <InviteRecord /> },
]);
