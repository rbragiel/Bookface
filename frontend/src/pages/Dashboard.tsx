import React from "react";
import { withRestrictedAccess } from "@store/auth/withRestictedAccess";

const _Dashboard = () => {
  return <div>Dashboard</div>;
};

const Dashboard = withRestrictedAccess(_Dashboard);

export { Dashboard };
