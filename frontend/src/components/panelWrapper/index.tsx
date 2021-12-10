import { Grid } from "@chakra-ui/react";
import React from "react";
import { Tooltip } from "../tooltip";

const PanelWrapper: React.FC = ({ children }) => {
  return (
    <Grid
      w={["50%", "50%", "50%", "50%", "60%"]}
      p={[4, 6, 8, 10]}
      h="100%"
      gridAutoColumns="100%"
      templateRows="1fr 6fr"
      justifyContent="center"
      alignItems="center"
    >
      <Tooltip />
      {children}
    </Grid>
  );
};

export { PanelWrapper };
