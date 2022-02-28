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
    placeholder ='',
    ...others
  } = props;

  return (
    <div className={`form-group ${direction} ${width}`}>
      <label>{label}</label>
      <ReactSelect
        placeholder={placeholder}
        name={name}
        {...others}
        options={options}
      />
      <p className='mt-[-12px]'>{error}</p>
    </div>
  );
}

export default Select;