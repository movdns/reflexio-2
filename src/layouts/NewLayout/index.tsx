import React, { FC, ReactNode } from "react";
import { Box, Container } from "@mui/material";
import Header from "./Header";

type NewLayoutProps = {
  children: ReactNode;
};

const NewLayout: FC<NewLayoutProps> = ({ children }) => {
  return (
    <Box component="main">
      {/*<Header*/}
      {/*  sx={{*/}
      {/*    backgroundColor: "#fefefe",*/}
      {/*    boxShadow: "rgb(90 114 123 / 11%) 0px 7px 30px 0px",*/}
      {/*  }}*/}
      {/*/>*/}
      <Container maxWidth="xl">{children}</Container>
    </Box>
  );
};

export default NewLayout;
