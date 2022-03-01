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
      {/*<ErrorMessage name={name} />*/}
    </div>
  );
}

export default Select;