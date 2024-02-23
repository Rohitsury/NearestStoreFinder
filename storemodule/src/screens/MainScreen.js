import React from "react";
import Sidebar from "../component/Navigation/Sidebar";
import '../css/MainScreen.css';
function MainScreen({children}) {
  return (
    <div className="mainScreen">
      <Sidebar />
      {children}
    </div>
  );
}

export default MainScreen;
