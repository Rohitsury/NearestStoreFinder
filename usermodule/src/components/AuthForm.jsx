import React, { useState } from "react";
import { Link } from "react-router-dom";
import "../css/CommonStyle.css";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";

function AuthForm({
  handleSubmit,
  fields,
  buttonText,
  formTitleText,
  bottomText,
  forgotPasswordText,
  bottomLink,
  styleFormDiv,
  ResendOtpButtonText,
  backArrorIcon,
  setShowForgotPassword,
  resendOtp,
}) {
  const [formData, setFormData] = useState({});
  const [showPassword, setShowPassword] = useState(false);

  const handleInput = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  function onSubmit(e) {
    e.preventDefault();
    handleSubmit(formData);
  }

  return (
    <div>
      <div className={styleFormDiv}>
        <div className="d-flex">
          {backArrorIcon && (
            <span
              className="backArrowIcon me-2"
              onClick={() => setShowForgotPassword(false)}
            >
              {backArrorIcon}
            </span>
          )}
          <h4 className="fw-bold w-100 text-center">{formTitleText}</h4>
        </div>
        <form onSubmit={onSubmit}>
          {fields.map((field, index) => (
            <div className="mb-3" key={index}>
              <label className="form-label">{field?.label}</label>
              <input
                type={
                  field?.type === "password" && showPassword
                    ? "text"
                    : field?.type
                }
                className="form-control"
                name={field?.name}
                onChange={handleInput}
              />
              {field?.type === "password" && (
                <span
                  className={
                    formTitleText === "Register"
                      ? "registerToggleIcon"
                      : formTitleText === "Login"
                      ? "loginToggleIcon"
                      : formTitleText === "Reset Password"
                      ? "resetPasswordToggleIcon"
                      : "forgotPasswordToggleIcon"
                  }
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {!showPassword ? (
                    <VisibilityIcon fontSize="small" />
                  ) : (
                    <VisibilityOffIcon fontSize="small" />
                  )}
                </span>
              )}
            </div>
          ))}
          <button type="submit" className="btn btn-primary">
            {buttonText}
          </button>
          {ResendOtpButtonText && (
            <button
              className="btn btn-outline-primary ms-4"
              onClick={resendOtp}
            >
              {ResendOtpButtonText}
            </button>
          )}
        </form>
        <div className="mt-2">
          <Link
            className="forgotPassword mt-2"
            onClick={() => setShowForgotPassword(true)}
          >
            {forgotPasswordText}
          </Link>
          <p>
            {bottomText} &nbsp;
            <Link to={bottomLink?.to} className="regLink">
              {bottomLink?.label}
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}

export default AuthForm;
