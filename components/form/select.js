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
    useFormik = false,
    placeholder = '',
    ...others
  } = props;

  return (
    <div className={`form-group ${direction} ${width}`}>
      <label>{label}</label>
      <ReactSelect
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