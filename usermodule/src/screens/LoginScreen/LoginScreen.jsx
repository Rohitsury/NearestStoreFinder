import React, { useState } from "react";
import Navbar from "../../components/Navbar";
import "../../css/CommonStyle.css";
import AuthForm from "../../components/AuthForm";
import ForgotPassword from "./ForgotPassword";
import { useNavigate } from "react-router-dom";

function LoginScreen() {
  const navigate = useNavigate();
  const [showForgotPassword, setShowForgotPassword] = useState(false);

  const fields = [
    {
      label: "Email",
      name: "email",
      type: "email",
    },
    {
      label: "Password",
      name: "password",
      type: "password",
    },
  ];

  async function handleSumbit(formData) {
    try {
      const response = await fetch("http://localhost:5000/usermodule/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },

        body: JSON.stringify(formData),
      });
      const res = await response.json();
      if (response.status === 200) {
        alert(res.message);
        localStorage.setItem("authenticationToken", res.token);
        navigate("/");
      } else if (response.status === 404) {
        alert(res.error);
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
    <div className="loginRegScreen">
      <Navbar />
      {showForgotPassword ? (
        <ForgotPassword setShowForgotPassword={setShowForgotPassword} />
      ) : (
        <AuthForm
          fields={fields}
          buttonText="Login"
          formTitleText="Login"
          bottomText="Don't have an account?"
          forgotPasswordText="Forgot Password?"
          bottomLink={{ to: "/register", label: "Register" }}
          styleFormDiv="loginFormDiv"
          setShowForgotPassword={setShowForgotPassword}
          handleSubmit={handleSumbit}
        />
      )}
    </div>
  );
}

export default React.memo(LoginScreen);
