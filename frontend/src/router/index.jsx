import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
} from "react-router-dom";

import Auth from "../pages/Auth/Auth"
import PageNotFound from "../pages/PageNotFound";
import Dashboard from "../pages/dashboard";
const router = createBrowserRouter(
  createRoutesFromElements(
    <>
      <Route path="/">
        <Route
          index
          element={<Auth />}
        />
      </Route>
      <Route
        path="/dashboard"
        element={
          <Dashboard />
        }
      />
      <Route path="*" element={<PageNotFound />} />
    </>
  )
);
export default router;