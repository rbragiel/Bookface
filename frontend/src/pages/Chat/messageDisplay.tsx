import React, { useCallback } from "react";
import { MessageReceived } from "@api/chat";
import { useColorModeValue, Button, Flex } from "@chakra-ui/react";
import { Message } from "./message";
import { useTranslation } from "react-i18next";

interface MessageDisplayProps {
  messages: MessageReceived[];
  userId: string;
  loadMore: () => void;
  isLoading: boolean;
  hasMore: boolean;
}

const MessageDisplay = ({
  messages,
  userId,
  loadMore,
  isLoading,
  hasMore,
}: MessageDisplayProps) => {
  const bgMessColor = useColorModeValue("gray.100", "gray.900");
  const { t } = useTranslation();
  const lastElRef = useCallback((node: HTMLDivElement) => {
    if (node) {
      node.scrollIntoView({
        behavior: "smooth",
      });
    }
  }, []);

  return (
    <Flex flex={1} overflowY="auto" p={4} flexDir="column-reverse">
      {messages.map((mess, i) =>
        i === 0 ? (
          <Message
            key={mess.id}
            message={mess}
            bgMessColor={bgMessColor}
            userId={userId}
            ref={lastElRef}
          />
        ) : (
          <Message
            key={mess.id}
            message={mess}
            bgMessColor={bgMessColor}
            userId={userId}
          />
        )
      )}
      {hasMore && (
        <Button
          minH={50}
          onClick={loadMore}
          isLoading={isLoading}
          isDisabled={isLoading}
        >
          {t("Load more")}
        </Button>
      )}
    </Flex>
  );
};

export { MessageDisplay };
