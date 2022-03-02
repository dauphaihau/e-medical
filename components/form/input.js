import {ErrorMessage} from "formik";

const Input = (props) => {

  const {
    label = '',
    name = '',
    direction = '',
    placeholder = '',
    className = '',
    useFormik = false,
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
      {useFormik && (
        <div className='text-danger mt-[5px]'>
          {(name) && <ErrorMessage name={name}/>}      
        </div>
      )}
    </div>
  )
};

export default Input;