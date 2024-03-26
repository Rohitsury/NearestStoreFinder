import React from "react";
import AuthForm from "../../components/AuthForm";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import OtpScreen from "../RegisterScreen/OtpScreen";

function ForgotPassword({ setShowForgotPassword }) {
  const [showOtp, setShowOtp] = React.useState(false);
  const [userData, setUserData] = React.useState({});

  const fields = [
    {
      label: "Email",
      name: "email",
      type: "email",
    },
  ];
  const handleSubmit = async (formData) => {
    try {
      const response = await fetch(
        "http://localhost:5000/usermodule/forgotpassword",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
        }
      );
      const res = await response.json();
      if (response.status === 200) {
        alert(res.message);
        setShowOtp(true);
        setUserData({ userId: res.userId, email: res.email });
      } else if (response.status === 404) {
        alert(res.error);
      } else if (response.status === 500) {
        alert(res.error);
      }
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <div>
      {showOtp ? (
        <OtpScreen
          passwordField={{
            label: "New Password",
            name: "password",
            type: "password",
          }}
          email={userData.email}
          userId={userData.userId}
          setShowOtp={setShowOtp}
          setShowForgotPassword={setShowForgotPassword}
        />
      ) : (
        <AuthForm
          fields={fields}
          buttonText="Get OTP"
          formTitleText="Forgot Password"
          styleFormDiv="loginFormDiv"
          backArrorIcon={<ArrowBackIcon />}
          setShowForgotPassword={setShowForgotPassword}
          handleSubmit={handleSubmit}
        />
      )}
    </div>
  );
}

export default ForgotPassword;
