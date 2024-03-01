// App.js

import "./App.css";
import React, { useEffect, useState } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import SplashScreen from "./screens/SplashScreen/SplashScreen";
import LoginScreen from "./screens/LoginScreen/LoginScreen";
import RegisterScreen from "./screens/RegisterScreen/RegisterScreen";
import NotFoundPage from "./screens/PageNotFoundScreen/NotFoundPage";
import MainScreen from "./screens/MainScreen";

function App() {
  const [showSplashScreen, setShowSplashScreen] = useState(true);

  const isTokenValid = () => {
    return localStorage.getItem("authenticationToken") !== null;
  };

  const ProtectedRoute = ({ element }) => {
    return isTokenValid() ? element : <Navigate to="/" />;
  };

  useEffect(() => {
    setTimeout(() => {
      setShowSplashScreen(false);
    }, 8000);
  }, []);

  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/"
          element={showSplashScreen ? <SplashScreen /> : <LoginScreen />}
        />
        <Route path="/register" element={<RegisterScreen />} />
        <Route
          path="/dashboard"
          element={<ProtectedRoute element={<MainScreen />} />}
        />
        <Route path="/*" element={<NotFoundPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
