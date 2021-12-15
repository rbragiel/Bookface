import React from "react";
import { useActivate } from "@hooks/user/useActivate";
import { withAllAccess } from "@store/auth/withAllAccess";

const _Activate = () => {
  const { isSuccess, isLoading, error } = useActivate();
  return <div>{JSON.stringify(error?.message)}</div>;
};

const Activate = withAllAccess(_Activate);

export { Activate };
