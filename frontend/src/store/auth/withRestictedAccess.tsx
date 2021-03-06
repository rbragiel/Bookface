import React from "react";
import { Navigate } from "react-router-dom";
import { useAppSelector } from "@store/hooks";

function withRestrictedAccess<P>(
  Component: React.ComponentType<P>,
  options = { redirect: "/" }
) {
  const WrappedComponent = (props: P) => {
    const user = useAppSelector((state) => state.auth.user);

    if (!user) {
      return <Navigate to={options.redirect} />;
    }

    return <Component {...props} />;
  };

  return WrappedComponent;
}

export { withRestrictedAccess };
