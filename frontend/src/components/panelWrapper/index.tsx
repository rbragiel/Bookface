import { Grid, useMediaQuery } from "@chakra-ui/react";
import React from "react";
import { Tooltip } from "../tooltip";
import { Breakpoints } from "@contants/breakpoints";

const PanelWrapper: React.FC = ({ children }) => {
  const [isSm] = useMediaQuery(Breakpoints.sm);

  return (
    <Grid
      w={isSm ? "100%" : ["50%", "50%", "50%", "50%", "60%"]}
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
