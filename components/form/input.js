import {ErrorMessage} from "formik";

const Input = (props) => {

  const {
    label = '',
    name = '',
    direction = '',
    placeholder = '',
    className ='',
    error='',
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
        {...others}
      />
      <ErrorMessage className='text-danger' name={name} />
    </div>
  )
};

export default Input;