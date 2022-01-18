import {
  FormControl,
  FormLabel,
  Flex,
  Input,
  Button,
  useColorModeValue,
} from "@chakra-ui/react";
import { useAddCommentMutation } from "@store/api";
import React, { useState } from "react";

interface CommentsInputProps {
  postId: string;
  page: number;
}

const CommentsInput = ({ postId, page }: CommentsInputProps) => {
  const [comment, setComment] = useState("");
  const bg = useColorModeValue("gray.100", "gray.900");

  const [update, { isLoading }] = useAddCommentMutation();

  const handleUpdate = async () => {
    update({ body: { content: comment }, postId, page });
    setComment("");
  };

  return (
    <FormControl
      width="100%"
      mt={4}
      p={4}
      borderRadius={10}
      bg={bg}
      isDisabled={isLoading}
    >
      <FormLabel>Your comment:</FormLabel>
      <Flex>
        <Input
          isDisabled={isLoading}
          type="text"
          name="comment"
          placeholder="Your comment"
          max={100}
          resize="none"
          maxW="600px"
          value={comment}
          onChange={(e) => setComment(e.target.value)}
        />
        <Button
          colorScheme="linkedin"
          ml={4}
          isLoading={isLoading}
          onClick={handleUpdate}
          isDisabled={comment.length === 0}
        >
          Add comment
        </Button>
      </Flex>
    </FormControl>
  );
};

export { CommentsInput };
