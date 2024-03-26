import "./App.css";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import HomeScreen from "./screens/HomeScreen/HomeScreen";
import LoginScreen from "./screens/LoginScreen/LoginScreen";
import RegisterScreen from "./screens/RegisterScreen/RegisterScreen";
import SearchScreen from "./screens/SearchScreen/SearchScreen";
import PageNotFoundScreen from "./screens/PageNotFoundScreen/PageNotFoundScreen";
import ChangePassword from "./screens/ChangePassword/ChangePassword";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomeScreen />} />
        <Route path="/register" element={<RegisterScreen />} />
        <Route path="/login" element={<LoginScreen />} />
        <Route path="/search" element={<SearchScreen />} />
        <Route path="/changepassword" element={<ChangePassword />} />
        <Route path="*" element={<PageNotFoundScreen />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
