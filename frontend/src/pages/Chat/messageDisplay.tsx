import { MessageReceived } from "@api/chat";
import { Stack, Box, useColorModeValue } from "@chakra-ui/react";
import dayjs from "dayjs";
import React, { useCallback } from "react";

interface MessageDisplayProps {
  messages: MessageReceived[];
  userId: string;
}

const MessageDisplay = ({ messages, userId }: MessageDisplayProps) => {
  const bgMessColor = useColorModeValue("gray.100", "gray.900");
  const lastElRef = useCallback((node: HTMLDivElement) => {
    if (node) {
      node.scrollIntoView({ behavior: "smooth" });
    }
  }, []);

  return (
    <Stack flex={1} overflowY="auto">
      {messages.map((mess, i) =>
        i === messages.length - 1 ? (
          <Box
            ref={lastElRef}
            backgroundColor={bgMessColor}
            borderRadius={10}
            p={4}
            width="40%"
            minW="180px"
            alignSelf={mess.userId !== userId ? "start" : "end"}
            key={mess.id}
          >
            <Box fontWeight={600}>
              {dayjs(mess.createdAt).format("DD/MM/YYYY HH:mm")}
            </Box>
            {mess.content}
          </Box>
        ) : (
          <Box
            backgroundColor={bgMessColor}
            borderRadius={10}
            p={4}
            width="40%"
            minW="180px"
            alignSelf={mess.userId !== userId ? "start" : "end"}
            key={mess.id}
          >
            <Box fontWeight={600}>
              {dayjs(mess.createdAt).format("DD/MM/YYYY HH:mm")}
            </Box>
            {mess.content}
          </Box>
        )
      )}
    </Stack>
  );
};

export { MessageDisplay };
