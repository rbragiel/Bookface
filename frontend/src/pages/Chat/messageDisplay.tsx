import React, { useCallback } from "react";
import { MessageReceived } from "@api/chat";
import { Stack, useColorModeValue, Button } from "@chakra-ui/react";
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
    <Stack flex={1} overflowY="auto" p={4}>
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
      {messages.map((mess, i) =>
        i === messages.length - 1 ? (
          <Message
            ref={lastElRef}
            key={mess.id}
            message={mess}
            bgMessColor={bgMessColor}
            userId={userId}
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
    </Stack>
  );
};

export { MessageDisplay };
