import {useState} from "react";

const Badge = (props) => {

  const [state, setState] = useState('white')

  const {
    variant = 'primary',
    value = 'Badge'
  } = props;

    // badge bg-${variant ? 'light' : setState('black')} text-${state}
  return (
    <span className={`badge badge-${variant} text-white`}>
      {value}
    </span>
    // <span className={`badge bg-warning text-white`}>{value}</span>
  );
}

export default Badge