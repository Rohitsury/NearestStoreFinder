import React, { useState } from "react";
import "../../css/CommonStyle.css";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import ForgotPasswordOtpModal from "./ForgotPasswordOtpModal";

function ForgotPassword({ setModal }) {
  const [showOTP, setShowOTP] = useState(false);
  const [email, setEmail] = useState(null);
  const [userId, setUserId] = useState(null);

  async function handleSubmit(e) {
    e.preventDefault();
    try {
      const response = await fetch(
        "http://localhost:5000/storemodule/forgotpassword",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ email }),
        }
      );
      const res = await response.json();

      if (response.status === 200) {
        alert(res.message);
        setShowOTP(true);
        setUserId(res.userId);
      } else if (response.status === 404) {
        alert(res.message);
      } else if (response.status === 500) {
        alert(res.message);
      }
    } catch (err) {
      console.log(err);
    }
  }
  
  return (
    <>
      {showOTP ? (
        <ForgotPasswordOtpModal
          setModal={setModal}
          userId={userId}
          email={email}
        />
      ) : (
        <form className="loginForm w-75 p-lg-5 p-3" onSubmit={handleSubmit}>
          <div className="d-flex">
            <ArrowBackIcon
              className="me-2 text-white"
              onClick={() => setModal(false)}
            />
            <h5 className="fw-bold text-white text-center">Forgot Password</h5>
          </div>
          <div class="mb-3">
            <label class="form-label">Email address</label>
            <input
              type="email"
              class="form-control"
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          <button type="submit" class="loginButton py-2">
            Get OTP
          </button>
        </form>
      )}
    </>
  );
}

export default ForgotPassword;
