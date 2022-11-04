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
  useMediaQuery,
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

  const xs = useMediaQuery((theme: any) => theme.breakpoints.down("sm"));

  return (
    <AppBar sx={sx} elevation={0}>
      <Toolbar>
        <Box display="flex" width="100%">
          <Box order={xs ? 2 : 0}>
            <GlyphButton p={5} onClick={toggleSidebar}>
              <Glyph
                size={24}
                code="bars"
                iconType="solid"
                fullWidth
                color="turquoise"
              />
            </GlyphButton>
          </Box>

          <Box flexGrow={1} order={1} />

          <Box display="flex" alignItems="center" order={xs ? 0 : 2}>
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
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Header;
