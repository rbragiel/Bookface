/* eslint-disable @typescript-eslint/no-non-null-assertion */
import React, { useCallback, useRef, useState } from "react";
import { ContentWrapper } from "@components/contentWrapper";
import { useParams } from "react-router-dom";
import { Button, Center, Flex, Input } from "@chakra-ui/react";
import { useSocket } from "@hooks/useSocket";
import { AppSpinner } from "@components/spinner";
import { chatApi, ChatEvents, MessageReceived } from "@api/chat";
import { useAppSelector } from "@store/hooks";
import { ChevronRightIcon } from "@chakra-ui/icons";
import { MessageDisplay } from "./messageDisplay";
import { useEffect } from "react";

const Chat = () => {
  const { id } = useParams();
  const [message, setMessage] = useState("");
  const { userId } = useAppSelector((state) => state.auth.user)!;
  const [messages, setMessages] = useState<MessageReceived[]>([]);
  const btnRef = useRef<HTMLButtonElement>(null);

  const { socket, error, isError, isLoading } = useSocket(id!, [
    {
      name: ChatEvents.MESSAGE_RECEIVED,
      cb: (message: MessageReceived) => {
        setMessages((prev) => [...prev, message]);
      },
    },
  ]);

  useEffect(() => {
    const handleMessages = async () => {
      try {
        const messages = await chatApi.getMessages({
          receiverId: id!,
          page: 0,
        });

        setMessages((prev) => [...prev, ...messages]);
      } catch (error) {
        // TODO
        // error handling
      }
    };

    handleMessages();
  }, [id]);

  const sendMessage = useCallback(() => {
    socket?.emit(ChatEvents.MESSAGE_SEND, { content: message, userId });
    setMessage("");
  }, [message, socket, userId]);

  if (isLoading) {
    return (
      <Center flex={1}>
        <AppSpinner />
      </Center>
    );
  } else if (isError) {
    return <Center flex={1}>{JSON.stringify(error)}</Center>;
  } else {
    return (
      <ContentWrapper>
        <MessageDisplay messages={messages} userId={userId} />
        <Flex mt={4}>
          <Input
            colorScheme="red"
            flex={1}
            value={message}
            onKeyPress={(e) => {
              if (e.key === "Enter") {
                sendMessage();
              }
            }}
            onChange={(e) => setMessage(e.target.value)}
          />
          <Button
            rightIcon={<ChevronRightIcon />}
            ml={2}
            onClick={sendMessage}
            type="button"
            colorScheme="teal"
            ref={btnRef}
          >
            Send
          </Button>
        </Flex>
      </ContentWrapper>
    );
  }
};

export { Chat };
