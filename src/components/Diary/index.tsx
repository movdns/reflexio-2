import React from "react";
import DiarySkeleton from "./Skeleton";
import Header from "./Header";
import { Box, Container, Grid } from "@mui/material";
import LeftSidebar from "./LeftSidebar";
import RightSidebar from "./RightSidebar";
import Main from "./Main";
import bg from "../../common/assets/img/bg2.svg";

const Diary = () => {
  return (
    <Box component="main" py={4} height="100vh">
      <Container maxWidth={false}>
        <Grid container columns={24} spacing={3}>
          <Header />
        </Grid>

        <Grid container spacing={3} pt={4} mb={4}>
          <Box
            component={Grid}
            item
            lg={3}
            display={{ xs: "none", lg: "block" }}
          >
            <LeftSidebar />
          </Box>

          <Grid item xs={12} md={8} lg={6}>
            <Main />
          </Grid>

          <Grid item xs={12} md={4} lg={3}>
            <RightSidebar />
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
};

export default Diary;
