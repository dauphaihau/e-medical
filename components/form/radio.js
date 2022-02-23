import React from 'react';

const Radio = ({children, value}) => {
  return (
    <div className='mr-4'>
      <label className="inline-flex items-center">
        <input type="radio" name="radio" value={value} />
        <span className="ml-2">{children}</span>
      </label>
    </div>
  );
}

export default Radio;