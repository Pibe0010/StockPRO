import { Routes, Route } from "react-router-dom";
import { HomePage, LoginPage, ProtectedRoute, UserAuth } from "../index.js";

export const MyRoutes = () => {
  const { user } = UserAuth();
  return (
    <Routes>
      <Route path="/login" element={<LoginPage />} />
      <Route element={<ProtectedRoute user={user} redirectTo="/login" />}>
        <Route path="/" element={<HomePage />} />
      </Route>
    </Routes>
  );
};
