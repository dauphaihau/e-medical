const Checkbox = (props) => {

  const {
    value,
    checked,
    className = '',
    defaultChecked = null,
    label = '',
    ...others
  } = props;

  return (
    <div className="form-check-input">
      <input
        type="checkbox"
        checked={value || defaultChecked}
        {...others}
      />
      <label>{label}</label>
    </div>
  );
}

export default Checkbox;