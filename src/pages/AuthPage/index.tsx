import React, { FC } from "react";
import { collection, getDocs, query, where, addDoc } from "firebase/firestore";
import { Stack, Box, Button } from "@mui/material";
import GitHubIcon from "@mui/icons-material/GitHub";
import GoogleIcon from "@mui/icons-material/Google";
import { useAuth, useFirestore } from "reactfire";
import Glyph from "~/components/shared/Glyph";
import firebase from "firebase/compat/app";
import {
  GoogleAuthProvider,
  GithubAuthProvider,
  signInWithPopup,
  signInAnonymously,
} from "firebase/auth";

const SignInScreen: FC = () => {
  const auth = useAuth();
  const firestore = useFirestore();

  const googleProvider = new GoogleAuthProvider();
  const gitProvider = new GithubAuthProvider();

  const signInAnonymouslyHandler = () => {
    signInAnonymously(auth)
      .then()
      .catch((error) => {
        console.log(error);
      });
  };

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
    <Box mt={5} width="100%">
      <Stack spacing={2} direction="column">
        <Button
          disabled
          variant="google"
          onClick={() => signInWithProvider(googleProvider)}
          startIcon={<GoogleIcon />}
          fullWidth
        >
          Google
        </Button>

        <Button
          disabled
          fullWidth
          variant="github"
          onClick={() => signInWithProvider(gitProvider)}
          startIcon={<GitHubIcon />}
        >
          GitHub
        </Button>

        <Button
          fullWidth
          variant="demo"
          startIcon={<Glyph code="rectangles-mixed" iconType="solid" />}
          onClick={() => signInAnonymouslyHandler()}
        >
          Demo
        </Button>
      </Stack>
    </Box>
  );
};

export default SignInScreen;
