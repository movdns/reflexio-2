import React from "react";
import Header from "./Header";
import {
  AppBar,
  Avatar,
  Box,
  Container,
  Fab,
  Grid,
  IconButton,
  Toolbar,
} from "@mui/material";

import LeftSidebar from "./LeftSidebar";
import RightSidebar from "./RightSidebar";
import Main from "./Main";
import MobileNav from "./Header/MobileNav";
import { useDiaryContext } from "../../context/DiaryContext";
import Glyph from "./Glyphs/Glyph";

const Diary = () => {
  const { days } = useDiaryContext();
  return (
    <Box component="main" py={4} height="100vh">
      <Container maxWidth={false}>
        <MobileNav days={days} />
        <Grid container columns={24} spacing={3} mt={4}>
          <Header />
        </Grid>

        <Grid container spacing={3} pt={4} mb={4}>
          <Box
            component={Grid}
            item
            xs={12}
            md={6}
            lg={3}
            // display={{ xs: "none", lg: "block" }}
          >
            <LeftSidebar />
          </Box>

          <Grid item xs={12} md={6} lg={6}>
            <Main />
          </Grid>

          <Grid item xs={12} md={4} lg={3} display={{ xs: "none" }}>
            <RightSidebar />
          </Grid>
        </Grid>

        {/*<AppBar*/}
        {/*  position="fixed"*/}
        {/*  color="secondary"*/}
        {/*  sx={{ top: "auto", bottom: 0 }}*/}
        {/*>*/}
        {/*  <Toolbar>*/}
        {/*    <Avatar />*/}
        {/*  </Toolbar>*/}
        {/*</AppBar>*/}
      </Container>
    </Box>
  );
};

export default Diary;
