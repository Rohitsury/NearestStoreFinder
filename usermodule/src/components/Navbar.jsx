import React, { useState, useEffect } from "react";
import { Link, useNavigate, NavLink } from "react-router-dom";
import "../css/Navbar.css";
import { AppAssets } from "../constant/AppAssets";
import LogoutIcon from "@mui/icons-material/Logout";
import SettingsOutlinedIcon from "@mui/icons-material/SettingsOutlined";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";

function Navbar() {
  const [scroll, setScroll] = useState(false);

  let navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("authenticationToken");
    navigate("/login");
  };

  const handleScroll = () => {
    if (window.pageYOffset > 0) {
      setScroll(true);
    } else {
      setScroll(false);
    }
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <>
      <nav
        className={`navbar navbar-expand-lg navbar-light${
          scroll ? "fixed-top" : ""
        }`}
        onScroll={handleScroll}
      >
        <div className="container">
          <Link className="navbar-brand fs-3 fw-bold d-lg-flex align-items-center">
            <img
              src={AppAssets.logoImage}
              className="img-fluid logoImage me-1"
              alt=""
            />
            NMSF
          </Link>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div
            className="collapse navbar-collapse "
            id="navbarSupportedContent"
          >
            <ul className="navbar-nav d-flex align-items-center  ms-auto mb-2 mb-lg-0 ">
              <li className="nav-item">
                <NavLink
                  className="nav-link text-white homelink  me-lg-4"
                  activeClassName="active"
                  aria-current="page"
                  exact
                  to="/"
                >
                  Home
                </NavLink>
              </li>
              {!localStorage.getItem("authenticationToken") ? (
                <>
                  <li className="nav-item">
                    <NavLink
                      className="loginbtn btn me-lg-4"
                      activeClassName="active"
                      exact
                      to="/login"
                    >
                      Login
                    </NavLink>
                  </li>
                  <li className="nav-item">
                    <NavLink
                      className="regbtn btn my-2 my-lg-0"
                      activeClassName="active"
                      exact
                      to="/register"
                    >
                      Register
                    </NavLink>
                  </li>
                </>
              ) : (
                <div className="dropdown">
                  <div
                    className="dropdown-toggle"
                    id="dropdownMenuButton1"
                    data-bs-toggle="dropdown"
                    aria-expanded="false"
                    type="button"
                  >
                    <AccountCircleIcon className="fs-2" />
                  </div>

                  <ul
                    className="dropdown-menu dropmenu mt-3"  
                    aria-labelledby="dropdownMenuButton1"
                  >
                    <li>
                      <NavLink
                        className="dropdown-item  text-dark"
                        to="/changepassword"
                      >
                        <SettingsOutlinedIcon className="me-2" />
                        Change Password
                      </NavLink>
                    </li>
                    <li>
                      <button
                        className="dropdown-item text-dark"
                        onClick={handleLogout}
                      >
                        <LogoutIcon className="me-2" />
                        Logout
                      </button>
                    </li>
                  </ul>
                </div>
              )}
            </ul>
          </div>
        </div>
      </nav>
    </>
  );
}

export default Navbar;
