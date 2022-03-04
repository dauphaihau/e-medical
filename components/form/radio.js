import React from 'react';

const Radio = (props) => {
  const {
    children, value,
    onChange,
    checked = false,
    label = '',
    className = '',
  } = props;

  return (
    <div className={`${className} mr-4`}>
      <label className="inline-flex items-center">
        <input
          onChange={onChange}
          type="radio"
          className='form-radio' name="accountType"
          value={value}
        />
        <span className="ml-2">{value}</span>
      </label>
    </div>
  );
}

export default Radio;


export const RadioGroup = ({className='',children, label='', direction}) => {
  return (
    <div className={`mb-4 ${className}`}>
      <p className='mb-2 text-base font-medium'>{label}</p>
      <div className={`flex ${direction}` }>
        {children}
      </div>
    </div>
  )
};
