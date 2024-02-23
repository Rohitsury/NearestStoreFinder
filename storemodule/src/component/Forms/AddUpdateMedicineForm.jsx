import React, { useEffect, useState } from "react";

function AddUpdateMedicineForm(props) {
  const { item, setIsDisplayUpdateForm } = props;
  const [data, setData] = useState(item);

  const handleChange = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
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
      <form className="text-white shadow-lg">
        <div class="mb-3">
          <label>Medicine Name</label>
          <input type="text" value={data?.name ?? ""} class="form-control" />
        </div>
        <div class="mb-3">
          <label>Description</label>
          <input
            type="text"
            value={data?.description ?? ""}
            class="form-control"
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
              />
            </div>
          </div>
        </div>

        <div class="mb-3">
          <label>Select Image</label>
          <input type="file" value={item.imgScr} class="form-control" />
        </div>
        { data?.name ?
          <button class="btn btn-gradUpdate">
            Update
          </button> : 
          <button type="submit" class="btn btn-gradUpdate">Add </button>
        }
      </form>
    </>
  );
}

export default AddUpdateMedicineForm;
