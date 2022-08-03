import React from "react";
import { Box, Typography } from "@mui/material";

type SectionProps = {
  title: string;
  actions?: any;
  children: any;
};

const Section: React.FC<SectionProps> = ({ title, actions, children }) => {
  return (
    <Box p={2}>
      <Box
        display="flex"
        justifyContent="space-between"
        alignItems="center"
        sx={{ color: "#BDB4B450" }}
        pb={1}
      >
        <Typography
          sx={{ color: "#BDB4B4", fontSize: "1.4em", fontWeight: "lighter" }}
        >
          {title}
        </Typography>
        {actions}
      </Box>
      <Box>{children}</Box>
    </Box>
  );
};

export default Section;
