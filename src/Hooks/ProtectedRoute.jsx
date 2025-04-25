import { Navigate } from "react-router-dom";
import { UserAuth } from "../Context/AuthContext.jsx";

export const ProtectedRoute = ({ children, accessBy }) => {
  const { user } = UserAuth();

  if (accessBy === "non-athenticated") {
    if (!user) {
      return children;
    } else {
      return <Navigate replace to="/" />;
    }
  } else if (accessBy === "athenticated") {
    if (user) {
      return children;
    }
  }

  return <Navigate replace to="/login" />;
};
