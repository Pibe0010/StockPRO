import { Routes, Route } from "react-router-dom";
import {
  BrandPege,
  HomePage,
  LoginPage,
  ProtectedRoute,
  SettingsPage,
  CategoryPage,
  ProductPage,
  UserPage,
  KardexPege,
  ReportPage,
} from "../index.js";
import AllStock from "../Components/Body/Reports/AllStock.jsx";
import AllStockProduct from "../Components/Body/Reports/AllStockProduct.jsx";
import MinStockProduct from "../Components/Body/Reports/MinStockProduct.jsx";
import KardexEntryAndExit from "../Components/Body/Reports/KardexEntryAndExit.jsx";
import InventoryValued from "../Components/Body/Reports/InventoryValued.jsx";
import { Layout } from "../Hooks/Layout.jsx";

export const MyRoutes = () => {
  return (
    <Routes>
      <Route
        path="/login"
        element={
          <ProtectedRoute accessBy="non-athenticated">
            <LoginPage />
          </ProtectedRoute>
        }
      />
      <Route
        path="/"
        element={
          <ProtectedRoute accessBy="athenticated">
            <Layout>
              <HomePage />
            </Layout>
          </ProtectedRoute>
        }
      />
      <Route
        path="/settings"
        element={
          <ProtectedRoute accessBy="athenticated">
            <Layout>
              <SettingsPage />
            </Layout>
          </ProtectedRoute>
        }
      />
      <Route
        path="/settings/brand"
        element={
          <ProtectedRoute accessBy="athenticated">
            <Layout>
              <BrandPege />
            </Layout>
          </ProtectedRoute>
        }
      />
      <Route
        path="/settings/category"
        element={
          <ProtectedRoute accessBy="athenticated">
            <Layout>
              <CategoryPage />
            </Layout>
          </ProtectedRoute>
        }
      />
      <Route
        path="/settings/products"
        element={
          <ProtectedRoute accessBy="athenticated">
            <Layout>
              <ProductPage />
            </Layout>
          </ProtectedRoute>
        }
      />
      <Route
        path="/settings/users"
        element={
          <ProtectedRoute accessBy="athenticated">
            <Layout>
              <UserPage />
            </Layout>
          </ProtectedRoute>
        }
      />
      <Route
        path="/kardex"
        element={
          <ProtectedRoute accessBy="athenticated">
            <Layout>
              <KardexPege />
            </Layout>
          </ProtectedRoute>
        }
      />
      <Route
        path="/reports"
        element={
          <ProtectedRoute accessBy="athenticated">
            <Layout>
              <ReportPage />
            </Layout>
          </ProtectedRoute>
        }
      >
        <Route path="all-stock" element={<AllStock />} />
        <Route path="current-stock-product" element={<AllStockProduct />} />
        <Route path="min-stock" element={<MinStockProduct />} />
        <Route path="current-kardex" element={<KardexEntryAndExit />} />
        <Route path="inventory-valued" element={<InventoryValued />} />
      </Route>
    </Routes>
  );
};
