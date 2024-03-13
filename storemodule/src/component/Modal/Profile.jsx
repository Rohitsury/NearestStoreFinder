import React, { useEffect, useState } from "react";
import "../../css/Profile.css";
import { FaUserEdit } from "react-icons/fa";
import { FaPhone, FaClock, FaMapMarkerAlt, FaEnvelope } from "react-icons/fa";
import ChangePasswordForm from "../Forms/ChangePasswordForm";
import ProfileUpdateForm from "../Forms/ProfileUpdateForm";
import { AppAssets } from "../../constant/AppAssets";

function Profile() {
  const [showForm, setShowForm] = React.useState(false);
  const [storeOwnerData, setStoreOwnerData] = useState({});
  const [showPasswordForm, setShowPasswordForm] = useState(false);

  const getStoreOwnerData = async () => {
    try {
      const token = localStorage.getItem("authenticationToken");
      const response = await fetch(
        "http://localhost:5000/storemodule/getStoreOwnerData",
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
        setStoreOwnerData(data?.profile);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getStoreOwnerData();
  }, []);

  const displayForm = () => {
    if (showPasswordForm) {
      return <ChangePasswordForm setShowPasswordForm={setShowPasswordForm} />;
    } else {
      return (
        <ProfileUpdateForm
          storeOwnerData={storeOwnerData}
          setStoreOwnerData={setStoreOwnerData}
          setShowPasswordForm={setShowPasswordForm}
          setShowForm={setShowForm}
          getStoreOwnerData={getStoreOwnerData}
        />
      );
    }
  };

  return (
    <>
      <div
        className="modal fade"
        id="staticBackdrop"
        data-bs-backdrop="static"
        data-bs-keyboard="false"
        tabindex="-1"
        aria-labelledby="staticBackdropLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-body">
              {showForm ? (
                displayForm()
              ) : (
                <>
                  <section className="shadow profile">
                    <div className="col-12 d-flex justify-content-end p-2">
                      <button
                        data-bs-dismiss="modal"
                        type="button"
                        className="btn-close btn-close-dark"
                        aria-label="Close"
                      ></button>
                    </div>
                    <div className="container pt-2">
                      <div className="row d-flex justify-content-center align-items-center">
                        <div className="col col-lg-12 mb-4 mb-lg-0">
                          <div
                            className="card mb-3"
                            style={{
                              borderRadius: ".5rem",
                            }}
                          >
                            <div className="row g-0">
                              <div
                                className="col-md-4 gradient-custom text-center text-white"
                                style={{
                                  borderTopLeftRadius: ".5rem",
                                  borderBottomLeftRadius: ".5rem",
                                }}
                              >
                                <img
                                  src={
                                    storeOwnerData?.storeImage
                                      ? storeOwnerData?.storeImage
                                      : AppAssets?.defualtStoreImage
                                  }
                                  alt="Avatar"
                                  class="img-fluid my-5 profile-img"
                                />
                                <h5>{storeOwnerData?.storename}</h5>
                              </div>
                              <div className="col-md-8">
                                <FaUserEdit
                                  className="float-end m-2 fs-5"
                                  onClick={() => setShowForm(true)}
                                />
                                <div className="card-body p-4">
                                  <h6>Information</h6>
                                  <hr className="mt-0 mb-4" />
                                  <div className="row pt-1">
                                    <div className="col-7 mb-3">
                                      <h6 className="d-flex align-items-center">
                                        <span className="me-2">
                                          <FaEnvelope
                                            style={{ fontSize: "19px" }}
                                          />
                                        </span>
                                        Email
                                      </h6>
                                      <p className="text-muted">
                                        {storeOwnerData?.email}
                                      </p>
                                    </div>
                                    <div className="col-5 mb-3">
                                      <h6>
                                        <span className="me-2">
                                          <FaPhone />
                                        </span>
                                        Phone
                                      </h6>
                                      <p className="text-muted">
                                        {storeOwnerData?.phone}
                                      </p>
                                    </div>
                                  </div>
                                  <hr className="mt-0 mb-4" />
                                  <div className="row pt-1">
                                    <div className="col-7 mb-3">
                                      <h6>
                                        <span className="me-2">
                                          <FaMapMarkerAlt />
                                        </span>
                                        Location
                                      </h6>
                                      <p className="text-muted">
                                        {storeOwnerData?.storeAddress}
                                      </p>
                                    </div>
                                    <div className="col-5 mb-3">
                                      <h6>
                                        <span className="me-2">
                                          <FaClock />
                                        </span>
                                        Timing
                                      </h6>
                                      <p className="text-muted">
                                        {storeOwnerData?.storeStartTime +
                                          "AM - " +
                                          storeOwnerData?.storeCloseTime +
                                          "PM"}
                                      </p>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </section>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Profile;
