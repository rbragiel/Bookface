import React, { useEffect } from "react";
import {
  useToast,
  useColorModeValue,
  Flex,
  FormControl,
  FormLabel,
  Input,
  FormErrorMessage,
  Textarea,
  Button,
} from "@chakra-ui/react";
import { postSchema } from "@common/schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useModifyPostMutation } from "@store/api";
import { Post } from "@store/api/types";
import { modifyPostSuccessToast, modifyPostErrorToast } from "@toasts";
import { useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";

interface PostEditProps {
  post: Post;
  userId: string;
  stopEditing: () => void;
}

const PostEdit = ({ post, stopEditing, userId }: PostEditProps) => {
  const toast = useToast();
  const [modify, { isLoading, isSuccess, isError }] = useModifyPostMutation();

  const inputBg = useColorModeValue("white", "gray.800");
  const {
    formState: { errors },
    register,
    handleSubmit,
  } = useForm<{ title: string; content: string }>({
    defaultValues: {
      content: post.postData.content,
      title: post.postData.title,
    },
    resolver: zodResolver(postSchema),
  });

  const { t } = useTranslation();

  const onSubmit = handleSubmit(async (data) => {
    modify({ userId, postId: post.postData.postId, data });
  });

  useEffect(() => {
    if (isSuccess) {
      stopEditing();
      toast(modifyPostSuccessToast());
    }
    if (isError) {
      stopEditing();
      toast(modifyPostErrorToast());
    }
  }, [isError, isSuccess, stopEditing, toast]);

  return (
    <Flex as={"form"} flexDir="column" width="100%">
      <FormControl isInvalid={!!errors.title?.message}>
        <FormLabel>{t("Title")}</FormLabel>
        <Input
          required
          placeholder={t("Title of your post")}
          {...register("title")}
          isDisabled={isLoading}
          background={inputBg}
        />
        <FormErrorMessage>
          {errors.title?.message && t(errors.title.message)}
        </FormErrorMessage>
      </FormControl>
      <FormControl mt={4} isInvalid={!!errors.content?.message}>
        <FormLabel>{t("Content")}</FormLabel>
        <Textarea
          placeholder={t("Content of your post")}
          resize="none"
          required
          {...register("content")}
          isDisabled={isLoading}
          background={inputBg}
        />
        <FormErrorMessage>
          {errors.content?.message && t(errors.content.message)}
        </FormErrorMessage>
      </FormControl>
      <Flex alignSelf="flex-end" mt={3}>
        <Button colorScheme="red" mr={3} onClick={stopEditing}>
          {t("Cancel")}
        </Button>
        <Button colorScheme="teal" onClick={onSubmit}>
          {t("Save")}
        </Button>
      </Flex>
    </Flex>
  );
};

export { PostEdit };
