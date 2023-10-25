import AppCss from "../App.css";
import { useContext } from "react";
import { AuthContext } from "../contexts/AuthContext";
import { Navigate } from "react-router-dom";

const PrivateRoute = ({ children }) => {
  const { isAuthenticated, isLoading } = useContext(AuthContext);

  if (!isLoading && !isAuthenticated) {
    return <Navigate to="/login" />;
  }

  return isLoading ? (
    <div class="half-circle-spinner">
      <div class="circle circle-1"></div>
      <div class="circle circle-2"></div>
    </div>
  ) : (
    <>{children}</>
  );
};

export default PrivateRoute;
