// App.js

import "./App.css";
import React, { useEffect, useState } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import SplashScreen from "./screens/SplashScreen/SplashScreen";
import LoginScreen from "./screens/LoginScreen/LoginScreen";
import RegisterScreen from "./screens/RegisterScreen/RegisterScreen";
import DashboardScreen from "./screens/DashboardScreen/DashboardScreen";
import NotFoundPage from "./screens/PageNotFoundScreen/NotFoundPage";
import MainScreen from "./screens/MainScreen";

function App() {
  const [showSplashScreen, setShowSplashScreen] = useState(true);

  const isTokenValid = () => {
    return localStorage.getItem("authenticationToken") !== null;
  };

  const ProtectedRoute = ({ element }) => {
    useEffect(() => {
      if (!isTokenValid()) {
        window.location.href = "/";
      }
    }, []);
    return isTokenValid() ? element : <Navigate to="/dashboard" />;
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
          path="/*"
          element={<ProtectedRoute element={<WithSidebar />} />}
        />
        <Route path="/notfound" element={<NotFoundPage />} />
      </Routes>
    </BrowserRouter>
  );
}

function WithSidebar() {
  return (
    <MainScreen>
      <Routes>
        <Route path="/dashboard" element={<DashboardScreen />} />
        <Route path="*" element={<Navigate to="/notfound" replace />} />
      </Routes>
    </MainScreen>
  );
}

export default App;
