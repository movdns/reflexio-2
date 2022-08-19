import React from "react";
import {
  GoogleAuthProvider,
  GithubAuthProvider,
  signInWithPopup,
} from "firebase/auth";
import { Stack, Typography, Box, Button } from "@mui/material";
import GitHubIcon from "@mui/icons-material/GitHub";
import GoogleIcon from "@mui/icons-material/Google";
import { useAuth, useFirestore } from "reactfire";
import { collection, getDocs, query, where, addDoc } from "firebase/firestore";
import firebase from "firebase/compat/app";

const SignInScreen: React.FC = () => {
  const auth = useAuth();
  const firestore = useFirestore();

  const googleProvider = new GoogleAuthProvider();
  const gitProvider = new GithubAuthProvider();

  const signInWithProvider = async (provider: firebase.auth.AuthProvider) => {
    const authProvider = typeof GoogleAuthProvider
      ? "google"
      : typeof GithubAuthProvider
      ? "github"
      : null;

    try {
      const { user } = await signInWithPopup(auth, provider);

      const q = query(
        collection(firestore, "users"),
        where("uid", "==", user.uid)
      );
      const users = await getDocs(q);

      if (!users.docs.length) {
        await addDoc(collection(firestore, "users"), {
          uid: user.uid,
          name: user.displayName,
          email: user.email,
          photoURL: user.photoURL,
          authProvider,
        });
      }
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <>
      <Typography
        variant="h4"
        component="h1"
        fontWeight="100"
        textAlign="right"
      >
        Authorization
      </Typography>

      <Box mt={5} width="100%">
        <Stack spacing={2} direction="column">
          <Button
            variant="google"
            size="large"
            onClick={() => signInWithProvider(googleProvider)}
            startIcon={<GoogleIcon />}
            fullWidth
          >
            Google
          </Button>

          <Button
            fullWidth
            variant="github"
            size="large"
            onClick={() => signInWithProvider(gitProvider)}
            startIcon={<GitHubIcon />}
          >
            GitHub
          </Button>
        </Stack>
      </Box>
    </>
  );
};

export default SignInScreen;
