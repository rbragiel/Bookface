import { Box, useBoolean, Image } from "@chakra-ui/react";
import React from "react";

interface MessageImageProps {
  src: string;
}

const MessageImage = ({ src }: MessageImageProps) => {
  const [loaded, { on }] = useBoolean(false);

  return (
    <>
      {loaded ? null : <Box w="100%" minH="300px" />}
      <Image
        src={src}
        onLoad={() => on()}
        alt="message-image"
        mt={2}
        style={loaded ? {} : { display: "none" }}
      />
    </>
  );
};

export { MessageImage };
