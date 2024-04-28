import { Navigate, Outlet, useLocation } from "react-router-dom";

const PrivateRoutes = () => {
  const location = useLocation();
  const cookies = document.cookie;
  const refreshTokenCookie = cookies.match(/(^|;) ?refreshToken=([^;]*)(;|$)/);

  return refreshTokenCookie ? (
    <Outlet />
  ) : (
    <Navigate to="/login" replace state={{ from: location }} />
  );
};

export default PrivateRoutes;
