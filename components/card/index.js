const Card = (props) => {

  const {
    children,
    css = '',
  } = props;

  return (
    <>
      <div className={`card ${css}`}>
        {children}
      </div>
    </>
  );
}

export default Card;