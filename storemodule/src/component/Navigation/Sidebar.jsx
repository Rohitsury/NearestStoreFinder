import React from "react";
import "../../css/Sidebar.css";
import { AppAssets } from "../../constant/AppAssets";
import { FaSignOutAlt } from "react-icons/fa";
import GridViewIcon from "@mui/icons-material/GridView";
import { NavLink, useNavigate } from "react-router-dom";

function Sidebar() {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("authenticationToken");
    alert("Logged Out Successfully");
    navigate("/");
  };

  return (
    <menu>
      <img src={AppAssets.MedicalPlusIcon} alt="" />
      <ul id="mainMenu">
        <li
          data-bs-toggle="tooltip"
          data-bs-placement="right"
          title="Dashboard"
        >
          <NavLink to="/dashboard">
            <GridViewIcon />
          </NavLink>
        </li>
      </ul>

      <ul className="lastMenu">
        <li data-bs-toggle="tooltip" data-bs-placement="right" title="Logout">
          <FaSignOutAlt onClick={handleLogout} className="fs-3" />
        </li>
      </ul>
    </menu>
  );
}

export default Sidebar;
