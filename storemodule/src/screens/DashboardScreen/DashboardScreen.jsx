import React, { useEffect, useState } from "react";
import "../../css/Dashboard.css";
import CardMain from "../../component/CardMain";
import { BiSearchAlt } from "react-icons/bi";
import { FaChevronDown, FaCartPlus } from "react-icons/fa";
import AddUpdateMedicineForm from "../../component/Forms/AddUpdateMedicineForm";
import Profile from "../../component/Modal/Profile";

function DashboardScreen() {
  const [data, setData] = useState([]);
  const [searchData, setSearchData] = useState([]);
  const [activeFilter, setActiveFilter] = useState("all");
  const [isDisplayUpdateForm, setIsDisplayUpdateForm] = useState(false);
  const [updateItem, setupdateItem] = useState({});

  const uniqueContents = [...new Set(data?.map((item) => item?.content))];

  const handleSearch = (e) => {
    const searchKeyword = e.target.value.toLowerCase();
    const newSearchData = data?.filter((item) => {
      return (
        (activeFilter === "all" ||
          item?.content?.toLowerCase() === activeFilter) &&
        item?.medicineName?.toLowerCase().includes(searchKeyword)
      );
    });
    setSearchData(newSearchData);
  };

  const handleFilter = (e) => {
    const content = e.target.value.toLowerCase();
    setActiveFilter(content);

    const newSearchData = data?.filter((item) =>
      item?.content?.toLowerCase().includes(content)
    );
    if (content === "all") {
      setSearchData(data);
    } else {
      setSearchData(newSearchData);
    }
  };

  const DisplayItemForm = (item) => {
    setupdateItem(item);
    setIsDisplayUpdateForm(true);
  };

  const handleAddCartClick = () => {
    setupdateItem({});
    setIsDisplayUpdateForm(true);
  };

  const getMedicineData = async () => {
    try {
      const token = localStorage.getItem("authenticationToken");
      const response = await fetch(
        "http://localhost:5000/storemodule/getmedicine",
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      const data = await response.json();
      if (response.status === 200) {
        setSearchData(data?.medicineData || []);
        setData(data?.medicineData || []);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    const mouseTarget = document.getElementById("menuChevron");
    const menuContainer = document.getElementById("menuContainer");
    mouseTarget.addEventListener("mouseenter", () => {
      mouseTarget.style.transform = "rotate(180deg)";
      menuContainer.style.transform = "translateX(0px)";
    });

    menuContainer.addEventListener("mouseleave", () => {
      mouseTarget.style.transform = "rotate(0deg)";
      menuContainer.style.transform = "translateX(300px)";
    });
  }, []);

  useEffect(() => {
    getMedicineData();
  }, []);

  return (
    <>
      <div className="dashboard">
        <div className="topContainer">
          <div className="inputBox">
            <input
              type="text"
              placeholder="Search items, collections"
              onChange={handleSearch}
            />
            <i>
              <BiSearchAlt />
            </i>
          </div>
          <div className="profileContainer">
            <p className="profileName">MedPlus</p>
            <i className="menuChevron" id="menuChevron">
              <FaChevronDown />
            </i>
            <div
              className="menuContainer"
              id="menuContainer"
              style={{ transform: "translateX(300px)" }}
            >
              <ul>
                <li data-bs-toggle="modal" data-bs-target="#staticBackdrop">
                  Profile
                </li>
              </ul>
            </div>
          </div>
        </div>
        <div className="maincontainer">
          <Profile />
          <div className="left">
            <div className="cards">
              <div className="filters">
                <div className="popular">
                  <h2>Medical Store Finder</h2>
                </div>
                <div className="text-white ms-auto me-3">
                  <FaCartPlus
                    data-bs-toggle="tooltip"
                    data-bs-placement="right"
                    title="Add New Stock"
                    className="fs-4"
                    onClick={() => {
                      handleAddCartClick({});
                    }}
                  />
                </div>
                <div className="filter_buttons">
                  <select
                    className="p-2 text-white border-0 selectCat"
                    onChange={handleFilter}
                  >
                    <option value="all">All</option>
                    {uniqueContents?.map((content, index) => {
                      return (
                        <option key={index} value={content}>
                          {content}
                        </option>
                      );
                    })}
                  </select>
                </div>
              </div>
              <CardMain
                data={searchData}
                activeFilter={activeFilter}
                onUpdate={DisplayItemForm}
                getMedicineData={getMedicineData}
              />
            </div>
          </div>
          <div className="right">
            {isDisplayUpdateForm && (
              <AddUpdateMedicineForm
                item={updateItem}
                setIsDisplayUpdateForm={setIsDisplayUpdateForm}
                getMedicineData={getMedicineData}
              />
            )}
          </div>
        </div>
      </div>
    </>
  );
}

export default React.memo(DashboardScreen);
