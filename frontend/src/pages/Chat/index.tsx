/* eslint-disable @typescript-eslint/no-non-null-assertion */
import React, { useCallback, useState } from "react";

import { useParams } from "react-router-dom";
import { Center } from "@chakra-ui/react";
import { useSocket } from "@hooks/useSocket";
import { ChatEvents, MessageReceived } from "@api/chat";
import { useAppSelector } from "@store/hooks";

import { ChatContent } from "./chatContent";
import { FullSpaceLoader } from "@components/fullSpaceLoader";

const Chat = () => {
  const { id } = useParams();
  const { userId } = useAppSelector((state) => state.auth.user)!;
  const [messages, setMessages] = useState<MessageReceived[]>([]);

  const { socket, error, isError, isLoading } = useSocket(id!, [
    {
      name: ChatEvents.MESSAGE_RECEIVED,
      cb: (message: MessageReceived) => {
        setMessages((prev) => [...prev, message]);
      },
    },
  ]);

  const updateMessages = useCallback((messages: MessageReceived[]) => {
    setMessages((prev) => [...messages, ...prev]);
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
    return <Center flex={1}>{JSON.stringify(error)}</Center>;
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
