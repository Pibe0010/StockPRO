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
} from "../index.js";
import { useQuery } from "@tanstack/react-query";
import SpinnerLoader from "../Components/Molecules/SpinnerLoader.jsx";

export const MyRoutes = () => {
  const { user } = UserAuth();
  const { addUsers, idUser } = UserStore();
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
      </Route>
    </Routes>
  );
};
