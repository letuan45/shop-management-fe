import { Navigate, Outlet, useLocation } from "react-router-dom";

const AdminRoute = () => {
  const location = useLocation();
  const storageUser = localStorage.getItem("user");
  const userObj = storageUser ? JSON.parse(storageUser) : undefined;
  let isAdmin = false;
  if (userObj && userObj.roleId === 2) {
    isAdmin = true;
  }

  console.log(isAdmin);

  return isAdmin ? (
    <Outlet />
  ) : (
    <Navigate to="/home" replace state={{ from: location }} />
  );
};

export default AdminRoute;
