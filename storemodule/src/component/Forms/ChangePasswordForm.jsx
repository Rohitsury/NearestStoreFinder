import React, { useState } from "react";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
function ChangePassword({ setShowPasswordForm }) {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  return (
    <div>
      <form className="profileUpdateForm p-4">
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
            <input type="email" class="form-control" name="email" />
          </div>
          <div class="mb-3 col-6">
            <label for="recipient-name" class="col-form-label">
              Old Password
            </label>
            <input
              type={showConfirmPassword ? "text" : "password"}
              class="form-control"
              name="password"
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
              name="password"
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
