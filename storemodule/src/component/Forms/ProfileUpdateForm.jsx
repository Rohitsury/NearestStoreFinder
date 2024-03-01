import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { storage } from "../../firebase";
import { v4 } from "uuid";

function ProfileUpdateForm(props) {
  const {
    storeOwnerData,
    setStoreOwnerData,
    setShowPasswordForm,
    setShowForm,
    getStoreOwnerData,
  } = props;

  const [imageUpload, setImageUpload] = useState(null);

  const handleChange = (e) => {
    setStoreOwnerData({
      ...storeOwnerData,
      [e.target.name]: e.target.value,
    });
  };

  const uploadFile = async () => {
    if (imageUpload == null) return;

    const imageRef = ref(
      storage,
      `storeimages/${Date.now() + imageUpload.name + v4()}`
    );
    await uploadBytes(imageRef, imageUpload);
    const imageUrl = await getDownloadURL(imageRef);
    return imageUrl;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const phoneRegex = /^[6-9]\d{9}$/;

    if (!phoneRegex.test(storeOwnerData?.phone)) {
      alert("Please enter a valid phone number");
      return;
    }
    if (imageUpload) {
      const fileExtension = imageUpload?.name?.split(".").pop().toLowerCase();
      if (!["jpg", "jpeg", "png"].includes(fileExtension)) {
        alert("Please select a valid video file (jpg, jpeg, png).");
        return;
      }
    }
    try {
      const imageUrl = await uploadFile();
      const response = await fetch(
        "http://localhost:5000/storemodule/updateStoreProfile",
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem(
              "authenticationToken"
            )}`,
          },
          body: JSON.stringify({ ...storeOwnerData, storeImage: imageUrl }),
        }
      );
      const res = await response.json();

      if (response.status === 200) {
        alert(res.message);
        getStoreOwnerData();
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
      <form className="profileUpdateForm p-4" onSubmit={handleSubmit}>
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
              label="image"
              name="storeImage"
              class="form-control"
              accept=".jpeg, .png, .jpg"
              onChange={(e) => {
                setImageUpload(e.target.files[0]);
              }}
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
