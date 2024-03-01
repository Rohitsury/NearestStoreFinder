import React from "react";
import "../css/CardMain.css";

const CardMain = ({ data, getMedicineData, onUpdate }) => {
  const uniqueContents = [...new Set(data?.map((item) => item.content))];

  const OpenUpdateForm = (item) => {
    onUpdate(item);
  };

  const deleteMedicine = async (item) => {
    const confirm = window.confirm("Are you sure you want to delete?");
    if (!confirm) {
      return;
    }
    try {
      const response = await fetch(
        `http://localhost:5000/storemodule/deletemedicine/${item._id}`,
        {
          method: "DELETE",
        }
      );
      const res = await response.json();
      if (response.status === 200) {
        alert(res.message);
        getMedicineData();
      } else if (response.status === 500) {
        alert(res.error);
      } else if (response.status === 400) {
        alert(res.error);
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      {uniqueContents?.map((content, index) => (
        <div key={index}>
          <h5 className="categoryText">{content}</h5>
          <div className="row">
            {data
              ?.filter((item) => item?.content === content)
              ?.map((item, itemIndex) => (
                <div className=" mb-4 col-lg-6 col-12" key={itemIndex}>
                  <div
                    className="accordion"
                    id={`accordionExample-${index}-${itemIndex}`}
                  >
                    <div className="accordion-item accordionDiv">
                      <h2
                        className="accordion-header"
                        id={`headingOne-${index}-${itemIndex}`}
                      >
                        <button
                          className="accordion-button accordionButtonDiv"
                          data-bs-toggle="collapse"
                          data-bs-target={`#collapseOne-${index}-${itemIndex}`}
                          aria-controls={`collapseOne-${index}-${itemIndex}`}
                        >
                          <div className="me-3 accordionButtonInnerDiv">
                            <img
                              src={item?.medicineImage}
                              className="img-fluid w-100 h-100 medImg"
                              alt=""
                            />
                          </div>
                          <span className="medicineName">
                            {item?.medicineName}
                            <br />
                            <span className="contentText">{item?.content}</span>
                          </span>
                        </button>
                      </h2>
                      <div
                        id={`collapseOne-${index}-${itemIndex}`}
                        className="accordion-collapse collapse"
                        aria-labelledby={`headingOne-${index}-${itemIndex}`}
                      >
                        <div className="accordion-body text-white d-flex justify-content-between">
                          <h6>
                            {" "}
                            <span className="badge bg-primary">
                              Quantity
                            </span> : {item.stock}
                          </h6>
                          <h6>
                            <span className="badge bg-success">Content</span> :{" "}
                            {item.content}
                          </h6>
                          <h6>
                            <span className="badge bg-warning">Price</span> :
                            &#8377;{item.price}
                          </h6>
                        </div>
                        <p className="descriptionText mx-4">
                          {item.medicineDescription}
                        </p>
                        <div className="ms-3 mb-2">
                          <button
                            className="btn btn-primary me-2"
                            onClick={() => OpenUpdateForm(item)}
                          >
                            Update
                          </button>
                          <button
                            className="btn btn-danger"
                            onClick={() => deleteMedicine(item)}
                          >
                            Delete
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
          </div>
        </div>
      ))}
    </>
  );
};

export default React.memo(CardMain);
