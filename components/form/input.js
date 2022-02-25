import React from "react";

const Input = (props) => {

  const {
    label = '',
    name = '',
    direction = '',
    placeholder = '',
    className ='',
    ...others
  } = props;

  return (
    <div className={`form-group ${direction}`}>
      <label>{label}</label>
      <input
        placeholder={placeholder}
        name={name}
        type="text"
        className={`form-control-input ${className}`}
        required
        {...others}
      />
    </div>
  )
};

export default Input;