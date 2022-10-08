import React, { FC, useEffect, useState } from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import AuthLayout from "../Auth/AuthLayout";
import SignInScreen from "../Auth/SignInScreen";
import { useUser } from "reactfire";

import DiaryPage from "../../pages/DiaryPage";
import { DiaryProvider } from "../../context/DiaryContext";
import PullToRefresh from "react-simple-pull-to-refresh";
// import { ThemeProvider } from "../../context/ThemeContext";
import Compose from "../../context/Compose";
import { SettingsProvider } from "../../context/SettingsContext";
import PalettePage from "../../pages/PalettePage";

const Root: FC = () => {
  const {
    data: user,
    // hasEmitted,
    firstValuePromise,
  } = useUser();
  const [isUserLoaded, setIsUserLoaded] = useState(false);
  const isLogged = !!user;

  useEffect(() => {
    firstValuePromise.then(() => setIsUserLoaded(true));
  }, [firstValuePromise, setIsUserLoaded]);

  if (!isUserLoaded) {
    return null;
  }

  const handleRefresh = async () => {
    //  window.location.reload();
  };

  if (isLogged) {
    return (
      <Routes>
        <Route path="/" element={<Navigate to="/diary" />} />
        <Route
          path="/diary"
          element={
            <Compose components={[SettingsProvider, DiaryProvider]}>
              {/*<PullToRefresh onRefresh={handleRefresh}>*/}
              <DiaryPage />
              {/*</PullToRefresh>*/}
            </Compose>
          }
        >
          <Route path=":date" />
        </Route>
        <Route
          path="/palette"
          element={
            <Compose components={[SettingsProvider, DiaryProvider]}>
              <PalettePage />
            </Compose>
          }
        />
        <Route path="/login" element={<Navigate to="/" />} />
        <Route path="/register" element={<Navigate to="/" />} />
      </Routes>
    );
  }
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/login" />} />
      <Route path="/diary" element={<Navigate to="/login" />}>
        <Route path=":date" element={<Navigate to="/login" />} />
      </Route>
      <Route
        path="/login"
        element={
          <AuthLayout>
            <SignInScreen />
          </AuthLayout>
        }
      />
    </Routes>
  );
};

export default Root;
