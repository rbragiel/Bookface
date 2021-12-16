import React from "react";
import { Stack, Image, Heading, Text, Button } from "@chakra-ui/react";
import EmailSuccess from "../../images/email_success.svg";
import EmailError from "../../images/email_error.svg";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import axios, { AxiosError } from "axios";

interface ResultProps {
  isSuccess: boolean;
  error: AxiosError | Error | null;
}

const _Result = ({ isSuccess, error }: ResultProps) => {
  const { t } = useTranslation();

  const src = isSuccess ? EmailSuccess : EmailError;

  const headingText = isSuccess
    ? t("Email confirmed successfully!")
    : t("Email confirmation failed!");

  const btnText = t("Go to main page now");
  const btnStyle = isSuccess ? "green" : "red";

  const link = isSuccess ? "/dashboard" : "/";

  const text = t(
    "You will be redirected shortly or you can go to main page now."
  );

  return (
    <>
      <Image src={src} maxW="500px" alt="succes" w="50%" />
      <Stack
        h="100%"
        spacing="6"
        justifyContent="center"
        alignItems="center"
        maxWidth="600px"
        w="50%"
        position="relative"
      >
        <Heading>{headingText}</Heading>
        <Text fontSize="xl" textAlign="center">
          {error &&
            (axios.isAxiosError(error)
              ? error.response?.data.message
              : error.message)}
          <br />
          {text}
        </Text>
        <Button as={Link} colorScheme={btnStyle} size="lg" to={link}>
          {btnText}
        </Button>
      </Stack>
    </>
  );
};

const Result = React.memo(_Result);
Result.displayName = "Result";

export { Result };
