import {
  FormControl,
  FormLabel,
  Flex,
  Input,
  Button,
  useColorModeValue,
  useToast,
} from "@chakra-ui/react";
import { useAddCommentMutation } from "@store/api";
import { addCommentErrorToast, addCommentSuccessToast } from "@toasts";
import React, { useState } from "react";
import { useTranslation } from "react-i18next";

interface CommentsInputProps {
  postId: string;
}

const CommentsInput = ({ postId }: CommentsInputProps) => {
  const [comment, setComment] = useState("");
  const bg = useColorModeValue("gray.100", "gray.900");

  const [update, { isLoading }] = useAddCommentMutation();
  const toast = useToast();

  const { t } = useTranslation();

  const handleUpdate = async () => {
    try {
      await update({ body: { content: comment }, postId }).unwrap();
      toast(addCommentSuccessToast());
      setComment("");
    } catch (error) {
      toast(addCommentErrorToast());
    }
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
      <FormLabel>{t("Your comment")}:</FormLabel>
      <Flex>
        <Input
          isDisabled={isLoading}
          type="text"
          name="comment"
          placeholder={t("Your comment")}
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
          {t("Add comment")}
        </Button>
      </Flex>
    </FormControl>
  );
};

export { CommentsInput };
