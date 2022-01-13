/* eslint-disable @typescript-eslint/no-non-null-assertion */
import { ContentWrapper } from "@components/contentWrapper";
import Posts from "@components/posts";
import React from "react";
import { useAppSelector } from "../../store/hooks";

const Profile = () => {
  const user = useAppSelector((state) => state.auth.user)!;

  return (
    <ContentWrapper>
      {JSON.stringify(user)}
      <Posts userId={user.userId} />
    </ContentWrapper>
  );
};

export { Profile };
