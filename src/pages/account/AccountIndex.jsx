import { Navigate } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth.js";

export default function AccountIndex() {
  const { user } = useAuth();
  return <Navigate to={user ? "/account/profile" : "/account/sign-in"} replace />;
}