import React from 'react';

const Select = ({label='', options, direction = '', width=''}) => {
  return (
    <div className={`form-group ${direction} ${width}`}>
      <label>{label}</label>
      <select className="form-select">
        {options.map((option, index) => (
          <option key={index} selected>{option}</option>
        ))}
      </select>
    </div>
  );
}

export default Select;