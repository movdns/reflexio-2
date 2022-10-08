import React, { FC, useState } from "react";
import { Box, Drawer, List, Theme, useMediaQuery } from "@mui/material";
import Logo from "../../../components/Logo";

type LeftSidebarProps = {
  isSidebarOpen: boolean;
  onSidebarClose: () => void;
  children: any;
};

const LeftSidebar: FC<LeftSidebarProps> = ({
  isSidebarOpen,
  onSidebarClose,
  children,
}) => {
  const lgUp = useMediaQuery((theme: any) => theme.breakpoints.up("lg"));

  const SidebarContent = (
    <Box p={2} height="100%">
      <Logo />
      {children}
    </Box>
  );
  if (lgUp) {
    return (
      <Drawer
        anchor="left"
        open={isSidebarOpen}
        variant="persistent"
        PaperProps={{
          sx: {
            width: "300px",
            border: "0 !important",
            boxShadow: "0px 7px 30px 0px rgb(113 122 131 / 11%)",
          },
        }}
      >
        {SidebarContent}
      </Drawer>
    );
  }
  return (
    <Drawer
      anchor="left"
      open={true}
      onClose={onSidebarClose}
      PaperProps={{
        sx: {
          width: "265px",
          border: "0 !important",
        },
      }}
      variant="temporary"
    >
      {SidebarContent}
    </Drawer>
  );
};

export default LeftSidebar;
