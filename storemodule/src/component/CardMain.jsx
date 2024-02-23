import React from "react";
import '../css/CardMain.css';

const CardMain = React.forwardRef(({ data, onUpdate }, ref) => {
    const uniqueContents = [...new Set(data.map(item => item.content))];

    const OpenUpdateForm = (item) => {
        onUpdate(item)
    }
    return (
        <>
            {uniqueContents.map((content, index) => (
                <div key={index}>
                    <h5 className="categoryText">{content}</h5>
                    <div className='row'>
                        {data.filter(item => item.content === content).map((item, itemIndex) => (
                            <div className=" mb-4 col-lg-6 col-12" key={itemIndex}>
                                <div className="accordion" id={`accordionExample-${index}-${itemIndex}`}>
                                    <div className="accordion-item accordionDiv">
                                        <h2 className="accordion-header" id={`headingOne-${index}-${itemIndex}`}>
                                            <button className="accordion-button accordionButtonDiv" data-bs-toggle="collapse" data-bs-target={`#collapseOne-${index}-${itemIndex}`} aria-controls={`collapseOne-${index}-${itemIndex}`}>
                                                <div className="me-3 accordionButtonInnerDiv">
                                                    <img src={item.imgSrc} className="img-fluid w-100 h-100 medImg" alt="" />
                                                </div>
                                                <span className="medicineName">{item.name}<br />
                                                    <span className="contentText">{item.content}</span>
                                                </span>
                                            </button>
                                        </h2>
                                        <div id={`collapseOne-${index}-${itemIndex}`} className="accordion-collapse collapse" aria-labelledby={`headingOne-${index}-${itemIndex}`}>
                                            <div className="accordion-body text-white d-flex justify-content-between">
                                                <h6> <span className="badge bg-primary">Quantity</span> : {item.stock}</h6>
                                                <h6><span className="badge bg-success">Content</span> : {item.content}</h6>
                                                <h6><span className="badge bg-warning">Price</span> : &#8377;{item.price}</h6>
                                            </div>
                                            <p className="descriptionText mx-4">{item.description}</p>
                                            <div className="ms-3 mb-2">
                                                <button className="btn btn-primary me-2" onClick={() => OpenUpdateForm(item)}>Update</button>
                                                <button className="btn btn-danger">Delete</button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div >
            ))
            }
        </>
    );
})

export default React.memo(CardMain);
