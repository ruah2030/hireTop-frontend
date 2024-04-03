import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import AdminLayout from "../layouts/AdminLayout";
import DefaultLayout from "../layouts/DefaultLayout";
import AuthLayout from "../layouts/AuthLayout";
import PrivateRoute from "./PrivateRoute";
import Login from "../pages/Login";
import Register from "../pages/Register";
import ForgotPassword from "../pages/ForgotPassword";
import ResetPassword from "../pages/ResetPassword";
import Contact from "../pages/Contact";
import HomePage from "../pages/HomePage";
import AuthGuardRoute from "./AuthGuardRoute";
import NotFoundPage from "../pages/NotFoundPage";
import OfferPage from "../pages/OfferPage";
import AdminHomePage from "../pages/AdminHomePage";
import ProfilePage from "../pages/profile/ProfilePage";
import AdminOfferPage from "../pages/AdminOfferPage";
import OnlyForOrgRoute from "./OnlyForOrgRoute";
import OfferDetailsPage from "../pages/OfferDetailsPage";
import AdminSubscriptionPage from "../pages/AdminSubscriptionPage";
import AdminFolderPage from "../pages/AdminFolderPage";

function AppRouter() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<AuthLayout />}>
          <Route
            path="/login"
            element={<AuthGuardRoute element={<Login />} />}
          />
          <Route
            path="/register"
            element={<AuthGuardRoute element={<Register />} />}
          />
          <Route
            path="/forgot-password"
            element={<AuthGuardRoute element={<ForgotPassword />} />}
          />
          <Route
            path="/reset-password"
            element={<AuthGuardRoute element={<ResetPassword />} />}
          />
        </Route>
        <Route element={<DefaultLayout />}>
          <Route path="/" element={<HomePage />} />
          <Route path="/contacts/" element={<Contact />} />
          <Route
            path="/offers"
            element={<OfferPage/>}
          />
          <Route
            path="/offers/:id/"
            element={<OfferDetailsPage />}
          />
        </Route>
        <Route element={<PrivateRoute element={<AdminLayout />} />}>
          <Route
            path="/admin"
            element={<PrivateRoute element={<AdminHomePage />} />}
          />
          <Route
            path="/admin/settings"
            element={<PrivateRoute element={<ProfilePage />} />}
          />
          <Route
            path="/admin/folders"
            element={<PrivateRoute element={<AdminFolderPage />} />}
          />
          <Route
            path="/admin/offers"
            element={
              <OnlyForOrgRoute
                element={<PrivateRoute element={<AdminOfferPage />} />}
              />
            }
          />
          <Route
            path="/admin/applications"
            element={
              <OnlyForOrgRoute
                element={<PrivateRoute element={<AdminSubscriptionPage />} />}
              />
            }
          />
          <Route path="/not/found" element={<NotFoundPage />} />
        </Route>
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default AppRouter;
