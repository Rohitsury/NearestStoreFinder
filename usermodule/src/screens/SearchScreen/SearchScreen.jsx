import React from "react";
import "../../css/SearchScreen.css";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import { FaLocationDot } from "react-icons/fa6";
import Navbar from "../../components/Navbar";

function SearchScreen() {
  return (
    <div className="searchScreen">
      <div className="searchScreenSection bg-dark">
        <div className="searchScreenSectionInnerDiv">
          <div className="row px-3 w-100 searchInputRow">
              <div className="col-12 col-lg-5 d-flex">
                <input
                  type="text"
                  className="form-control locationInput"
                  placeholder="Your Current Location"
                  
                />
                <button className="btn btn-primary ms-2">Get Location </button>
              </div>
              <div className="col-12 col-lg-7 d-flex">
                <input
                  type="text"
                  className="form-control searchInput"
                  placeholder="Search Medicine"
                />
                <button className="btn btn-primary ms-2">Search</button>
              </div>
          </div>
        </div>
      </div>
      <div className="storeListSection mt-4">
        <div className="container">
          <div className="row">
            <div className="col-lg-3 mb-4 h-100">
              <div className="card shadow">
                <img
                  src="https://images.unsplash.com/photo-1477862096227-3a1bb3b08330?ixlib=rb-1.2.1&auto=format&fit=crop&w=700&q=60"
                  alt=""
                  className="card-img-top"
                  style={{ height: "200px" }}
                />
                <div className="card-body">
                  <div className="d-flex align-items-start justify-content-between">
                    <h5 className="card-title">Wellness Forever</h5>
                    <h6 className="badge bg-success mt-1">Open</h6>
                  </div>
                  <div className="d-flex align-items-center">
                    <FaLocationDot className="fs-5 me-1 addressIcon" />
                    <span className="address">
                      {" "}
                      RPD Road, Tilakwadi, Belgaum{" "}
                    </span>
                  </div>
                  <hr />
                  <div className="d-flex justify-content-between timingDiv">
                    <p className="card-text ">
                      <span>Open</span> : <span>10:00 AM</span>
                    </p>
                    <p className="card-text">
                      <span>Close</span> : <span>10:00 AM</span>
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SearchScreen;
