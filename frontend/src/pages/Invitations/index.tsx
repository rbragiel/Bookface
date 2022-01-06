import { useBoolean } from "@chakra-ui/react";
import { ContentWrapper } from "@components/contentWrapper";
import React from "react";
import { Invited } from "./invited";
import { Invitees } from "./invitees";

const Invitations = () => {
  const [showInvited, { on, off }] = useBoolean(true);

  const render = () => {
    if (showInvited) {
      return <Invited />;
    } else {
      return <Invitees />;
    }
  };

  return <ContentWrapper>{render()}</ContentWrapper>;
};

export { Invitations };
