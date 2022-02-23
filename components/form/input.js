import React from "react";

const Input = ({label, name = '', direction = '', placeholder = ''}) => (
  <div className={`form-group ${direction}`}>
    <label>{label}</label>
    <input
      name={name}
      type="text"
      className="form-control-input"
      required
    />
  </div>
);

export default Input;