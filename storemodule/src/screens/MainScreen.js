import React from "react";
import Sidebar from "../component/Navigation/Sidebar";
import '../css/MainScreen.css';
import DashboardScreen from "./DashboardScreen/DashboardScreen";

function MainScreen() {
  return (
    <div className="mainScreen">
      <Sidebar />
      <DashboardScreen/>
    </div>
  );
}

export default MainScreen;
