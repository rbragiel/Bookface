/* eslint-disable @typescript-eslint/no-non-null-assertion */
import React, { useCallback, useState } from "react";

import { useParams } from "react-router-dom";
import { Center } from "@chakra-ui/react";
import { useSocket } from "@hooks/useSocket";
import { ChatEvents, MessageReceived } from "@api/chat";
import { useAppSelector } from "@store/hooks";

import { ChatContent } from "./chatContent";
import { FullSpaceLoader } from "@components/fullSpaceLoader";
import { useTranslation } from "react-i18next";

const Chat = () => {
  const { id } = useParams();
  const { userId } = useAppSelector((state) => state.auth.user)!;
  const [messages, setMessages] = useState<MessageReceived[]>([]);
  const { t } = useTranslation();
  const { socket, error, isError, isLoading } = useSocket(id!, [
    {
      name: ChatEvents.MESSAGE_RECEIVED,
      cb: (message: MessageReceived) => {
        setMessages((prev) => [message, ...prev]);
      },
    },
  ]);

  const updateMessages = useCallback((messages: MessageReceived[]) => {
    setMessages((prev) => [...prev, ...messages]);
  }, []);

  const sendMessage = useCallback(
    (message: string, image: string | null) => {
      socket?.emit(ChatEvents.MESSAGE_SEND, {
        content: message,
        userId,
        image,
      });
    },
    [socket, userId]
  );

  if (isLoading) {
    return <FullSpaceLoader />;
  } else if (isError) {
    return (
      <Center flex={1} textAlign="center">
        {t("Unexpected error occured")}
      </Center>
    );
  } else {
    return (
      <ChatContent
        messages={messages}
        sendMessage={sendMessage}
        updateMessages={updateMessages}
        id={id!}
        userId={userId}
      />
    );
  }
};

export { Chat };
