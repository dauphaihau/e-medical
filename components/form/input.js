import {ErrorMessage} from "formik";

const Input = (props) => {

  const {
    label = '',
    name = '',
    direction = '',
    placeholder = '',
    className = '',
    classNameLabel = '',
    type = 'text',
    useFormik = false,
    disable = false,
    ...others
  } = props;

  return (
    <div className={`form-group ${direction}`}>
      <label className={classNameLabel}>{label}</label>
      <input
        disabled={disable}
        placeholder={placeholder}
        name={name}
        type={type}
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