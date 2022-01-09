import React, { useRef, useState } from "react";
import { MessageReceived } from "@api/chat";
import { AddIcon, ChevronRightIcon } from "@chakra-ui/icons";
import { Flex, Input, Button, Tooltip } from "@chakra-ui/react";
import { ContentWrapper } from "@components/contentWrapper";
import { MessageDisplay } from "./messageDisplay";
import { useMessages } from "@hooks/useMessages";
import { FullSpaceLoader } from "@components/fullSpaceLoader";

interface ChatContentProps {
  messages: MessageReceived[];
  sendMessage: (message: string, image: string | null) => void;
  updateMessages: (messages: MessageReceived[]) => void;
  id: string;
  userId: string;
}

const readFileAsString = (file: File) => {
  return new Promise<string>((res, rej) => {
    const reader = new FileReader();

    reader.onloadend = () => {
      res(reader.result as string);
    };
    reader.onerror = (err) => {
      rej(err);
    };

    reader.readAsDataURL(file);
  });
};

const ChatContent = ({
  messages,
  updateMessages,
  sendMessage,
  id,
  userId,
}: ChatContentProps) => {
  const [message, setMessage] = useState("");
  const [image, setImage] = useState<string | null>(null);
  const btnRef = useRef<HTMLButtonElement>(null);
  const addImageInputRef = useRef<HTMLInputElement>(null);

  const { isLoading, loadMore, hasMore } = useMessages(id, updateMessages);

  const handleChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const target = e.target;

    const file = target.files?.[0];

    if (file) {
      const result = await readFileAsString(file);
      setImage(result);
    }
  };

  if (isLoading && messages.length === 0) {
    return <FullSpaceLoader />;
  }

  return (
    <ContentWrapper>
      <MessageDisplay
        messages={messages}
        userId={userId}
        loadMore={loadMore}
        isLoading={isLoading}
        hasMore={hasMore}
      />
      <Flex mt={4}>
        <Input
          flex={1}
          value={message}
          onKeyPress={(e) => {
            if (e.key === "Enter") {
              sendMessage(message, image);
              setMessage("");
            }
          }}
          size="lg"
          onChange={(e) => setMessage(e.target.value)}
          placeholder="Type your message here"
        />
        <Tooltip label="Add photo">
          <Button
            size="lg"
            ml={2}
            onClick={() => {
              addImageInputRef.current?.click();
            }}
          >
            <AddIcon />
          </Button>
        </Tooltip>
        <Input
          display="none"
          ref={addImageInputRef}
          type="file"
          accept="image/*"
          onChange={handleChange}
        />
        <Button
          rightIcon={<ChevronRightIcon />}
          ml={2}
          onClick={() => {
            sendMessage(message, image);
            setMessage("");
            setImage("");
          }}
          size="lg"
          type="button"
          colorScheme="teal"
          ref={btnRef}
        >
          Send
        </Button>
      </Flex>
    </ContentWrapper>
  );
};

export { ChatContent };
