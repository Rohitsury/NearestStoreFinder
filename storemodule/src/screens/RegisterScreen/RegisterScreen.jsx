import React, { useState } from "react";
import { AppAssets } from "../../constant/AppAssets";
import "../../css/CommonStyle.css";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import { Link } from "react-router-dom";
import RegisterOtpModal from "../../component/Modal/RegisterOtpModal";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { storage } from "../../firebase";
import { v4 } from "uuid";

function RegisterScreen() {
  const [showPassword, setShowPassword] = useState(false);
  const [data, setData] = useState({});
  const [showOTPModal, setShowOTPModal] = useState(false);
  const [userId, setUserId] = useState(null);
  const [imageUpload, setImageUpload] = useState(null);

  function handleInput(e) {
    setData({ ...data, [e.target.name]: e.target.value });
  }

  const uploadFile = async () => {
    if (imageUpload == null) return;
    const imageRef = ref(
      storage,
      `storeimages/${Date.now() + imageUpload.name + v4()}`
    );
    await uploadBytes(imageRef, imageUpload);
    const imageUrl = await getDownloadURL(imageRef);
    return imageUrl;
  };

  async function handleSumbit(e) {
    e.preventDefault();
    const phoneRegex = /^[6-9]\d{9}$/;
    const passwordRegex = /^.{8,16}$/;
    const storeNameRegex = /[a-zA-Z]/;

    if (!storeNameRegex.test(data?.storename)) {
      alert("Please enter a valid store name");
      return;
    }
    if (!phoneRegex.test(data?.phone)) {
      alert("Please enter a valid phone number");
      return;
    }
    if (!passwordRegex.test(data?.password)) {
      alert("Password should be between 8 to 16 characters");
      return;
    }
    if (imageUpload) {
      const fileExtension = imageUpload?.name?.split(".").pop().toLowerCase();
      if (!["jpg", "jpeg", "png"].includes(fileExtension)) {
        alert("Please select a valid video file (jpg, jpeg, png).");
        return;
      }
    }
    try {
      const imageUrl = await uploadFile();
      const response = await fetch(
        "http://localhost:5000/storemodule/register",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ ...data, storeImage: imageUrl }),
        }
      );
      const res = await response.json();
      if (response.status === 200) {
        alert(res.message);
        setShowOTPModal(true);
        setUserId(res.userId);
      } else if (response.status === 400) {
        alert(res.error);
      } else if (response.status === 500) {
        alert(res.error);
      }
    } catch (err) {
      console.log(err);
    }
  }
  return (
    <>
      <section className="mainLoginBackground ">
        <div className="loginDiv container d-flex justify-content-center">
          <div className="row loginRow ">
            <div className="col-12 col-lg-6 col-md-6">
              <nav class="navbar navbar-expand-lg navbar-light ps-4 pt-3 ">
                <Link class="navbar-brand" href="#">
                  Medical Store Finder
                </Link>
              </nav>
              <div className="p-lg-5">
                <h1 className="welcomeText">Welcome !</h1>
                <h6 className="sloganText ">
                  "Unlocking Healing, Unleashing Hope: Medicine Finder, Where
                  Your Health Journey Begins."
                </h6>
                <div className="text-center text-lg-start">
                  <h6 className="newUserText">Already Have An Account ?</h6>
                  <Link to="/" className="btn signupButton">
                    Sign in
                  </Link>
                </div>
              </div>
            </div>
            <div className="col-12 col-lg-6 col-md-6 d-flex justify-content-center align-items-center p-lg-3 p-0">
              {!showOTPModal ? (
                <form
                  className="registerForm  p-lg-4 p-4"
                  onSubmit={handleSumbit}
                >
                  <h5 className="fw-bold text-white text-center">
                    Create an account
                  </h5>
                  <div className="row">
                    <div class="mb-1">
                      <label class="form-label">Store Name</label>
                      <input
                        type="text"
                        name="storename"
                        class="form-control"
                        onChange={handleInput}
                        required
                      />
                    </div>
                    <div class="mb-1 col-6">
                      <label class="form-label">Email address</label>
                      <input
                        type="email"
                        name="email"
                        class="form-control"
                        onChange={handleInput}
                        required
                      />
                    </div>
                    <div class="mb-1 col-6">
                      <label class="form-label">Phone</label>
                      <input
                        type="number"
                        name="phone"
                        class="form-control"
                        onChange={handleInput}
                        required
                      />
                    </div>
                    <div class="mb-1 col-6">
                      <label class="form-label">Store Address</label>
                      <input
                        type="text"
                        name="storeAddress"
                        class="form-control"
                        onChange={handleInput}
                        required
                      />
                    </div>
                    <div class="mb-1 col-6">
                      <label class="form-label">Area</label>
                      <input
                        type="text"
                        name="area"
                        class="form-control"
                        onChange={handleInput}
                        required
                      />
                    </div>
                    <div class="mb-1 col-6">
                      <label class="form-label">Store Start Time</label>
                      <input
                        type="time"
                        name="storeStartTime"
                        class="form-control"
                        onChange={handleInput}
                        required
                      />
                    </div>
                    <div class="mb-1 col-6">
                      <label class="form-label">Store Close Time</label>
                      <input
                        type="time"
                        name="storeCloseTime"
                        class="form-control"
                        onChange={handleInput}
                        required
                      />
                    </div>
                    <div class="mb-3 col-6">
                      <label class="form-label">Password</label>
                      <input
                        type={showPassword ? "text" : "password"}
                        name="password"
                        class="form-control"
                        onChange={handleInput}
                        required
                      />
                      <span
                        className="password-toggle-register-icon btn"
                        onClick={() => setShowPassword(!showPassword)}
                      >
                        {!showPassword ? (
                          <VisibilityIcon fontSize="small" />
                        ) : (
                          <VisibilityOffIcon fontSize="small" />
                        )}
                      </span>
                    </div>
                    <div class="mb-3 col-6">
                      <label class="form-label">Select Store Image</label>
                      <input
                        type="file"
                        label="image"
                        name="medicineImage"
                        class="form-control"
                        accept=".jpeg, .png, .jpg"
                        onChange={(e) => {
                          setImageUpload(e.target.files[0]);
                        }}
                      />
                    </div>
                  </div>
                  <button type="submit" class=" loginButton py-2">
                    Sign Up
                  </button>
                </form>
              ) : (
                <RegisterOtpModal
                  setModal={setShowOTPModal}
                  userId={userId}
                  email={data.email}
                />
              )}
            </div>
          </div>
        </div>
      </section>

      <style>
        {`
        // .mainLoginBackground{
        //   background-image: linear-gradient(135deg, rgba(0,0,0,.7) 0%, #764ba27d 100%),url(${AppAssets.LoginBackgroundImage});
        // }
        .loginRow{
          background-image: linear-gradient(to top, rgba(0,0,0,1) 0%, #330867c8 100%),url(${AppAssets.LoginBackgroundImage});
        }
      
      `}
      </style>
    </>
  );
}

export default React.memo(RegisterScreen);
