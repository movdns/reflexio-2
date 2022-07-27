import React from "react";
import { Avatar, Box, Grid, IconButton, Tooltip } from "@mui/material";
import LogoutIcon from "@mui/icons-material/Logout";
import LightModeIcon from "@mui/icons-material/LightMode";
import { DarkMode } from "@mui/icons-material";
import { useThemeContext } from "../../../context/ThemeContext";
import getUserInitials from "./helpers/getUserInitials";
import { useAuth, useUser } from "reactfire";
import clearFirestoreCache from "../../../common/firebase/clearFirestoreCache";
import DayCardList from "./DayCardList";

const Header = () => {
  const { mode, toggleMode } = useThemeContext();

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
    <>
      <DayCardList />

      <Box
        component={Grid}
        item
        display={{ xs: "none", md: "block" }}
        md={2}
        lg={1}
      >
        <Box
          width="100%"
          height="100%"
          display="flex"
          flexDirection="column"
          alignItems="center"
          justifyContent="space-between"
        >
          <Box width="100%" display="flex" justifyContent="space-around">
            <Tooltip title={currentUser?.email || "anonymous"}>
              <Avatar sx={{ bgcolor: "primary.main" }}>
                {currentUser?.photoURL ? (
                  <img src={currentUser.photoURL} width="100%" alt="" />
                ) : (
                  <>{getUserInitials(currentUser?.displayName)}</>
                )}
              </Avatar>
            </Tooltip>
            <Tooltip title="logout">
              <IconButton size="medium" onClick={handleLogout}>
                <LogoutIcon color="secondary" />
              </IconButton>
            </Tooltip>
          </Box>

          <IconButton size="medium" onClick={toggleMode}>
            {mode === "light" ? (
              <DarkMode color="secondary" />
            ) : (
              <LightModeIcon color="secondary" />
            )}
          </IconButton>
        </Box>
      </Box>
    </>
  );
};

export default Header;
