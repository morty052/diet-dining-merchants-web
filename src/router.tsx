import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
} from "react-router-dom";
import { AffiliateDashboard, Home, LoginPage, OnboardingRoutes } from "./pages";

export const router = createBrowserRouter(
  createRoutesFromElements(
    <>
      <Route path="/" element={<Home />} />
      <Route path="/login/*" element={<LoginPage />} />
      {/* <Route path="/dashboard/*" element={<Dashboard />} /> */}
      <Route path="/affiliate/*" element={<AffiliateDashboard />} />
      <Route path="/onboarding/*" element={<OnboardingRoutes />} />
    </>
  )
);
