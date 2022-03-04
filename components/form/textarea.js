const Textarea = (props) => {

  const {
    label,
    className = '',
    classNameLabel = '',
    ...others
  } = props;

  return (
    <div className={`form-textarea-input ${className}`}>
      <label className={classNameLabel}>{label}</label>
      <textarea {...others} rows="3"/>
    </div>
  );
}

export default Textarea;