import React from "react";
import Navbar from "../../components/Navbar";
import "../../css/CommonStyle.css";
import AuthForm from "../../components/AuthForm";

function LoginScreen() {
  const fields = [
    {
      label: "Email",
      name: "email",
      type: "email",
    },
    {
      label: "Old Password",
      name: "oldPassword",
      type: "password",
    },
    {
      label: "New Password",
      name: "newPassword",
      type: "password",
    },
  ];

  const handleSubmit = async (formData) => {
    const passwordRegex = /^.{8,16}$/;

    if (!passwordRegex.test(formData?.password)) {
      alert("Password should be between 8 to 16 characters");
      return;
    }
    try {
      const response = await fetch(
        "http://localhost:5000/usermodule/changepassword",
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
        }
      );

      const res = await response.json();
      if (response.status === 200) {
        alert(res.message);
      } else if (response.status === 404) {
        alert(res.error);
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
      <AuthForm
        fields={fields}
        buttonText="Reset"
        formTitleText="Reset Password"
        styleFormDiv="loginFormDiv"
        handleSubmit={handleSubmit}
      />
    </div>
  );
}

export default React.memo(LoginScreen);
