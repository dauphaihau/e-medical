import React from 'react';

const Textarea = (props) => {
  const {
    label,
    className = ''
    , ...others
  } = props;
  return (
    <div className={` form-textarea-input ${className}`}>
      <label>{label}</label>
      <textarea{...others} rows="3"/>
    </div>
  );
}

export default Textarea;