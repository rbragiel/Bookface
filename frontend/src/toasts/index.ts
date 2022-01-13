import { UseToastOptions } from "@chakra-ui/react";
import i18n from "@i18n";

export const loginSuccessToast = (): UseToastOptions => ({
  title: i18n.t("Success"),
  description: i18n.t("Logged in successfully!"),
  status: "success",
  duration: 5000,
  isClosable: true,
});

export const loginErrorToast = (message: string): UseToastOptions => ({
  title: i18n.t("Error"),
  description: message,
  status: "error",
  duration: 5000,
  isClosable: true,
});

export const registerSuccessToast = (): UseToastOptions => ({
  title: i18n.t("Success"),
  description: i18n.t(
    "Registered successfully! We've sent you an email to activate your account."
  ),
  status: "success",
  duration: 9000,
  isClosable: true,
});

export const registerErrorToast = (message: string): UseToastOptions => ({
  title: i18n.t("Error"),
  description: message,
  status: "error",
  duration: 5000,
  isClosable: true,
});

export const addPostSuccessToast = (): UseToastOptions => ({
  title: i18n.t("Success"),
  description: i18n.t("Post created successfully!"),
  status: "success",
  duration: 5000,
  isClosable: true,
});

export const addPostErrorToast = (): UseToastOptions => ({
  title: i18n.t("Error"),
  description: i18n.t("Error occured while adding the post."),
  status: "error",
  duration: 5000,
  isClosable: true,
});
