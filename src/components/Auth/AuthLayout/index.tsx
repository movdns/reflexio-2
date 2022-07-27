import React from "react";
import { Grid } from "@mui/material";
import Box from "@mui/material/Box";
import useStyles from "./useStyles";
import bg from "../../../common/assets/img/bg2.svg";

const AuthLayout = ({ children }: { children: any }) => {
  const classes = useStyles();

  return (
    <Grid container component="main" classes={{ root: classes.wrapper }}>
      <Grid item xs={false} md={8} classes={{ root: classes.leftSide }} />
      <Grid
        item
        xs={12}
        md={4}
        display="flex"
        flexDirection="column"
        alignItems="center"
        sx={{ background: `url(${bg})` }}
      >
        <Box
          display="flex"
          flexDirection="column"
          alignItems="center"
          justifyContent="center"
          width="70%"
          height="100%"
        >
          <Box width="90%">{children}</Box>
        </Box>
      </Grid>
    </Grid>
  );
};

export default AuthLayout;
