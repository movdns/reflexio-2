import React, { useState, FC, ReactElement } from "react";
import { Box, Container, useMediaQuery } from "@mui/material";
import Calendar from "../../components/shared/Calendar";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { styled } from "@mui/material/styles";
import "./styles.css";
import LeftSidebar from "./LeftSidebar";
import Header from "./Header";

type MainLayoutProps = {
  children: ReactElement;
};

const MainLayout: FC<MainLayoutProps> = ({ children }) => {
  const lgUp = useMediaQuery((theme: any) => theme.breakpoints.up("xxxl"));
  const xs = useMediaQuery((theme: any) => theme.breakpoints.down("sm"));

  const [isSidebarOpen, setSidebarOpen] = useState(lgUp);

  const handleSidebar = () => {
    setSidebarOpen(!isSidebarOpen);
  };

  return (
    <Box component="main">
      <Header
        toggleSidebar={handleSidebar}
        sx={{
          // top: xs ? "auto" : 0,
          // bottom: xs ? 0 : "auto",
          paddingLeft: isSidebarOpen && lgUp ? "300px" : "",
          backgroundColor: "#fbfbfb",
          //backgroundColor: { xs: "yellow", sm: "orange", md: "tomato" },
        }}
      />
      <LeftSidebar
        isSidebarOpen={isSidebarOpen}
        onSidebarClose={() => setSidebarOpen(false)}
      >
        <Box mt={6}>
          <Calendar />
        </Box>
      </LeftSidebar>

      <PageWrapper>
        <Container
          maxWidth={false}
          sx={{
            paddingLeft: isSidebarOpen && lgUp ? "330px!important" : "",
          }}
        >
          <Box p={{ xs: 0, lg: 4 }} mb={2}>
            {children}
          </Box>
        </Container>
      </PageWrapper>
      <ToastContainer />
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
  [theme.breakpoints.down("sm")]: {
    paddingTop: "64px",
  },
}));

export default MainLayout;
