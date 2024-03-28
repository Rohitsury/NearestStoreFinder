import React from "react";
import Navbar from "../../components/Navbar";
import "../../css/HomeScreen.css";
import { Link } from "react-router-dom";

function HomeScreen() {
  return (
    <div className="homeScreen">
      <Navbar />
      <div className="mainTitleDiv">
        <h2 className="welcomeTitle">Welcome to our</h2>
        <h1 className="title">Nearest Medical Store Finder</h1>
        <h6 className="sloganText">
          "Your Path to Health: Explore and Discover the Perfect Medicines for
          You!"
        </h6>
        <Link to="/search" className="searchButton btn">Search</Link>
      </div>
    </div>
  );
}

export default HomeScreen;
