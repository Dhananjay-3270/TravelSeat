import React, { useState, useContext, useEffect } from "react";
import datacontext from "../../Context";
import "./Modal.css";

const Modal = ({ show, handleClose, handleSubmit, seatdetails }) => {
  const {
    businformation,
    setbusinformation,
    destination,
    From,
    Too,
  } = useContext(datacontext);

  // State to store total cost
  const [totalCost, setTotalCost] = useState(0);

  // State for form data
  const [formData, setFormData] = useState({
    name: "",
    age: "",
    phone: "",
    from: From,
    too: Too,
  });

  // State for error messages
  const [errors, setErrors] = useState({
    name: "",
    age: "",
    phone: "",
  });

  // Function to calculate the total fare
  const calculatefair = () => {
    const cal = destination.find((dest) => dest.value === From);
    if (!cal || !cal[Too]) {
      console.error("Destination details not found.");
      return 0;
    }
    const distance = cal[Too].distance;
    const pricePerKm = cal[Too].pricePerKm;

    let total = 0;
    seatdetails.forEach((seat) => {
      if (seat.seattype === "Single") {
        total += pricePerKm * distance;
      } else if (seat.seattype === "Double") {
        total += pricePerKm * distance * 1.2;
      }
    });

    return total;
  };

  useEffect(() => {
    const cost = calculatefair();
    setTotalCost(cost);
  }, [From, Too, seatdetails]);

  // Input validation logic
  const validate = () => {
    let isValid = true;
    let tempErrors = { name: "", age: "", phone: "" };

    // Name validation (only alphabets and spaces)
    if (!formData.name.trim()) {
      tempErrors.name = "Name is required.";
      isValid = false;
    } else if (!/^[A-Za-z\s]+$/.test(formData.name)) {
      tempErrors.name = "Name should contain only alphabets and spaces.";
      isValid = false;
    }

    // Age validation (should be greater than 0)
    const age = parseInt(formData.age, 10);
    if (!age || age <= 0) {
      tempErrors.age = "Age must be greater than 0.";
      isValid = false;
    }

    // Phone number validation (should be a valid 10-digit number)
    if (!/^\d{10}$/.test(formData.phone)) {
      tempErrors.phone = "Phone number must be a valid 10-digit number.";
      isValid = false;
    }

    setErrors(tempErrors);
    return isValid;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const onSubmit = (e) => {
    e.preventDefault();
    if (validate()) {
      // Submit form data with total cost, departure (From), and destination (Too)
      handleSubmit({ ...formData, totalCost, from: From, too: Too });
      handleClose();
    }
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
            {errors.name && <span className="error">{errors.name}</span>}
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
            {errors.age && <span className="error">{errors.age}</span>}
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
            {errors.phone && <span className="error">{errors.phone}</span>}
          </label>
          <label>
            Departure:
            <input
              type="text"
              name="from"
              value={From} // Show From value
              disabled
            />
          </label>
          <label>
            Destination:
            <input
              type="text"
              name="too"
              value={Too} // Show Too value
              disabled
            />
          </label>
          <label>
            Seat details:
            <div className="seat-details">
              {seatdetails.map((seat, index) => (
                <div key={index} className="seat-item">
                  <span className="seat-id">Seat ID: {seat.seatid}</span>
                  <span className="seat-type">Type: {seat.seattype}</span>
                </div>
              ))}
            </div>
          </label>
          <label>
            Total Cost:
            <div className="total-cost">₹{totalCost}</div>
          </label>
          <button type="submit">Submit</button>
        </form>
      </div>
    </div>
  );
};

export default Modal;
