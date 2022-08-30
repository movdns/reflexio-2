import React, { FC } from "react";
import { Box, Container, Grid } from "@mui/material";
import Header from "./Header";
import LeftSidebar from "./LeftSidebar";
import RightSidebar from "./RightSidebar";
import Main from "./Main";
import Footer from "./Footer";

const Diary: FC = () => {
  return (
    <Box component="main">
      <Container maxWidth={false}>
        <Grid container columns={24} spacing={3} mt={{ xs: 8, md: 0 }}>
          <Header />
        </Grid>

        <Grid container spacing={3} pt={4} mb={4}>
          <Box component={Grid} item xs={12} md={6} lg={3}>
            <LeftSidebar />
          </Box>

          <Grid item xs={12} md={6} lg={9} xl={6}>
            <Main />
          </Grid>

          <Grid
            item
            xs={12}
            md={4}
            lg={3}
            display={{ xs: "none", sm: "block" }}
            xl={3}
          >
            <RightSidebar />
          </Grid>
        </Grid>

        <Grid container>
          <Footer />
        </Grid>
      </Container>
    </Box>
  );
};

export default Diary;
