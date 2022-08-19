import React, { FC } from "react";
import { Box, Card, Typography } from "@mui/material";

type SectionProps = {
  title: string;
  actions?: any;
  children: any;
};

const GlyphSection: FC<SectionProps> = ({ title, actions, children }) => {
  return (
    <Box pb={2}>
      <Card>
        <Box p={2}>
          <Box
            display="flex"
            justifyContent="space-between"
            alignItems="center"
            sx={{ color: "#BDB4B450" }}
            pb={1}
          >
            <Typography
              sx={{ color: "#BDB4B4", fontSize: "1em", fontWeight: "lighter" }}
            >
              {title}
            </Typography>
            {actions}
          </Box>
          <Box>{children}</Box>
        </Box>
      </Card>
    </Box>
  );
};

export default GlyphSection;
