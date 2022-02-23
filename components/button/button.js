export default function Button({type="button",className, children, variant, ...other}) {
  console.log(other);
  const cls = `button button-${variant}${className?' ' + className: ''}`
  return (
    <button className={`${cls} ${variant ==='info' ? 'bg-info' : variant ==='warning' ? 'bg-warning' : 'bg-success'}`} {...other} >{children}</button>
  );
}

