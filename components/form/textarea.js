const Textarea = (props) => {

  const {
    label,
    className = '',
    classNameLabel = '',
    placeholder='',
    ...others
  } = props;

  return (
    <div className={`form-textarea-input ${className}`}>
      <label className={classNameLabel}>{label}</label>
      <textarea {...others} placeholder={placeholder} rows="3"/>
    </div>
  );
}

export default Textarea;