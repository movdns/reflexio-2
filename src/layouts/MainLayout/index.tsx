import React, { useState, FC } from "react";
import { styled } from "@mui/material/styles";
import {
  Box,
  Button,
  Container,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Typography,
  useMediaQuery,
} from "@mui/material";
import Header from "./Header";
import LeftSidebar from "./LeftSidebar";
import Glyph from "../../components/Glyph";
import Calendar from "../../components/Calendar";

type MainLayoutProps = {
  children: any;
};

const MainLayout: FC<MainLayoutProps> = ({ children }) => {
  const [isSidebarOpen, setSidebarOpen] = useState(true);
  const lgUp = useMediaQuery((theme: any) => theme.breakpoints.up("lg"));

  const handleSidebar = () => {
    setSidebarOpen(!isSidebarOpen);
  };

  const colors = ["rgb(240, 239, 239)", "#f44336", "orange", "#4CAF50"];

  function getRandomInt(max: number) {
    return Math.floor(Math.random() * Math.floor(max));
  }

  function renderDay(day: any) {
    const date = day.getDate();
    const color = colors[getRandomInt(4)];

    return <div className="day" style={{ backgroundColor: color }}></div>;
  }

  return (
    <Box component="main">
      <Header
        toggleSidebar={handleSidebar}
        sx={{
          paddingLeft: isSidebarOpen && lgUp ? "300px" : "",
          backgroundColor: "#fbfbfb",
        }}
      />
      <LeftSidebar
        isSidebarOpen={isSidebarOpen}
        onSidebarClose={() => setSidebarOpen(false)}
      >
        <Box
          mt={2}
          display="flex"
          flexDirection="column"
          justifyContent="space-between"
          height="94%"
        >
          <Box mt={2}>
            <Calendar />
          </Box>

          <Box flexGrow={1}></Box>

          <Box>
            <List>
              <Box mt={1} mb={2} sx={{ opacity: 0.4 }}>
                <Typography
                  variant="h6"
                  fontWeight={500}
                  textTransform="uppercase"
                >
                  Settings
                </Typography>
              </Box>

              <ListItemButton
                sx={{
                  color: "#252525",
                }}
              >
                <ListItemIcon>
                  <Glyph
                    code="user-pen"
                    iconType="light"
                    color="#252525"
                    size={20}
                  />
                </ListItemIcon>

                <ListItemText>Account</ListItemText>
              </ListItemButton>

              <ListItemButton
                selected
                sx={{
                  color: "white",
                  backgroundColor: (theme) =>
                    `${theme.palette.primary.main}!important`,
                  borderRadius: 2,
                }}
              >
                <ListItemIcon>
                  <Glyph
                    code="palette"
                    iconType="light"
                    color="white"
                    size={20}
                  />
                </ListItemIcon>

                <ListItemText>Palette</ListItemText>
              </ListItemButton>

              <ListItemButton
                sx={{
                  color: "#252525",
                }}
              >
                <ListItemIcon>
                  <Glyph
                    code="screwdriver-wrench"
                    iconType="light"
                    color="#252525"
                    size={20}
                  />
                </ListItemIcon>

                <ListItemText>Icons</ListItemText>
              </ListItemButton>
            </List>
          </Box>

          {/*<img*/}
          {/*  src="https://cloud.netlifyusercontent.com/assets/344dbf88-fdf9-42bb-adb4-46f01eedd629/626eeb5a-08dc-48ca-8be3-e49702cfaf17/fantastical-heatmap-opt.jpg"*/}
          {/*  alt="dd"*/}
          {/*  width="100%"*/}
          {/*/>*/}
        </Box>
      </LeftSidebar>

      <PageWrapper>
        <Container
          maxWidth={false}
          sx={{
            paddingLeft: isSidebarOpen && lgUp ? "330px!important" : "",
          }}
        >
          <Box p={4}>{children}</Box>
        </Container>
      </PageWrapper>
    </Box>
  );
};

const PageWrapper = styled("div")(({ theme }) => ({
  display: "flex",
  flex: "1 1 auto",
  overflow: "hidden",

  backgroundColor: theme.palette.background.default,
  [theme.breakpoints.up("lg")]: {
    paddingTop: "64px",
  },
  [theme.breakpoints.down("lg")]: {
    paddingTop: "64px",
  },
}));

export default MainLayout;
