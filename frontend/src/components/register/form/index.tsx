import React from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import * as z from "zod";
import { PanelWrapper } from "../../panelWrapper";
import { Button, Heading, Link as StyledLink, Stack } from "@chakra-ui/react";
import { Link } from "react-router-dom";
import FormField from "../../forms/formField";
import userApi from "../../../api/user";

enum RegisterFormFields {
  NICKNAME = "nickname",
  EMAIL = "email",
  PASSWORD = "password",
  REPEAT_PASSWORD = "repeatPassword",
}

interface RegisterForm {
  nickname: string;
  email: string;
  password: string;
  repeatPassword: string;
}

const registerFormSchema = z.object({
  nickname: z.string().min(6, "Nickname length must be at least 6 characters."),
  email: z
    .string()
    .email("Passed value is not an email.")
    .min(1, "Email is required."),
  password: z.string().min(6, "Password length must be at least 6 characters."),
  repeatPassword: z
    .string()
    .min(6, "Password length must be at least 6 characters."),
});

const RegisterForm = () => {
  const { t } = useTranslation();

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<RegisterForm>({
    resolver: zodResolver(registerFormSchema),
  });

  const handleRegisterSubmit = handleSubmit(async (data) => {
    try {
      await userApi.register(data);
      reset();
    } catch (error) {}
  });

  const registerValue = <T extends RegisterFormFields>(name: T) =>
    register(name);

  return (
    <PanelWrapper>
      <Stack
        w="100%"
        as="form"
        spacing="6"
        justifyContent="center"
        alignItems="center"
        onSubmit={handleRegisterSubmit}
      >
        <Heading as="h2" textAlign="center">
          {t("Sign up!")}
        </Heading>

        <FormField
          name={RegisterFormFields.NICKNAME}
          id="nickname"
          maxWidth="600px"
          label="Nickname"
          helperText="A nickname, which will be displayed to your friends."
          type="text"
          placeholder="Your nickname"
          error={errors.nickname}
          register={registerValue}
        />

        <FormField
          id="email"
          name={RegisterFormFields.EMAIL}
          maxWidth="600px"
          label="Email address"
          helperText="This way we can contact you."
          type="email"
          placeholder="Your email"
          error={errors.email}
          register={registerValue}
        />

        <FormField
          name={RegisterFormFields.PASSWORD}
          id="password"
          maxWidth="600px"
          label="Your password"
          helperText="Please remember to use safe password!"
          type="password"
          placeholder="Use +6 characters"
          error={errors.password}
          register={registerValue}
        />

        <FormField
          name={RegisterFormFields.REPEAT_PASSWORD}
          id="password"
          maxWidth="600px"
          label="Repeat your password"
          helperText="Pass the same password as given above."
          type="password"
          placeholder="Use +6 characters"
          error={errors.password}
          register={registerValue}
        />

        <Button colorScheme="yellow" size="lg" type="submit">
          {t("Click to register!")}
        </Button>

        <StyledLink as={Link} to="/" fontSize="lg">
          {t("Already have account?")} <b>{t("Sign in!")}</b>
        </StyledLink>
      </Stack>
    </PanelWrapper>
  );
};

export { RegisterForm };
