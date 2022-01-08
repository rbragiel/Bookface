import { ContentWrapper } from "@components/contentWrapper";
import React from "react";
import { useAppSelector } from "../../store/hooks";

const Profile = () => {
  const user = useAppSelector((state) => state.auth.user);
  return <ContentWrapper>{JSON.stringify(user)}</ContentWrapper>;
};

export { Profile };
