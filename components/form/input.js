import React from "react";

const Input = (props) => {

  const {
    label = '',
    name = '',
    direction = '',
    placeholder = '',
    width = '',
    ...others
  } = props;

  return (
    <div className={`form-group ${direction}`}>
      <label>{label}</label>
      <input
        placeholder={placeholder}
        name={name}
        {...others}
        type="text"
        className={`form-control-input ${width}`}
        required
      />
    </div>
  )
};

export default Input;