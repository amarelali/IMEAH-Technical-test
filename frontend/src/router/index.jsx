import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
} from "react-router-dom";

import Auth from "../pages/Auth/Auth"
import PageNotFound from "../pages/PageNotFound";
import Dashboard from "../pages/dashboard";
import Header from "../components/Header";
import ProtectedRoute from "../components/auth/ProtectedRoute";
const user = localStorage.getItem("user");
const router = createBrowserRouter(
  createRoutesFromElements(
    <>
      <Route path="/">
        <Route
          index
          element={
            <ProtectedRoute isAllowed={user === null} to="/dashboard">
              <Auth />
            </ProtectedRoute>
          }
        />
      </Route>

      <Route
        path="/dashboard"
        element={
          <ProtectedRoute isAllowed={user !== null} to="/">
            <Header />
            <Dashboard />
          </ProtectedRoute>
        }
      />
      <Route path="*" element={<PageNotFound />} />
    </>
  )
);
export default router;