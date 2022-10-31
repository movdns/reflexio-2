import React from "react";
import firebaseConfig from "./common/firebase/firebaseConfig";
import reportWebVitals from "./reportWebVitals";
import { FirebaseAppProvider } from "reactfire";
import App from "./components/App";

import { createRoot } from "react-dom/client";
const container = document.getElementById("root");
const root = createRoot(container!);
root.render(
  // <React.StrictMode>
  <FirebaseAppProvider firebaseConfig={firebaseConfig}>
    <App />
  </FirebaseAppProvider>
  // </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
