import { Link } from 'react-router-dom';
import './BeerIndex.css';

const BeerIndexItem = ({ beer }) => {
  return (
    <div className='beer-detail'>
      <Link to={`/beers/${beer.id}`}>
        <img src={beer.label} alt={beer.name} />
        <div className='beer-name'>{beer.name}</div>
      </Link>
      <div className='beer-list-attributes'>
        {beer.abv}% ABV | Rating: {beer.averageRating}
      </div>
      <div className='beer-list-brewery'>from {beer.brewery.name}</div>
    </div>
  );
};

export default BeerIndexItem;
