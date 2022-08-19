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
import { getFirestore } from "firebase/firestore";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import "../common/assets/fontawesome/css/all.css";
import Root from "./Root";

import firebase from "firebase/compat/app";
import axios from "axios";

const App: React.FC = () => {
  firebase.setLogLevel("silent");

  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        refetchOnWindowFocus: true,
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

  axios.interceptors.request.use(async function (request) {
    const user = auth.currentUser;
    if (user) {
      try {
        const token = await user.getIdToken(false); // Force refresh is false
        request.headers!.Authorization = `Bearer ${token}`;
      } catch (error) {
        console.log("Error obtaining auth token in interceptor, ", error);
      }
    }

    return request;
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
