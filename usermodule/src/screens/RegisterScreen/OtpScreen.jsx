import React from "react";
import AuthForm from "../../components/AuthForm";
import { useNavigate } from "react-router-dom";

function OtpScreen({ passwordField, email, userId, setShowOtp, setShowForgotPassword }) {
  const navigate = useNavigate();

  const fields = [
    {
      label: "Enter OTP",
      name: "otp",
      type: "number",
    },
  ];

  const handleSubmit = async (formData) => {
    try {
      const response = await fetch(
        "http://localhost:5000/usermodule/verifyotp",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ userId, ...formData }),
        }
      );
      const res = await response.json();
      if (response.status === 200) {
        alert("Password reset successfully. Please login.");
        setShowOtp(false);
        setShowForgotPassword(false);
        navigate("/login");
      } else if (response.status === 400) {
        alert(res.error);
      } else if (response.status === 500) {
        alert(res.error);
      }
    } catch (error) {
      console.log(error);
    }
  };
 
  const resendOtp = async (e) => {
    try {
      const response = await fetch(
        "http://localhost:5000/usermodule/resentOtp",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ userId, email }),
        }
      );
      const res = await response.json();
      if (response.status === 200) {
        alert(res.message);
      } else if (response.status === 500) {
        alert(res.message);
      }
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div>
      <AuthForm
        fields={passwordField ? [...fields, passwordField] : fields}
        buttonText="Verify OTP"
        formTitleText="Verify OTP"
        styleFormDiv="loginFormDiv"
        ResendOtpButtonText="Resent OTP"
        handleSubmit={handleSubmit}
        resendOtp = {resendOtp}
      />
    </div>
  );
}

export default React.memo(OtpScreen);
