import React, { useEffect, useState } from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import AuthLayout from "../Auth/AuthLayout";
import SignInScreen from "../Auth/SignInScreen";
import SignUpScreen from "../Auth/SignUpScreen";
import { useUser } from "reactfire";
import Diary from "../Diary";
import { DiaryProvider } from "../../context/DiaryContext";

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

  if (isLogged) {
    return (
      <Routes>
        <Route path="/" element={<Navigate to="/diary" />} />
        <Route
          path="/diary"
          element={
            <DiaryProvider>
              <Diary />
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
      <Route
        path="/register"
        element={
          <AuthLayout>
            <SignUpScreen />
          </AuthLayout>
        }
      />
    </Routes>
  );
};

export default Root;
