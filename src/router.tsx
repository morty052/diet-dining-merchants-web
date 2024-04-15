import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
} from "react-router-dom";
import { AffiliateDashboard, Home, LoginPage } from "./pages";

export const router = createBrowserRouter(
  createRoutesFromElements(
    <>
      <Route path="/" element={<Home />} />
      <Route path="/login/*" element={<LoginPage />} />
      {/* <Route path="/dashboard/*" element={<Dashboard />} /> */}
      <Route path="/affiliate/*" element={<AffiliateDashboard />} />
      {/* <Route path="/store-onboarding/*" element={<StoreOnboarding />} /> */}
      {/* <Route
        path="/store-preview/:id/*"
        element={
          <SocketContextComponent>
            <StorePreview />
          </SocketContextComponent>
        }xx
      /> */}
    </>
  )
);
