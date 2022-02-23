export default function Button({className, children, variant='primary', ...other}) {
  const cls = `button button-${variant}${className?' ' + className: ''}`
  return (
    <button className={cls} {...other}>{children}</button>
  );
}
