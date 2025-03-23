import { Outlet, Navigate } from "react-router-dom";
import { useGlobalContext } from "./GlobalContext";
import { jwtDecode } from "jwt-decode";
import { useEffect } from "react";

const ProtectedRoute = () => {
  const { user, setUser } = useGlobalContext();

  useEffect(() => {
    if (user?.token) {
      try {
        const decodedToken = jwtDecode(user.token);

        if (decodedToken.exp * 1000 < Date.now()) {
          localStorage.removeItem("user");
          setUser(null);
        }
      } catch (error) {
        console.error("Invalid token:", error);
        localStorage.removeItem("user");
        setUser(null);
      }
    }
  }, [user, setUser]);

  return user ? <Outlet /> : <Navigate to="/auth/login" />;
};

export default ProtectedRoute;
