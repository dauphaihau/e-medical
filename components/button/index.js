const Button = (props) => {

  const {
    className='',
    children = '',
    type = '',
    variant = 'primary',
  } = props;

  return (
    <button
      type={type}
      className={`
      ${className}
        btn bg-primary-light hover:bg-primary text-primary hover:text-white
      `}>
      {children}
    </button>

    // <button className={`
    // ${className}
    // btn
    // btn-${variant}
    // hover:btn-${variant}
    // text-${variant}
    // hover:text-${variant}
    // `}>
    //   {children}
    // </button>
  );
}

export default Button;