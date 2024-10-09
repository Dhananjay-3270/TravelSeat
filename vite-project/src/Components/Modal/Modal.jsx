import React, { useState } from "react";
import "./Modal.css";

const Modal = ({ show, handleClose, handleSubmit }) => {
  const [formData, setFormData] = useState({
    name: "",
    age: "",
    phone: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const onSubmit = (e) => {
    e.preventDefault();
    handleSubmit(formData);
    handleClose();
  };

  return (
    <div className={`modal ${show ? "modal-show" : ""}`}>
      <div className="modal-content">
        <span className="close" onClick={() => handleClose()}>
          &times;
        </span>
        <h2>Enter Your Details</h2>
        <form onSubmit={onSubmit}>
          <label>
            Name:
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
            />
          </label>
          <label>
            Age:
            <input
              type="number"
              name="age"
              value={formData.age}
              onChange={handleChange}
              required
            />
          </label>
          <label>
            Phone Number:
            <input
              type="text"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              required
            />
          </label>
          <button type="submit">Submit</button>
        </form>
      </div>
    </div>
  );
};

export default Modal;
