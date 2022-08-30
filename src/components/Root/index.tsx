import React, { useEffect, useState } from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import AuthLayout from "../Auth/AuthLayout";
import SignInScreen from "../Auth/SignInScreen";
import { useUser } from "reactfire";
import Diary from "../Diary";
import { DiaryProvider } from "../../context/DiaryContext";
import { IconsProvider } from "../../context/IconContext";
import PullToRefresh from "react-simple-pull-to-refresh";

const Root = () => {
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
            <DiaryProvider>
              <IconsProvider>
                <PullToRefresh onRefresh={handleRefresh}>
                  <Diary />
                </PullToRefresh>
              </IconsProvider>
            </DiaryProvider>
          }
        >
          <Route path=":date" />
        </Route>
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
