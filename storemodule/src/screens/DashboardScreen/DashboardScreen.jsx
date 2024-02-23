import React, { useEffect } from "react";
import "../../css/Dashboard.css";
import CardMain from "../../component/CardMain";
import Card1 from "../../Assets/card1.jpg";
import { BiSearchAlt } from "react-icons/bi";
import { FaChevronDown, FaCartPlus } from "react-icons/fa";
import AddUpdateMedicineForm from "../../component/Forms/AddUpdateMedicineForm";
import Profile from "../../component/Modal/Profile";
function DashboardScreen() {
  const data = [
    {
      name: "Crocin Pain Relief Tablet Strip Of 15's",
      description:
        "Crocin Pain Relief is used for symptomatic relief from mild to moderate pain eg., headache, migraine, toothache, period pain and musculoskeletal pain. .It Used for viral fever ,For cough , Cold ",
      content: "Paracetamol 500mg",
      stock: 2000,
      price: 5,
      imgSrc: Card1,
    },
    {
      name: "Anasin",
      description:
        "This medication is a combination of aspirin and caffeine. It is used to treat minor aches and pains due to various conditions such as headache, toothache, menstrual cramps, or muscle aches",
      content: "Paracetamol 500mg",
      stock: 200,
      price: 10,
      imgSrc: Card1,
    },
    {
      name: "Crocin Pain Relief Tablet Strip Of 15's",
      description:
        "Crocin Pain Relief is used for symptomatic relief from mild to moderate pain eg., headache, migraine, toothache, period pain and musculoskeletal pain. .It Used for viral fever ,For cough , Cold ",
      content: "Paracetamol 500mg",
      stock: 2000,
      price: 5,
      imgSrc: Card1,
    },
    {
      name: "Anasin",
      description:
        "This medication is a combination of aspirin and caffeine. It is used to treat minor aches and pains due to various conditions such as headache, toothache, menstrual cramps, or muscle aches",
      content: "Paracetamol 500mg",
      stock: 200,
      price: 10,
      imgSrc: Card1,
    },
    {
      name: "Crocin Pain Relief Tablet Strip Of 15's",
      description:
        "Crocin Pain Relief is used for symptomatic relief from mild to moderate pain eg., headache, migraine, toothache, period pain and musculoskeletal pain. .It Used for viral fever ,For cough , Cold ",
      content: "Paracetamol 500mg",
      stock: 2000,
      price: 5,
      imgSrc: Card1,
    },
    {
      name: "Anasin",
      description:
        "This medication is a combination of aspirin and caffeine. It is used to treat minor aches and pains due to various conditions such as headache, toothache, menstrual cramps, or muscle aches",
      content: "Paracetamol 500mg",
      stock: 200,
      price: 10,
      imgSrc: Card1,
    },
    {
      name: "Foruderm",
      content: "Miconazole",
      description:
        "t is commonly used for the diagnosis or treatment of Minor scalds, burns, scratches, psoriasis, cracked skin. It has some side effects such as Skin redness, Teeth discolouration, Burning sensation, Itching.",
      stock: 100,
      price: 20,
      imgSrc: Card1,
    },
    {
      name: "Clogen-g",
      description:
        "It helps to treat allergic and fungal skin infections. Beclomethasone dipropionate works by blocking the production of certain chemical messengers (prostaglandins) that make the skin red, swollen and itchy.",
      content: "Neomycin",
      stock: 300,
      price: 15,
      imgSrc: Card1,
    },
    {
      name: "Drez-S",
      description:
        "It is a dermatological combination used to treat and prevent skin infections in lacerations, abrasions, diabetic foot ulcers, bedsores, impetigo, boils or carbuncles, and radiation/chemotherapy ulcers.",
      content: "Iodine",
      stock: 300,
      price: 15,
      imgSrc: Card1,
    },
  ];

  const [searchData, setSearchData] = React.useState(data);
  const [activeFilter, setActiveFilter] = React.useState("all");
  const [isDisplayUpdateForm, setIsDisplayUpdateForm] = React.useState(false);
  const [updateItem, setupdateItem] = React.useState({});

  const handleSearch = (e) => {
    const searchKeyword = e.target.value.toLowerCase();
    const newSearchData = data.filter((item) => {
      return (
        (activeFilter === "all" ||
          item.content.toLowerCase() === activeFilter) &&
        item.name.toLowerCase().includes(searchKeyword)
      );
    });

    setSearchData(newSearchData);
  };

  const handleFilter = (e) => {
    const content = e.target.value.toLowerCase();
    setActiveFilter(content);
    const newSearchData = data.filter((item) =>
      item.content.toLowerCase().includes(content)
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

  const uniqueContents = [...new Set(data.map((item) => item.content))];

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
                    {uniqueContents.map((content, index) => {
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
                imgSrc={Card1}
                data={searchData}
                activeFilter={activeFilter}
                onUpdate={DisplayItemForm}
              />
            </div>
          </div>
          <div className="right">
            {isDisplayUpdateForm && (
              <AddUpdateMedicineForm
                item={updateItem}
                setIsDisplayUpdateForm={setIsDisplayUpdateForm}
              />
            )}
          </div>
        </div>
      </div>
    </>
  );
}

export default React.memo(DashboardScreen);
