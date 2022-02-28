import React from 'react';

const Radio = (props) => {
  const {
    children, value,
    onChange,
    checked = false,
    label = '',
  } = props;

  return (
    <div className='mr-4'>
      <label className="inline-flex items-center">
        <input
          onChange={onChange}
          type="radio"
          className="form-radio" name="accountType"
          value={value}
        />
        <span className="ml-2">{value}</span>
      </label>
    </div>
  );
}

export default Radio;