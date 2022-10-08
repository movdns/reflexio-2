import React from "react";
import { Box, Typography } from "@mui/material";

const Logo = () => {
  return (
    <Box
      display="inline-flex"
      alignItems="center"
      justifyContent="start"
      width="100%"
    >
      <Box
        component={"img"}
        src="https://www.cutme.app/static/media/infinity_200.fd26f5004286feaf5740584abee9e586.svg"
        alt=""
        width={48}
        mr={1}
      />
      <Typography
        sx={{
          fontSize: "1.2rem",
          color: "gray",
          letterSpacing: 6,
          fontWeight: "100",
        }}
      >
        reflexio
      </Typography>
    </Box>
  );
};

export default Logo;
