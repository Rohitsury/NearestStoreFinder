import React from "react";
import { NavLink } from "react-router-dom";

function ProfileUpdateForm(props) {
  const {
    storeOwnerData,
    setStoreOwnerData,
    setShowPasswordForm,
    setShowForm,
  } = props;

  const handleChange = (e) => {
    setStoreOwnerData({
      ...storeOwnerData,
      [e.target.name]: e.target.value,
    });
  };
  return (
    <div>
      <form className="profileUpdateForm p-4">
        <div className="col-12 d-flex justify-content-end">
          <NavLink onClick={() => setShowPasswordForm(true)}>
            ChangePassword
          </NavLink>
        </div>
        <div className="row">
          <div class="mb-3">
            <label for="recipient-name" class="col-form-label">
              Store Name
            </label>
            <input
              type="text"
              value={storeOwnerData.storename}
              class="form-control"
              onChange={handleChange}
              name="storename"
            />
          </div>
          <div class="mb-3 col-6">
            <label for="recipient-name" class="col-form-label">
              Phone
            </label>
            <input
              type="number"
              value={storeOwnerData.phone}
              class="form-control"
              onChange={handleChange}
              name="phone"
            />
          </div>
          <div class="mb-3 col-6">
            <label for="recipient-name" class="col-form-label">
              Address
            </label>
            <input
              type="text"
              value={storeOwnerData.storeAddress}
              class="form-control"
              onChange={handleChange}
              name="storeAddress"
            />
          </div>
          <div class="mb-3 col-6">
            <label for="recipient-name" class="col-form-label">
              Area
            </label>
            <input
              type="text"
              value={storeOwnerData.area}
              onChange={handleChange}
              class="form-control"
              name="area"
            />
          </div>
          <div class="mb-3 col-6">
            <label for="recipient-name" class="col-form-label">
              Start Time
            </label>
            <input
              type="time"
              name="storeStartTime"
              value={storeOwnerData.storeStartTime}
              onChange={handleChange}
              class="form-control"
            />
          </div>
          <div class="mb-3 col-6">
            <label for="recipient-name" class="col-form-label">
              Close Time
            </label>
            <input
              type="time"
              name="storeCloseTime"
              value={storeOwnerData.storeCloseTime}
              onChange={handleChange}
              class="form-control"
            />
          </div>
          <div class="mb-3 col-6">
            <label for="recipient-name" class="col-form-label">
              Change Photo
            </label>
            <input
              type="file"
              name="storeCloseTime"
              onChange={handleChange}
              class="form-control"
            />
          </div>
          <div class="modal-footer">
            <button
              type="button"
              class="btn btn-gradCancel"
              onClick={() => setShowForm(false)}
            >
              Cancel
            </button>
            <button type="submit" className="btn btn-grad">
              Update
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}

export default ProfileUpdateForm;
