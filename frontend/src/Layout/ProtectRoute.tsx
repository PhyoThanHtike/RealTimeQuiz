import React, { type ReactNode } from "react";
import { useSelector } from "react-redux";
import { Navigate, Outlet, useLocation } from "react-router-dom";

interface ProtectedRouteProps {
  children?: ReactNode;
}

const ProtectRoute: React.FC<ProtectedRouteProps> = ({ children }) => {
  const userId = useSelector((state: any) => state.user.userId);
  const location = useLocation();

  console.log(userId);

  if (!userId || userId == "") {
    return (
      <>
        {/* {toast.error("You need to login to your account.")} */}
        <Navigate to="/auth" state={{ from: location }} replace />
      </>
    );
  }
  return children || <Outlet/>;
};

export default ProtectRoute;
