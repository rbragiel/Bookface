import React, { useState } from "react";
import {
  Button,
  Flex,
  FormControl,
  FormLabel,
  Input,
  useMediaQuery,
  useToast,
} from "@chakra-ui/react";
import { Breakpoints } from "@contants/breakpoints";
import { useTranslation } from "react-i18next";
import { useUpdateCommentMutation } from "@store/api";
import { modifyCommentSuccessToast, modifyCommentErrorToast } from "@toasts";

interface EditableInputProps {
  content: string;
  postId: string;
  commentId: string;
  cancel: () => void;
  page: number;
}

const EditableInput = ({
  content,
  postId,
  commentId,
  cancel,
  page,
}: EditableInputProps) => {
  const [comment, setComment] = useState(content);
  const [isXs] = useMediaQuery(Breakpoints.xs);
  const { t } = useTranslation();
  const toast = useToast();
  const [update, { isLoading }] = useUpdateCommentMutation();

  const handleUpdate = async () => {
    try {
      await update({
        body: { content: comment },
        commentId,
        postId,
        page,
      }).unwrap();

      toast(modifyCommentSuccessToast());
    } catch (error) {
      toast(modifyCommentErrorToast());
    } finally {
      cancel();
    }
  };

  return (
    <FormControl width="100%" mt={4} p={4} borderRadius={10}>
      <FormLabel>{t("Your comment")}:</FormLabel>
      <Flex flexDir={isXs ? "column" : "row"}>
        <Input
          type="text"
          name="comment"
          placeholder={t("Your comment")}
          max={100}
          maxW="600px"
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          isDisabled={isLoading}
        />
        <Flex>
          <Button
            mt={isXs ? 4 : 0}
            colorScheme="linkedin"
            ml={isXs ? 0 : 4}
            onClick={handleUpdate}
            isLoading={isLoading}
          >
            {t("Update comment")}
          </Button>
          <Button
            mt={isXs ? 4 : 0}
            colorScheme="red"
            ml={4}
            onClick={cancel}
            isLoading={isLoading}
          >
            {t("Cancel")}
          </Button>
        </Flex>
      </Flex>
    </FormControl>
  );
};

export { EditableInput };
