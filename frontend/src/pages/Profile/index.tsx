/* eslint-disable @typescript-eslint/no-non-null-assertion */
import { ContentWrapper } from "@components/contentWrapper";
import Posts from "@pages/Profile/posts";
import React from "react";
import { useAppSelector } from "../../store/hooks";
import { Card } from "./card";

const Profile = () => {
  const user = useAppSelector((state) => state.auth.user)!;

  return (
    <ContentWrapper>
      <Card />
      <Posts userId={user.userId} />
    </ContentWrapper>
  );
};

export { Profile };
