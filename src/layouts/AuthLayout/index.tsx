import React, { FC, ReactNode } from "react";
import Logo from "~/components/shared/Logo";
import { Grid, Box } from "@mui/material";
import useStyles from "./useStyles";

const AuthLayout: FC<{ children: ReactNode }> = ({ children }) => {
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
      >
        <Box
          display="flex"
          flexDirection="column"
          alignItems="center"
          justifyContent="center"
          width="70%"
          height="100%"
        >
          <Box width="90%">
            <Box mb={2}>
              <Logo size="medium" />
            </Box>
            {children}
          </Box>
        </Box>
      </Grid>
    </Grid>
  );
};

export default AuthLayout;
