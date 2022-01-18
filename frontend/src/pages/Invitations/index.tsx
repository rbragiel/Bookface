import React from "react";
import { Button, useBoolean } from "@chakra-ui/react";
import { ContentWrapper } from "@components/contentWrapper";
import { Invited } from "./invited";
import { Invitees } from "./invitees";
import { useTranslation } from "react-i18next";

const Invitations = () => {
  const [showInvited, { toggle }] = useBoolean(true);
  const { t } = useTranslation();

  const render = () => {
    if (showInvited) {
      return <Invited />;
    } else {
      return <Invitees />;
    }
  };

  return (
    <ContentWrapper maxW="1200px" alignSelf="center" w="100%">
      <Button onClick={toggle} size="md" minH="40px">
        {showInvited ? t("Show received invites") : t("Show sent invites")}
      </Button>
      {render()}
    </ContentWrapper>
  );
};

export { Invitations };
