import { Routes, Route } from "react-router-dom";
import { HomePage } from "../index.js";

export const MyRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
    </Routes>
  );
};
