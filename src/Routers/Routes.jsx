import { Routes, Route } from "react-router-dom";
import {
  BrandPege,
  CompanyStore,
  ErrorPage,
  HomePage,
  LoginPage,
  ProtectedRoute,
  SettingsPage,
  UserAuth,
  UserStore,
  CategoryPage,
  ProductPage,
  UserPage,
  KardexPege,
  ReportPage,
} from "../index.js";
import { useQuery } from "@tanstack/react-query";
import SpinnerLoader from "../Components/Molecules/SpinnerLoader.jsx";
import AllStock from "../Components/Body/Reports/AllStock.jsx";
import AllStockProduct from "../Components/Body/Reports/AllStockProduct.jsx";
import MinStockProduct from "../Components/Body/Reports/MinStockProduct.jsx";
import KardexEntryAndExit from "../Components/Body/Reports/KardexEntryAndExit.jsx";
import InventoryValued from "../Components/Body/Reports/InventoryValued.jsx";

export const MyRoutes = () => {
  const { user } = UserAuth();
  const { addUsers, idUser, addPermits } = UserStore();
  const { addCompany } = CompanyStore();

  const {
    data: dataUsers,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["add users"],
    queryFn: addUsers,
  });

  const { data: dataCompany } = useQuery({
    queryKey: ["add company"],
    queryFn: async () => {
      const result = await addCompany({ id_user: idUser });
      return result ?? null;
    },
    enabled: !!dataUsers,
  });

  const { data: dataPermits } = useQuery({
    queryKey: ["add permits", { id_user: idUser }],
    queryFn: async () => {
      const result = await addPermits({ id_user: idUser });
      return result ?? null;
    },
    enabled: !!dataUsers,
  });

  if (error) return <ErrorPage message={error.message} />;

  if (isLoading) return <SpinnerLoader />;

  return (
    <Routes>
      <Route path="/login" element={<LoginPage />} />
      <Route element={<ProtectedRoute user={user} redirectTo="/login" />}>
        <Route path="/" element={<HomePage />} />
        <Route path="/settings" element={<SettingsPage />} />
        <Route path="/settings/brand" element={<BrandPege />} />
        <Route path="/settings/category" element={<CategoryPage />} />
        <Route path="/settings/products" element={<ProductPage />} />
        <Route path="/settings/users" element={<UserPage />} />
        <Route path="/kardex" element={<KardexPege />} />
        <Route path="/reports" element={<ReportPage />}>
          <Route path="all-stock" element={<AllStock />} />
          <Route path="current-stock-product" element={<AllStockProduct />} />
          <Route path="min-stock" element={<MinStockProduct />} />
          <Route path="current-kardex" element={<KardexEntryAndExit />} />
          <Route path="inventory-valued" element={<InventoryValued />} />
        </Route>
      </Route>
    </Routes>
  );
};
