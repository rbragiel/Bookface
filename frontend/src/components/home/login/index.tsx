import React from "react";
import {
  FormControl,
  FormHelperText,
  FormLabel,
  Input,
  Stack,
  Heading,
  Button,
  Link as StyledLink,
  FormErrorMessage,
} from "@chakra-ui/react";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { PanelWrapper } from "../../panelWrapper";

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

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginForm>({
    resolver: zodResolver(loginSchema),
  });

  const handleLoginSubmit = handleSubmit((data) => console.log(data));
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
        <FormControl id="email" maxWidth="600px" isInvalid={!!errors.email}>
          <FormLabel>{t("Email address")}</FormLabel>
          <Input
            type="email"
            placeholder={t("Your email")}
            {...register(LoginFormFields.EMAIL)}
          />
          <FormHelperText>
            {t("An email given at registration proccess.")}
          </FormHelperText>
          <FormErrorMessage>
            {errors.email && errors.email.message && t(errors.email.message)}
          </FormErrorMessage>
        </FormControl>
        <FormControl
          id="password"
          maxWidth="600px"
          isInvalid={!!errors.password}
        >
          <FormLabel>{t("Password")}</FormLabel>
          <Input
            type="password"
            placeholder={t("Your password")}
            {...register(LoginFormFields.PASSWORD)}
          />
          <FormHelperText>
            {t("A password given at registration proccess.")}
          </FormHelperText>
          <FormErrorMessage>
            {errors.password &&
              errors.password.message &&
              t(errors.password.message)}
          </FormErrorMessage>
        </FormControl>
        <Button colorScheme="yellow" size="lg" type="submit">
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
