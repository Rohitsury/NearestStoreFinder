import "./App.css";
import React, { useEffect, useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import SplashScreen from "./screens/SplashScreen/SplashScreen";
import LoginScreen from "./screens/LoginScreen/LoginScreen";
import RegisterScreen from "./screens/RegisterScreen/RegisterScreen";
function App() {
  const [showSplashScreen, setShowSplashScreen] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      setShowSplashScreen(false);
    }, 8000);
  });
  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/"
          element={showSplashScreen ? <SplashScreen /> : <LoginScreen />}
        />
        <Route
          path="/register"
          element={<RegisterScreen/>}
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
