import ReactSelect from "react-select";
import {ErrorMessage} from "formik";

const Select = (props) => {

  const {
    label = '',
    options = [],
    direction = '',
    width = '',
    name = '',
    error = '',
    placeholder ='',
    useFormik = false,
    isDisable= false,
    ...others
  } = props;

  return (
    <div className={`form-group ${direction} ${width}`}>
      <label>{label}</label>
      <ReactSelect
        isDisabled={isDisable}
        id={name}
        placeholder={placeholder}
        name={name}
        instanceId={name}
        {...others}
        options={options}
      />
      
      {useFormik && (
        <div className='text-danger mt-[5px]'>
          {(name) && <ErrorMessage name={name}/>}      
        </div>
      )}
    </div>
  );
}

export default Select;