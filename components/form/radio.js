import {ErrorMessage} from "formik";

const Radio = (props) => {

  const {
    value = '',
    checked,
    className = '',
    labelName = '',
    name = '',
    useFormik = false,
    id = '',
    ...others
  } = props;


  return (
    <div className={`${className} form-radio-input`}>
      <input
        id={id}
        type="radio"
        name={name}
        value={value}
        checked={checked}
        {...others}
      />
      <label htmlFor={id}>{labelName}</label>
      {useFormik && (
        <div className='text-danger mt-[5px]'>
          {(name) && <ErrorMessage name={name}/>}
        </div>
      )}
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


