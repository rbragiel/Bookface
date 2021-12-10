import React from "react";
import { Link } from "react-router-dom";
import { Box, Button, Flex, Grid, Image } from "@chakra-ui/react";
import { Tooltip } from "../components/tooltip";
import NotFoundImage from "../images/not_found.svg";
import { useTranslation } from "react-i18next";

const NotFound = () => {
  const { t } = useTranslation();
  return (
    <Grid flexDir="column" h="100%" w="100%" p="6">
      <Box>
        <Tooltip />
      </Box>
      <Flex flexDir="column">
        <Image src={NotFoundImage} alt="Page not found" alignSelf="center" />
        <Button
          colorScheme="yellow"
          as={Link}
          to="/"
          size="lg"
          mt="24"
          alignSelf="center"
        >
          {t("Main page")}
        </Button>
      </Flex>
    </Grid>
  );
};

export { NotFound };
