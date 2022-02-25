const Card = (props) => {
  const {
    cards = [],
  } = props;

  return (
    <>
      {cards.map((card, index) => (
        <div className="card" key={index}>
          <div className="card-title">
            <h4>{card.title}</h4>
          </div>
          <div className="card-number">
            <p>{card.valueNumber}</p>
          </div>
        </div>
      ))}
    </>
  );
}

export default Card;