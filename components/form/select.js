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
      {name && (
        <div className='text-danger mt-[5px]'>
          <ErrorMessage name={name}/>
        </div>
      )}
    </div>
  );
}

export default Select;