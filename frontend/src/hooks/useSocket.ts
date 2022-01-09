import { connectAsync } from "@api/socket";
import { useBoolean } from "@chakra-ui/react";
import { useState } from "react";
import { Socket } from "socket.io-client";
import { useDidMount } from "./useDidMount";
import { useErrorState } from "./useErrorState";
import { useMounted } from "./useMounted";

interface SocketEvents {
  name: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  cb: (...args: any[]) => void;
}

function useSocket(id: string, events: SocketEvents[]) {
  const [socket, setSocket] = useState<Socket | null>(null);
  const [isLoading, { off }] = useBoolean(true);
  const { error, handleError } = useErrorState();
  const isMounted = useMounted();

  useDidMount(() => {
    const handleSocketConnection = async () => {
      if (isMounted()) {
        try {
          const io = await connectAsync({ receiverId: id });

          events.forEach((event) => {
            io.on(event.name, event.cb);
          });

          io.onAny((event, ...args) => {
            console.log(`Event: ${event}`, args);
          });

          setSocket(io);
        } catch (error) {
          handleError(error);
        } finally {
          off();
        }
      }
    };

    handleSocketConnection();
  });

  return { socket, isLoading, isError: !isLoading && error, error };
}

export { useSocket };
