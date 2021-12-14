import React from "react";
import { Stack, Heading, Button, Link as StyledLink } from "@chakra-ui/react";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { PanelWrapper } from "../../panelWrapper";
import FormField from "../../forms/formField";
import { useAppDispatch, useAppSelector } from "../../../store/hooks";
import { login } from "../../../store/auth";

enum LoginFormFields {
  EMAIL = "email",
  PASSWORD = "password",
}

interface LoginForm {
  email: string;
  password: string;
}

const loginSchema = z.object({
  email: z
    .string()
    .email("Passed value is not an email.")
    .min(1, "Email is required."),
  password: z.string().min(1, "Password is required."),
});

const Login = () => {
  const { t } = useTranslation();
  const loading = useAppSelector((state) => state.auth.loading);
  const dispatch = useAppDispatch();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginForm>({
    resolver: zodResolver(loginSchema),
  });

  const handleLoginSubmit = handleSubmit(async (data) => {
    try {
      await dispatch(login(data));
    } catch (error) {}
  });

  const registerValue = <T extends LoginFormFields>(name: T) => register(name);

  return (
    <PanelWrapper>
      <Stack
        w="100%"
        as="form"
        spacing="6"
        justifyContent="center"
        alignItems="center"
        onSubmit={handleLoginSubmit}
      >
        <Heading as="h2" textAlign="center">
          {t("Sign in!")}
        </Heading>

        <FormField
          id="email"
          name={LoginFormFields.EMAIL}
          maxWidth="600px"
          label="Email address"
          helperText="An email given at registration proccess."
          type="email"
          placeholder={"Your email"}
          error={errors.email}
          register={registerValue}
          isDisabled={loading}
        />

        <FormField
          name={LoginFormFields.PASSWORD}
          id="password"
          maxWidth="600px"
          label="Email address"
          helperText="A password given at registration proccess."
          type="password"
          placeholder="Your password"
          error={errors.password}
          register={registerValue}
          isDisabled={loading}
        />

        <Button
          colorScheme="yellow"
          size="lg"
          type="submit"
          isLoading={loading}
        >
          {t("Click to login!")}
        </Button>

        <StyledLink as={Link} to="/register" fontSize="lg">
          {t("Don't have account?")} <b>{t("Register!")}</b>
        </StyledLink>
      </Stack>
    </PanelWrapper>
  );
};

export { Login };
