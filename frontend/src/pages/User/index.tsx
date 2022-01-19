import React from "react";
import { Center } from "@chakra-ui/react";
import { ContentWrapper } from "@components/contentWrapper";
import { useGetUserQuery } from "@store/api";
import { useParams } from "react-router-dom";
import { UserCard } from "./userPageCard";
import { FullSpaceLoader } from "@components/fullSpaceLoader";
import { Posts } from "./posts";
import { useTranslation } from "react-i18next";

const User = () => {
  const { userId } = useParams();
  const { t } = useTranslation();
  const { data, isLoading, error } = useGetUserQuery(userId ?? "");

  if (isLoading) {
    return <FullSpaceLoader />;
  }

  if (error) {
    return (
      <Center flex={1} textAlign="center">
        {t("Unexpected error occured")}
      </Center>
    );
  }

  return (
    <ContentWrapper mt={4} borderRadius={20}>
      {data && <UserCard user={data.user} />}
      <Posts />
    </ContentWrapper>
  );
};

export { User };
