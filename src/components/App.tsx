import React from "react";
import { BrowserRouter as Router } from "react-router-dom";
import {
  AuthProvider,
  useFirebaseApp,
  useInitPerformance,
  FirestoreProvider,
} from "reactfire";

import { getAuth } from "firebase/auth";
import { CssBaseline } from "@mui/material";
import { ThemeProvider } from "../context/ThemeContext";
import Root from "./Root";
import { getFirestore } from "firebase/firestore";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

import firebase from "firebase/compat/app";

const App: React.FC = () => {
  firebase.setLogLevel("silent");

  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        refetchOnWindowFocus: false,
      },
    },
  });

  const firebaseApp = useFirebaseApp();
  const firestoreInstance = getFirestore(useFirebaseApp());

  const auth = getAuth(firebaseApp);

  useInitPerformance(async (firebaseApp) => {
    const { getPerformance } = await import("firebase/performance");
    return getPerformance(firebaseApp);
  });

  return (
    <AuthProvider sdk={auth}>
      <FirestoreProvider sdk={firestoreInstance}>
        <QueryClientProvider client={queryClient}>
          <Router basename={process.env.PUBLIC_URL || "/"}>
            <ThemeProvider>
              <CssBaseline />
              <Root />
            </ThemeProvider>
          </Router>
        </QueryClientProvider>
      </FirestoreProvider>
    </AuthProvider>
  );
};

export default App;
