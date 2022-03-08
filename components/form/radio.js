const Radio = (props) => {

  const {
    value = '',
    checked,
    className = '',
    name='',
    ...others
  } = props;

  return (
    <div className={`${className} form-radio-input`}>
      <input
        type="radio"
        name={name}
        value={value}
        checked={checked}
        {...others}
      />
      <label>{value}</label>
    </div>
  );
}

export default Radio;

export const RadioGroup = ({className = '', children, label = '', direction}) => {
  return (
    <div className={`mb-4 ${className}`}>
      <p className='mb-2 text-base font-medium'>{label}</p>
      <div className={`flex ${direction}`}>
        {children}
      </div>
    </div>
  )
};
