import React, { FC } from "react";
import Glyph from "~/components/shared/Glyph";
import { Box, Typography } from "@mui/material";

const Logo: FC<{ size?: "small" | "medium" | "large" }> = ({ size }) => (
  <Box
    display="inline-flex"
    alignItems="center"
    justifyContent="start"
    width="100%"
  >
    <Glyph
      code="flux-capacitor"
      size={size === "large" ? 45 : size === "small" ? 28 : 35}
    />
    <Typography
      pl={2}
      sx={{
        fontSize:
          size === "large" ? "2rem" : size === "small" ? "1.2rem" : "1.5rem",
        letterSpacing: 6,
        fontWeight: 100,
      }}
    >
      reflexio
    </Typography>
  </Box>
);

export default Logo;
