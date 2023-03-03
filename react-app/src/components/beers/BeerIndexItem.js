import { Link } from 'react-router-dom';
import './BeerIndex.css';

const BeerIndexItem = ({ beer }) => {
  return (
    <div>
      <Link to={`/beers/${beer.id}`}>
        <img src={beer.label} alt={beer.name} />
        <div>{beer.name}</div>
      </Link>
    </div>
  );
};

export default BeerIndexItem;
