import { MessageReceived, chatApi } from "@api/chat";
import { useBoolean } from "@chakra-ui/react";
import { useCallback, useEffect, useState } from "react";
import { useErrorState } from "./useErrorState";
import { useMounted } from "./useMounted";

const messagesProperLength = 15;

function useMessages(
  receiverId: string,
  cb: (messages: MessageReceived[]) => void
) {
  const [isLoading, { off, on }] = useBoolean(true);
  const [page, setPage] = useState(0);
  const { error, handleError } = useErrorState();
  const [hasMore, { off: setHasMoreOff }] = useBoolean(true);

  const isMounted = useMounted();

  const loadMore = useCallback(() => {
    setPage((prev) => prev + 1);
  }, []);

  useEffect(() => {
    const fetchMessages = async () => {
      if (isMounted()) {
        if (!isLoading) {
          on();
        }
        try {
          const messages = await chatApi.getMessages({ receiverId, page });
          cb(messages);

          if (messages.length < messagesProperLength) {
            setHasMoreOff();
          }
        } catch (error) {
          handleError(error);
        } finally {
          off();
        }
      }
    };

    fetchMessages();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isMounted, on, off, page, receiverId]);

  return { error, isLoading, loadMore, hasMore };
}

export { useMessages };
