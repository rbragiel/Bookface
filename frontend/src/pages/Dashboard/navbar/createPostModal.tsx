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
import { useAppSelector } from "@store/hooks";
import React, { useEffect, useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { useToast } from "@chakra-ui/react";
import { addPostErrorToast, addPostSuccessToast } from "@toasts";

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
  } = useForm<FormState>();
  const { t } = useTranslation();
  const userId = useAppSelector((state) => state.auth.user?.userId);
  const toast = useToast();

  const inputRef = useRef<HTMLInputElement | null>(null);

  const [update, { isLoading, error, isSuccess }] = useAddPostMutation();

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setImage(e.target.files[0]);
    }
  };

  const onSubmit = handleSubmit(async (data) => {
    await update({ id: userId || "", data });
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
        <ModalHeader>Create new post</ModalHeader>
        <ModalBody>
          <Flex as={"form"} flexDir="column" width="100%">
            <FormControl>
              <FormLabel>{t("Title")}</FormLabel>
              <Input
                required
                placeholder={t("Title of your post")}
                {...register("title")}
                isDisabled={isLoading}
              />
              <FormErrorMessage>
                {errors.title?.message && t(errors.title.message)}
              </FormErrorMessage>
            </FormControl>
            <FormControl mt={4}>
              <FormLabel>{t("Content")}</FormLabel>
              <Textarea
                placeholder={t("Content of your post")}
                resize="none"
                required
                {...register("content")}
                isDisabled={isLoading}
              />
              <FormErrorMessage>
                {errors.content?.message && t(errors.content.message)}
              </FormErrorMessage>
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
            {image && <Text mt={2}>File name: {image.name}</Text>}
          </Flex>
        </ModalBody>
        <ModalFooter>
          <Button
            colorScheme="red"
            mr={3}
            onClick={close}
            isLoading={isLoading}
          >
            Cancel
          </Button>
          <Button
            colorScheme="yellow"
            type="submit"
            width="fit-content"
            alignSelf="center"
            isLoading={isLoading}
            onClick={onSubmit}
          >
            Create
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export { CreatePostModal };
