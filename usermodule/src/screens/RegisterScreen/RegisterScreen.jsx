import React from "react";
import Navbar from "../../components/Navbar";
import "../../css/CommonStyle.css";
import AuthForm from "../../components/AuthForm";
import OtpScreen from "./OtpScreen";

function RegisterScreen() {
  const [showOtp, setShowOtp] = React.useState(false);
  const [userData, setUserData] = React.useState({});

  const fields = [
    {
      label: "Name",
      name: "name",
      type: "text",
    },
    {
      label: "Email",
      name: "email",
      type: "email",
    },
    {
      label: "Phone",
      name: "phone",
      type: "phone",
    },
    {
      label: "Password",
      name: "password",
      type: "password",
    },
  ];

  const handleSubmit = async (formData) => {
    try {
      const response = await fetch(
        "http://localhost:5000/usermodule/register",
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
      } else if (response.status === 400) {
        alert(res.error);
      } else if (response.status === 500) {
        alert(res.error);
      }
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div className="loginRegScreen">
      <Navbar />
      {showOtp ? (
        // if showOtp true display otp screen
        <OtpScreen setShowOtp={setShowOtp} userId={userData.userId} email={userData.email} />
      ) : (
        // if false display register screen
        <AuthForm
          fields={fields}
          handleSubmit={handleSubmit}
          buttonText="Register"
          formTitleText="Register"
          bottomText="Already have an account?"
          bottomLink={{ to: "/login", label: "Login" }}
          styleFormDiv={"loginFormDiv"}
        />
      )}
    </div>
  );
}

export default React.memo(RegisterScreen);
