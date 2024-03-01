import React, { useState } from "react";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";

function ChangePassword({ setShowPasswordForm }) {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [crendetials, setCrendetials] = useState({});

  const handleChange = (e) => {
    setCrendetials({ ...crendetials, [e.target.name]: e.target.value });
  };

  const resetPassword = async (e) => {
    e.preventDefault();
    const passwordRegex = /^.{8,16}$/;

    if (!passwordRegex.test(crendetials?.password)) {
      alert("Password should be between 8 to 16 characters");
      return;
    }
    try {
      const response = await fetch(
        "http://localhost:5000/storemodule/changepassword",
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(crendetials),
        }
      );

      const res = await response.json();
      if (response.status === 200) {
        alert(res.message);
        setCrendetials({});
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
    <div>
      <form className="profileUpdateForm p-4" onSubmit={resetPassword}>
        <button
          type="button"
          class="btn-close btn-close-dark float-end"
          onClick={() => setShowPasswordForm(false)}
          aria-label="Close"
        ></button>
        <div className="row">
          <div class="mb-3">
            <label for="recipient-name" class="col-form-label">
              Email
            </label>
            <input
              type="email"
              class="form-control"
              name="email"
              onChange={handleChange}
              required
            />
          </div>
          <div class="mb-3 col-6">
            <label for="recipient-name" class="col-form-label">
              Old Password
            </label>
            <input
              type={showConfirmPassword ? "text" : "password"}
              class="form-control"
              name="oldPassword"
              onChange={handleChange}
              required
            />
            <span
              className="passwordToggleIcon  btn"
              onClick={() => setShowConfirmPassword(!showConfirmPassword)}
            >
              {!showConfirmPassword ? (
                <VisibilityIcon fontSize="small" />
              ) : (
                <VisibilityOffIcon fontSize="small" />
              )}
            </span>
          </div>
          <div class="mb-3 col-6">
            <label for="recipient-name" class="col-form-label">
              New Password
            </label>
            <input
              type={showPassword ? "text" : "password"}
              class="form-control"
              name="newPassword"
              onChange={handleChange}
              required
            />
            <span
              className="passwordToggleIcon btn"
              onClick={() => setShowPassword(!showPassword)}
            >
              {!showPassword ? (
                <VisibilityIcon fontSize="small" />
              ) : (
                <VisibilityOffIcon fontSize="small" />
              )}
            </span>
          </div>
          <div class="modal-footer">
            <button type="submit" className="btn btn-grad">
              Reset Password
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}

export default ChangePassword;
