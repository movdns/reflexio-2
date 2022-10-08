import React, { Dispatch, FC, SetStateAction } from "react";
import {
  AppBar,
  Toolbar,
  Box,
  Typography,
  Avatar,
  Button,
} from "@mui/material";
import Glyph from "../../../components/Glyph";
import GlyphButton from "../../../components/Glyph/GlyphButton";
import { useAuth, useUser } from "reactfire";
import clearFirestoreCache from "../../../common/firebase/clearFirestoreCache";
import getUserInitials from "../../../components/Auth/helpers/getUserInitials";

type HeaderProps = {
  toggleSidebar?: () => void;
  sx?: any;
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
              {currentUser?.photoURL ? (
                <img src={currentUser.photoURL} width="100%" alt="" />
              ) : (
                <>{getUserInitials(currentUser?.displayName)}</>
              )}
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
                sx={{
                  ml: 1,
                  // color: "#fb9678",
                }}
              >
                Denys
              </Typography>
            </Box>
          </Button>
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Header;
