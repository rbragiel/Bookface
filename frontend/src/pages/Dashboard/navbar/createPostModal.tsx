import {
  Button,
  Flex,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Input,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Textarea,
  Text,
} from "@chakra-ui/react";
import { useAddPostMutation } from "@store/api";
import React, { useEffect, useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { useToast } from "@chakra-ui/react";
import { addPostErrorToast, addPostSuccessToast } from "@toasts";
import { zodResolver } from "@hookform/resolvers/zod";
import { postSchema } from "@common/schema";

interface CreatePostModalProps {
  close: () => void;
  isOpen: boolean;
}

interface FormState {
  content: string;
  title: string;
}

const CreatePostModal = ({ close, isOpen }: CreatePostModalProps) => {
  const [image, setImage] = useState<File | null>(null);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormState>({
    resolver: zodResolver(postSchema),
  });
  const { t } = useTranslation();
  const toast = useToast();

  const inputRef = useRef<HTMLInputElement | null>(null);

  const [update, { isLoading, error, isSuccess }] = useAddPostMutation();

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setImage(e.target.files[0]);
    }
  };

  const onSubmit = handleSubmit(async ({ title, content }) => {
    const formData = new FormData();
    formData.append("title", title);
    formData.append("content", content);
    if (image) {
      formData.append("file", image);
    }

    await update({ data: formData });
  });

  const handleClose = () => {
    if (!isLoading) {
      close();
    }
  };

  useEffect(() => {
    if (error) {
      toast(addPostErrorToast());
    }
    if (isSuccess) {
      toast(addPostSuccessToast());
      close();
    }
  }, [close, error, isSuccess, toast]);

  return (
    <Modal onClose={handleClose} isOpen={isOpen} size="xl">
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>{t("Create new post")}</ModalHeader>
        <ModalBody>
          <Flex as={"form"} flexDir="column" width="100%">
            <FormControl isInvalid={!!errors.title?.message}>
              <FormLabel>{t("Title")}</FormLabel>
              <Input
                required
                placeholder={t("Title of your post")}
                {...register("title")}
                isDisabled={isLoading}
              />
              {errors.title?.message && (
                <FormErrorMessage>{t(errors.title.message)}</FormErrorMessage>
              )}
            </FormControl>
            <FormControl mt={4} isInvalid={!!errors.title?.message}>
              <FormLabel>{t("Content")}</FormLabel>
              <Textarea
                placeholder={t("Content of your post")}
                resize="none"
                required
                {...register("content")}
                isDisabled={isLoading}
              />
              {errors.content?.message && (
                <FormErrorMessage>{t(errors.content.message)}</FormErrorMessage>
              )}
            </FormControl>
            <FormControl mt={4} display="flex" alignItems="center">
              <FormLabel>{t("Image")}</FormLabel>
              <Input
                placeholder={t("Image of your post")}
                type="file"
                accept="image/*"
                display="none"
                name="image"
                ref={inputRef}
                onChange={onChange}
              />
              <Button
                colorScheme="teal"
                onClick={() => {
                  inputRef.current?.click();
                }}
                isLoading={isLoading}
              >
                {t("Upload file")}
              </Button>
            </FormControl>
            {image && (
              <Text mt={2}>
                {t("Filename")}: {image.name}
              </Text>
            )}
          </Flex>
        </ModalBody>
        <ModalFooter>
          <Button
            colorScheme="red"
            mr={3}
            onClick={close}
            isLoading={isLoading}
          >
            {t("Cancel")}
          </Button>
          <Button
            colorScheme="yellow"
            type="submit"
            width="fit-content"
            alignSelf="center"
            isLoading={isLoading}
            onClick={onSubmit}
          >
            {t("Create")}
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export { CreatePostModal };
