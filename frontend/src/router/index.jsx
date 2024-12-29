import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
} from "react-router-dom";

import Auth from "../pages/Auth/Auth"
import PageNotFound from "../pages/PageNotFound";
import Dashboard from "../pages/dashboard";
import Header from "../components/Header";
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
          <>
            <Header />
            <Dashboard />
          </>
        }
      />
      <Route path="*" element={<PageNotFound />} />
    </>
  )
);
export default router;