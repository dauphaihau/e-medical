import ReactSelect from "react-select";
import React from "react";

const Select = (props) => {

  const {
    label = '',
    options = [],
    direction = '',
    width = '',
    name = '',
    error = '',
    defaultValue = '',
    ...others
  } = props;

  return (
    <div className={`form-group ${direction} ${width}`}>
      <label>{label}</label>
      <ReactSelect
        defaultValue={defaultValue}
        name={name}
        {...others}
        options={options}
      />
      <p className='mt-[-12px]'>{error}</p>
    </div>
  );
}

export default Select;