const Button = (props) => {

  const {
    children = '',
    variant = 'primary',
  } = props;

  return (
    // <button
    //   className={`
    //     btn bg-primary-light hover:bg-primary text-primary hover:text-white
    //   `}>
    //   {children}
    // </button>

    <button className={`
    btn 
    btn-${variant}
    hover:btn-${variant}
    text-${variant}
    hover:text-${variant}
    `}>
      {children}
    </button>
  );
}

export default Button;