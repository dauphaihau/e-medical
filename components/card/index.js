const Card = (props) => {

  const {
    children,
    classes = '',
  } = props;

  return (
    <>
      <div className={`card ${classes}`}>
        {children}
      </div>
    </>
  );
}

export default Card;