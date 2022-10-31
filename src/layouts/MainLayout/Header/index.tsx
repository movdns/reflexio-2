import React, { FC } from "react";
import avatar_placeholder from "~/common/assets/images/avatar_placeholder.png";
import clearFirestoreCache from "~/common/firebase/clearFirestoreCache";
import GlyphButton from "~/components/shared/Glyph/GlyphButton";
import Glyph from "~/components/shared/Glyph";
import { useAuth, useUser } from "reactfire";
import {
  AppBar,
  Toolbar,
  Box,
  Typography,
  Avatar,
  Button,
  SxProps,
} from "@mui/material";

type HeaderProps = {
  toggleSidebar?: () => void;
  sx?: SxProps;
};

const Header: FC<HeaderProps> = ({ toggleSidebar, sx }) => {
  const auth = useAuth();
  const { data: currentUser } = useUser();

  const handleLogout = async () => {
    try {
      await auth.signOut();
      clearFirestoreCache();
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <AppBar sx={sx} elevation={0}>
      <Toolbar sx={{ background: "#fafbfb" }}>
        <GlyphButton p={5} onClick={toggleSidebar}>
          <Glyph size={24} code="bars" iconType="light" fullWidth />
        </GlyphButton>

        <Box flexGrow={1} />

        <Box display="flex" alignItems="center">
          <Button
            aria-label="menu"
            color="inherit"
            aria-controls="profile-menu"
            aria-haspopup="true"
            onClick={handleLogout}
          >
            <Avatar sx={{ bgcolor: "primary.main", width: 30, height: 30 }}>
              <img
                src={currentUser?.photoURL || avatar_placeholder}
                width="100%"
                alt=""
              />
            </Avatar>
            <Box
              sx={{
                display: {
                  xs: "none",
                  sm: "flex",
                },
                alignItems: "center",
              }}
            >
              <Typography
                color="textSecondary"
                variant="h5"
                fontWeight="400"
                sx={{ ml: 1 }}
              >
                Hi,
              </Typography>
              <Typography
                color="textSecondary"
                variant="h5"
                fontWeight="700"
                ml={1}
              >
                {currentUser?.displayName || "Anonymous"}
              </Typography>
            </Box>
          </Button>
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Header;
