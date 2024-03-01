import React, { useEffect, useState } from "react";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { storage } from "../../firebase";
import { v4 } from "uuid";

function AddUpdateMedicineForm(props) {
  const { item, setIsDisplayUpdateForm, getMedicineData } = props;

  const [data, setData] = useState({});
  const [imageUpload, setImageUpload] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };

  const uploadFile = async () => {
    if (imageUpload == null) return;
    if (imageUpload) {
      const fileExtension = imageUpload?.name?.split(".").pop().toLowerCase();
      if (!["jpg", "jpeg", "png"].includes(fileExtension)) {
        return;
      }
    }
    const imageRef = ref(
      storage,
      `medicineimages/${Date.now() + imageUpload?.name + v4()}`
    );
    await uploadBytes(imageRef, imageUpload);
    const imageUrl = await getDownloadURL(imageRef);
    return imageUrl;
  };

  const addNewMedicineData = async (imageUrl) => {
    if (imageUpload) {
      const fileExtension = imageUpload?.name?.split(".").pop().toLowerCase();
      if (!["jpg", "jpeg", "png"].includes(fileExtension)) {
        alert("Please select a valid video file (jpg, jpeg, png).");
        return;
      }
    }
    try {
      const response = await fetch(
        "http://localhost:5000/storemodule/addmedicine",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem(
              "authenticationToken"
            )}`,
          },
          body: JSON.stringify({ ...data, medicineImage: imageUrl }),
        }
      );

      const res = await response?.json();

      if (response?.status === 200) {
        alert(res?.message);
        getMedicineData();
        setData({});
        setImageUpload(null);
      } else if (response?.status === 500) {
        alert(res?.error);
      }
    } catch (err) {
      console.log(err);
    }
  };

  const updateMedicineData = async (imageUrl, item) => {
    if (imageUpload) {
      const fileExtension = imageUpload.name.split(".").pop().toLowerCase();
      if (!["jpg", "jpeg", "png"].includes(fileExtension)) {
        setLoading(false);
        alert("Please select a valid video file (jpg, jpeg, png).");
        return;
      }
    }
    try {
      const response = await fetch(
        `http://localhost:5000/storemodule/updatemedicine/${item._id}`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ ...data, medicineImage: imageUrl }),
        }
      );
      const res = await response?.json();
      if (response?.status === 200) {
        alert(res?.message);
        getMedicineData();
      } else if (response?.status === 500) {
        alert(res?.error);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      const imageUrl = await uploadFile();
      await addNewMedicineData(imageUrl);
      setLoading(false);
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      const imageUrl = await uploadFile();
      await updateMedicineData(imageUrl, item);
      setLoading(false);
    } catch (error) {
      console.error("Error:", error);
    }
  };

  useEffect(() => {
    setData(item);
  }, [item]);

  return (
    <>
      <button
        type="button"
        class="btn-close btn-close-white"
        onClick={() => setIsDisplayUpdateForm(false)}
        aria-label="Close"
      ></button>
      <h4 className="text-center text-white">
        {data?.name ? "Update Medicine" : "Add New Medicine"}
      </h4>
      <form className="text-white shadow-lg" onSubmit={handleSubmit}>
        <div class="mb-3">
          <label>Medicine Name</label>
          <input
            type="text"
            value={data?.medicineName ?? ""}
            class="form-control"
            name="medicineName"
            onChange={handleChange}
            required
          />
        </div>
        <div class="mb-3">
          <label>Description</label>
          <input
            type="text"
            value={data?.medicineDescription ?? ""}
            class="form-control"
            name="medicineDescription"
            onChange={handleChange}
          />
        </div>
        <div class="mb-3">
          <label>Content</label>
          <input
            type="text"
            value={data?.content ?? ""}
            name="content"
            onChange={handleChange}
            class="form-control"
            required
          />
        </div>
        <div className="row">
          <div className="col-6">
            <div class="mb-3">
              <label>Quantity</label>
              <input
                type="number"
                value={data?.stock ?? ""}
                class="form-control"
                name="stock"
                onChange={handleChange}
                required
              />
            </div>
          </div>
          <div className="col-6">
            <div class="mb-3">
              <label>Price</label>
              <input
                type="number"
                value={data?.price ?? ""}
                class="form-control"
                name="price"
                onChange={handleChange}
                required
              />
            </div>
          </div>
        </div>
        <div class="mb-3">
          <label>Select Image</label>
          <input
            type="file"
            label="image"
            name="medicineImage"
            class="form-control"
            accept=".jpeg, .png, .jpg"
            onChange={(e) => {
              setImageUpload(e.target.files[0]);
            }}
          />
        </div>
        <div className="d-flex">
          {item?.medicineName ? (
            <button
              class="btn btn-gradUpdate"
              disabled={loading}
              onClick={handleUpdate}
            >
              Update
            </button>
          ) : (
            <button type="submit" disabled={loading} class="btn btn-gradUpdate">
              Add
            </button>
          )}
          {loading && (
            <div class="spinner-border text-warning ms-3" role="status">
              <span class="visually-hidden">Loading...</span>
            </div>
          )}
        </div>
      </form>
    </>
  );
}

export default React.memo(AddUpdateMedicineForm);
