import React, { FC } from "react";
import { CssBaseline } from "@mui/material";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import customParseFormat from "dayjs/plugin/customParseFormat";
import { BrowserRouter as Router } from "react-router-dom";
import { ThemeProvider } from "~/context/ThemeContext";
import "~/common/assets/fontawesome/css/all.css";
import { getFirestore } from "firebase/firestore";
import isToday from "dayjs/plugin/isToday";
import firebase from "firebase/compat/app";
import { getAuth } from "firebase/auth";
import Root from "./Root";
import axios from "axios";
import dayjs from "dayjs";

import {
  AuthProvider,
  useFirebaseApp,
  useInitPerformance,
  FirestoreProvider,
} from "reactfire";

dayjs.extend(customParseFormat);
dayjs.extend(isToday);

const App: FC = () => {
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
          <ThemeProvider>
            <CssBaseline />
            <Router basename={process.env.PUBLIC_URL || "/"}>
              <Root />
            </Router>
          </ThemeProvider>
        </QueryClientProvider>
      </FirestoreProvider>
    </AuthProvider>
  );
};

export default App;
