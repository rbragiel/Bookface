import { MessageReceived } from "@api/chat";
import { Box } from "@chakra-ui/react";
import dayjs from "dayjs";
import React from "react";
import { MessageImage } from "./messageImage";

interface MessageProps {
  message: MessageReceived;
  userId: string;
  bgMessColor: string;
}

const Message = React.forwardRef<HTMLDivElement, MessageProps>(
  ({ message, bgMessColor, userId }, ref) => {
    return (
      <Box
        ref={ref}
        backgroundColor={bgMessColor}
        borderRadius={10}
        p={4}
        width="40%"
        minW="180px"
        maxWidth="800px"
        alignSelf={message.userId !== userId ? "start" : "end"}
        key={message.id}
      >
        <Box fontWeight={600}>
          {dayjs(message.createdAt).format("DD/MM/YYYY HH:mm")}
        </Box>
        <Box>{message.content}</Box>
        {message.image && <MessageImage src={message.image} />}
      </Box>
    );
  }
);

Message.displayName = "Message";

export { Message };
