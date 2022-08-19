import React, { FC } from "react";
import { Avatar, Fab } from "@mui/material";
import getUserInitials from "../../Auth/helpers/getUserInitials";
import { useAuth, useUser } from "reactfire";
import clearFirestoreCache from "../../../common/firebase/clearFirestoreCache";

const Footer: FC = () => {
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
    <Fab
      sx={{ position: "fixed", bottom: 0, right: 0, margin: 2 }}
      onClick={handleLogout}
    >
      <Avatar sx={{ bgcolor: "primary.main" }}>
        {currentUser?.photoURL ? (
          <img src={currentUser.photoURL} width="100%" alt="" />
        ) : (
          <>{getUserInitials(currentUser?.displayName)}</>
        )}
      </Avatar>
    </Fab>
  );
};

export default Footer;
